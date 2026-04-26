// Vercel serverless function — Groq AI oral examiner
// Handles: transcription (Whisper) + evaluation (LLaMA 3)

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // audio blobs are compressed Opus/WebM — 4MB is plenty for 60s
    },
  },
};

// ─── Allowed origins (CORS hardened) ────────────────────────────────────
const ALLOWED_ORIGINS = new Set([
  'https://navprep-2m.vercel.app',
  'http://localhost:5173',  // vite dev
  'http://localhost:4173',  // vite preview
]);

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

// ─── Translate raw Groq errors into user-friendly messages ─────────────
function friendlyError(raw) {
  const msg = String(raw || '').toLowerCase();
  if (msg.includes('rate limit') || msg.includes('429')) {
    return 'AI service is busy right now — please retry in a few seconds.';
  }
  if (msg.includes('timeout') || msg.includes('timed out')) {
    return 'AI service timed out — please check your connection and retry.';
  }
  if (msg.includes('unauthor') || msg.includes('api key')) {
    return 'AI service is temporarily unavailable — please try again later.';
  }
  if (msg.includes('file') && msg.includes('size')) {
    return 'Audio recording is too long — please keep it under 60 seconds.';
  }
  return raw || 'AI service error — please try again.';
}

// ─── Fetch with timeout (AbortController) ──────────────────────────────
async function fetchWithTimeout(url, options, timeoutMs = 30000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'AI service is not configured on server.' });
  }

  const { action, audioBase64, question, modelAnswer, candidateAnswer } = req.body || {};

  // ─── Transcribe audio via Groq Whisper ─────────────────────────────────
  if (action === 'transcribe') {
    try {
      if (!audioBase64 || typeof audioBase64 !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid audio data.' });
      }
      const audioBuffer = Buffer.from(audioBase64, 'base64');
      // reject clearly malformed / oversized payloads
      if (audioBuffer.length < 200 || audioBuffer.length > 4 * 1024 * 1024) {
        return res.status(400).json({ error: 'Audio file size is out of range.' });
      }
      const blob = new Blob([audioBuffer], { type: 'audio/webm' });

      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');
      formData.append('model', 'whisper-large-v3-turbo');
      formData.append('language', 'en');
      formData.append('response_format', 'json');

      const response = await fetchWithTimeout(
        'https://api.groq.com/openai/v1/audio/transcriptions',
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${GROQ_API_KEY}` },
          body: formData,
        },
        25000
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const raw = data?.error?.message || `Whisper failed (HTTP ${response.status})`;
        return res.status(response.status === 429 ? 429 : 502).json({ error: friendlyError(raw) });
      }

      return res.status(200).json({ text: data.text || '' });
    } catch (err) {
      const isAbort = err?.name === 'AbortError';
      console.error('[Groq Whisper]', err.message || err);
      return res.status(isAbort ? 504 : 500).json({
        error: friendlyError(isAbort ? 'timeout' : err.message)
      });
    }
  }

  // ─── Evaluate answer via Groq LLaMA ────────────────────────────────────
  if (action === 'evaluate') {
    try {
      if (!question || !modelAnswer || !candidateAnswer) {
        return res.status(400).json({ error: 'Missing question, modelAnswer, or candidateAnswer.' });
      }
      // Clamp lengths to keep prompt under reasonable token count
      const q = String(question).slice(0, 2000);
      const m = String(modelAnswer).slice(0, 6000);
      const c = String(candidateAnswer).slice(0, 4000);

      const systemPrompt = `You are a strict but fair DG Shipping oral examiner for the 2nd Mate Certificate of Competency (CoC) exam.
Your job is to evaluate a candidate's spoken answer against a reference model answer.

Instructions:
1. Extract 4-8 distinct key concepts from the model answer
2. For each key concept, decide if the candidate's answer adequately covered it (paraphrasing is fine — you understand maritime synonyms)
3. Return ONLY a valid JSON object — no markdown, no preamble, nothing outside the JSON

JSON format:
{
  "covered": ["key point the candidate covered", ...],
  "missed": ["key point the candidate missed or got wrong", ...],
  "feedback": "One concise examiner sentence — professional tone, specific to what they said",
  "score": <integer, number of covered points>
}`;

      const userMessage = `Question asked: ${q}

Reference model answer (extract key points from this):
${m}

Candidate's spoken answer (evaluate this):
"${c}"`;

      const response = await fetchWithTimeout(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage },
            ],
            temperature: 0.1,
            max_tokens: 800,
            response_format: { type: 'json_object' },
          }),
        },
        30000
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const raw = data?.error?.message || `LLaMA failed (HTTP ${response.status})`;
        return res.status(response.status === 429 ? 429 : 502).json({ error: friendlyError(raw) });
      }

      const raw = data.choices?.[0]?.message?.content || '{}';
      let evaluation;
      try {
        evaluation = JSON.parse(raw);
      } catch {
        return res.status(502).json({ error: 'AI returned an invalid response — please retry.' });
      }

      return res.status(200).json(evaluation);
    } catch (err) {
      const isAbort = err?.name === 'AbortError';
      console.error('[Groq LLaMA]', err.message || err);
      return res.status(isAbort ? 504 : 500).json({
        error: friendlyError(isAbort ? 'timeout' : err.message)
      });
    }
  }

  return res.status(400).json({ error: `Unknown action: ${action}` });
}
