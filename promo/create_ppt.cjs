const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Vivek Saxena";
pres.title = "NavPrep 2M — Your 2nd Mate CoC Study Companion";

// === COLOR PALETTE — Maritime / Navy ===
const C = {
  navy: "1A2744",
  deepBlue: "0D1B2A",
  gold: "D4AF37",
  goldLight: "F5E6B8",
  white: "FFFFFF",
  offWhite: "F5F3EE",
  teal: "1B998B",
  coral: "E8634A",
  textDark: "1A2744",
  textMuted: "6B7280",
  cardBg: "FFFFFF",
};

const logoPath = path.resolve(__dirname, "..", "public", "logo.png");

// ═══════════════════════════════════════════════════════
// SLIDE 1: TITLE — Bold hero
// ═══════════════════════════════════════════════════════
const s1 = pres.addSlide();
s1.background = { color: C.deepBlue };

// Top decorative bar
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });

// Logo
s1.addImage({ path: logoPath, x: 3.85, y: 0.6, w: 2.3, h: 2.3 });

// Title
s1.addText("NavPrep 2M", {
  x: 0.5, y: 3.0, w: 9, h: 0.9,
  fontSize: 52, fontFace: "Georgia", bold: true,
  color: C.white, align: "center", margin: 0,
});

// Subtitle
s1.addText("The Officer of the Watch Study Companion", {
  x: 0.5, y: 3.85, w: 9, h: 0.5,
  fontSize: 18, fontFace: "Calibri", italic: true,
  color: C.gold, align: "center", margin: 0,
});

// Tagline
s1.addText("Complete Written & Oral Exam Preparation for DG Shipping 2nd Mate F.G. Certificate", {
  x: 1.5, y: 4.5, w: 7, h: 0.5,
  fontSize: 13, fontFace: "Calibri",
  color: "8899AA", align: "center", margin: 0,
});

// Bottom bar
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.gold } });


// ═══════════════════════════════════════════════════════
// SLIDE 2: THE PROBLEM & SOLUTION
// ═══════════════════════════════════════════════════════
const s2 = pres.addSlide();
s2.background = { color: C.offWhite };
s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });

s2.addText("Why NavPrep 2M?", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 36, fontFace: "Georgia", bold: true,
  color: C.navy, align: "center", margin: 0,
});

// Problem cards (left column)
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.3, w: 4.2, h: 1.8,
  fill: { color: C.white }, rectRadius: 0.12,
  shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.08 },
});
s2.addText([
  { text: "The Problem", options: { fontSize: 16, bold: true, color: C.coral, breakLine: true } },
  { text: "", options: { fontSize: 8, breakLine: true } },
  { text: "Scattered notes across multiple books", options: { bullet: true, fontSize: 12, color: C.textDark, breakLine: true } },
  { text: "No structured oral exam practice", options: { bullet: true, fontSize: 12, color: C.textDark, breakLine: true } },
  { text: "Hard to track what you've studied", options: { bullet: true, fontSize: 12, color: C.textDark, breakLine: true } },
  { text: "No MCQ practice with explanations", options: { bullet: true, fontSize: 12, color: C.textDark } },
], { x: 0.8, y: 1.45, w: 3.6, h: 1.5 });

// Solution cards (right column)
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.3, y: 1.3, w: 4.2, h: 1.8,
  fill: { color: C.white }, rectRadius: 0.12,
  shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.08 },
});
s2.addText([
  { text: "The Solution", options: { fontSize: 16, bold: true, color: C.teal, breakLine: true } },
  { text: "", options: { fontSize: 8, breakLine: true } },
  { text: "Everything in one app — notes, MCQs, orals", options: { bullet: true, fontSize: 12, color: C.textDark, breakLine: true } },
  { text: "4338 oral Q&A with model answers", options: { bullet: true, fontSize: 12, color: C.textDark, breakLine: true } },
  { text: "Progress tracking & exam readiness score", options: { bullet: true, fontSize: 12, color: C.textDark, breakLine: true } },
  { text: "Practice quizzes with instant feedback", options: { bullet: true, fontSize: 12, color: C.textDark } },
], { x: 5.6, y: 1.45, w: 3.6, h: 1.5 });

// Big stats row
const stats = [
  { num: "133", label: "TOPICS", color: C.navy },
  { num: "1071", label: "MCQs", color: C.teal },
  { num: "4338", label: "ORAL Q&A", color: C.gold },
  { num: "6", label: "SUBJECTS", color: C.coral },
];
stats.forEach((s, i) => {
  const xPos = 0.5 + i * 2.35;
  s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: 3.5, w: 2.05, h: 1.6,
    fill: { color: C.white }, rectRadius: 0.12,
    shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.06 },
  });
  s2.addText(s.num, {
    x: xPos, y: 3.6, w: 2.05, h: 0.8,
    fontSize: 40, fontFace: "Georgia", bold: true,
    color: s.color, align: "center", margin: 0,
  });
  s2.addText(s.label, {
    x: xPos, y: 4.4, w: 2.05, h: 0.4,
    fontSize: 11, fontFace: "Calibri", bold: true,
    color: C.textMuted, align: "center", charSpacing: 3, margin: 0,
  });
});


// ═══════════════════════════════════════════════════════
// SLIDE 3: KEY FEATURES — Icon grid
// ═══════════════════════════════════════════════════════
const s3 = pres.addSlide();
s3.background = { color: C.white };
s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });

s3.addText("Everything You Need to Pass", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 34, fontFace: "Georgia", bold: true,
  color: C.navy, align: "center", margin: 0,
});

const features = [
  { icon: "📚", title: "6 Complete Subjects", desc: "TCN, CN, BWK, MET, Cargo, Safety — all topics covered with detailed study notes" },
  { icon: "🎤", title: "4338 Oral Q&A", desc: "MMD Oral questions guide with model answers" },
  { icon: "✏️", title: "1071 MCQs", desc: "Practice questions with instant feedback, explanations & score tracking" },
  { icon: "🔬", title: "Examiner Mode", desc: "Simulate the oral exam — question by question with reveal & confidence rating" },
  { icon: "📊", title: "Progress Tracking", desc: "Track completion, quiz scores & exam readiness across all subjects" },
  { icon: "📐", title: "Interactive Diagrams", desc: "Animated Mercator projections, bearing fixes, COLREGS scenarios & more" },
  { icon: "🌙", title: "Dark Mode", desc: "Study comfortably at night with full dark mode support" },
  { icon: "∑", title: "Formula Reference", desc: "Searchable formula bank grouped by subject — quick revision tool" },
];

features.forEach((f, i) => {
  const col = i % 4;
  const row = Math.floor(i / 4);
  const xPos = 0.4 + col * 2.35;
  const yPos = 1.2 + row * 2.1;

  // Card
  s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: yPos, w: 2.15, h: 1.85,
    fill: { color: C.offWhite }, rectRadius: 0.1,
  });

  // Icon
  s3.addText(f.icon, {
    x: xPos, y: yPos + 0.15, w: 2.15, h: 0.45,
    fontSize: 28, align: "center", margin: 0,
  });

  // Title
  s3.addText(f.title, {
    x: xPos + 0.15, y: yPos + 0.55, w: 1.85, h: 0.35,
    fontSize: 11.5, fontFace: "Calibri", bold: true,
    color: C.navy, align: "center", margin: 0,
  });

  // Description
  s3.addText(f.desc, {
    x: xPos + 0.15, y: yPos + 0.9, w: 1.85, h: 0.75,
    fontSize: 9, fontFace: "Calibri",
    color: C.textMuted, align: "center", margin: 0,
  });
});


// ═══════════════════════════════════════════════════════
// SLIDE 4: SUBJECTS COVERED
// ═══════════════════════════════════════════════════════
const s4 = pres.addSlide();
s4.background = { color: C.deepBlue };
s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });

s4.addText("6 Subjects — 133 Topics", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 34, fontFace: "Georgia", bold: true,
  color: C.white, align: "center", margin: 0,
});

const subjects = [
  { icon: "🗺️", name: "Terrestrial & Coastal Navigation", topics: "26 topics", mcqs: "308 MCQs", color: "2D5F3F" },
  { icon: "🌟", name: "Celestial Navigation", topics: "12 topics", mcqs: "87 MCQs", color: "5C4B8A" },
  { icon: "🎯", name: "Bridge Equipment & Watchkeeping", topics: "12 topics", mcqs: "64 MCQs", color: "1B6B5A" },
  { icon: "🌦️", name: "Meteorology", topics: "20 topics", mcqs: "164 MCQs", color: "3A7D7B" },
  { icon: "📦", name: "Cargo Handling & Stowage", topics: "21 topics", mcqs: "183 MCQs", color: "8B5E3C" },
  { icon: "⚓", name: "Ship Construction, Safety & EP", topics: "42 topics", mcqs: "265 MCQs", color: "2A4B7C" },
];

subjects.forEach((s, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const xPos = 0.4 + col * 3.15;
  const yPos = 1.2 + row * 2.15;

  // Card
  s3.addShape && s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: yPos, w: 2.95, h: 1.85,
    fill: { color: s.color }, rectRadius: 0.12,
  });

  // Icon
  s4.addText(s.icon, {
    x: xPos, y: yPos + 0.15, w: 2.95, h: 0.5,
    fontSize: 30, align: "center", margin: 0,
  });

  // Name
  s4.addText(s.name, {
    x: xPos + 0.2, y: yPos + 0.65, w: 2.55, h: 0.5,
    fontSize: 12, fontFace: "Calibri", bold: true,
    color: C.white, align: "center", margin: 0,
  });

  // Stats
  s4.addText(`${s.topics}  ·  ${s.mcqs}`, {
    x: xPos + 0.2, y: yPos + 1.2, w: 2.55, h: 0.35,
    fontSize: 10, fontFace: "Calibri",
    color: C.goldLight, align: "center", margin: 0,
  });
});


// ═══════════════════════════════════════════════════════
// SLIDE 5: HOW IT WORKS — 3 step flow
// ═══════════════════════════════════════════════════════
const s5 = pres.addSlide();
s5.background = { color: C.offWhite };
s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });

s5.addText("How It Works", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 34, fontFace: "Georgia", bold: true,
  color: C.navy, align: "center", margin: 0,
});

const steps = [
  { num: "1", title: "Study", desc: "Browse 133 topics with detailed notes, formulas, interactive diagrams & worked examples", icon: "📖" },
  { num: "2", title: "Practice", desc: "Test yourself with 1071 MCQs, mock exams & 4338 oral Q&A in Examiner mode", icon: "✏️" },
  { num: "3", title: "Track & Pass", desc: "Monitor your progress, identify weak areas & build exam confidence", icon: "🎯" },
];

steps.forEach((st, i) => {
  const xPos = 0.5 + i * 3.2;

  // Card
  s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: 1.3, w: 2.8, h: 3.5,
    fill: { color: C.white }, rectRadius: 0.15,
    shadow: { type: "outer", color: "000000", blur: 10, offset: 3, angle: 135, opacity: 0.08 },
  });

  // Number circle
  s5.addShape(pres.shapes.OVAL, {
    x: xPos + 0.95, y: 1.55, w: 0.9, h: 0.9,
    fill: { color: C.navy },
  });
  s5.addText(st.num, {
    x: xPos + 0.95, y: 1.55, w: 0.9, h: 0.9,
    fontSize: 28, fontFace: "Georgia", bold: true,
    color: C.gold, align: "center", valign: "middle", margin: 0,
  });

  // Icon
  s5.addText(st.icon, {
    x: xPos, y: 2.6, w: 2.8, h: 0.6,
    fontSize: 36, align: "center", margin: 0,
  });

  // Title
  s5.addText(st.title, {
    x: xPos + 0.2, y: 3.2, w: 2.4, h: 0.45,
    fontSize: 20, fontFace: "Georgia", bold: true,
    color: C.navy, align: "center", margin: 0,
  });

  // Description
  s5.addText(st.desc, {
    x: xPos + 0.25, y: 3.65, w: 2.3, h: 0.9,
    fontSize: 10.5, fontFace: "Calibri",
    color: C.textMuted, align: "center", margin: 0, lineSpacingMultiple: 1.3,
  });

  // Arrow between steps
  if (i < 2) {
    s5.addText("→", {
      x: xPos + 2.8, y: 2.6, w: 0.4, h: 0.6,
      fontSize: 28, color: C.gold, align: "center", valign: "middle", margin: 0,
    });
  }
});


// ═══════════════════════════════════════════════════════
// SLIDE 6: CTA — Call to Action
// ═══════════════════════════════════════════════════════
const s6 = pres.addSlide();
s6.background = { color: C.deepBlue };
s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });

// Logo
s6.addImage({ path: logoPath, x: 4.0, y: 0.5, w: 2.0, h: 2.0 });

s6.addText("Start Preparing Today", {
  x: 0.5, y: 2.6, w: 9, h: 0.8,
  fontSize: 40, fontFace: "Georgia", bold: true,
  color: C.white, align: "center", margin: 0,
});

s6.addText("Free  ·  No Installation  ·  Works on Any Device", {
  x: 1, y: 3.4, w: 8, h: 0.45,
  fontSize: 16, fontFace: "Calibri",
  color: C.gold, align: "center", margin: 0,
});

// URL button
s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 2.8, y: 4.1, w: 4.4, h: 0.7,
  fill: { color: C.gold }, rectRadius: 0.35,
});
s6.addText("navprep-2m.vercel.app", {
  x: 2.8, y: 4.1, w: 4.4, h: 0.7,
  fontSize: 18, fontFace: "Calibri", bold: true,
  color: C.deepBlue, align: "center", valign: "middle", margin: 0,
  hyperlink: { url: "https://navprep-2m.vercel.app" },
});

// Footer
s6.addText("Built for aspiring 2nd Mates  ·  DG Shipping CoC Exam Prep", {
  x: 1, y: 5.0, w: 8, h: 0.35,
  fontSize: 11, fontFace: "Calibri", italic: true,
  color: "667788", align: "center", margin: 0,
});

s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.gold } });


// ═══════════════════════════════════════════════════════
// SAVE
// ═══════════════════════════════════════════════════════
const outputPath = path.resolve(__dirname, "NavPrep_2M_Promo.pptx");
pres.writeFile({ fileName: outputPath }).then(() => {
  console.log("Presentation saved to: " + outputPath);
}).catch(err => {
  console.error("Error:", err);
});
