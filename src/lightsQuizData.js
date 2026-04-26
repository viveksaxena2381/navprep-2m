// COLREGS Lights Quiz — Rule 20-31 scenarios
// Each question has an SVG light configuration (x,y coords on a 220×280 canvas)
// Colors: W=#FFFFFF  R=#FF2222  G=#00DD55  Y=#FFDD00

// ─── Standard coordinate positions (220×280 canvas) ──────────────────────────
// BOW-ON (aspect="Ahead"):
//   single masthead fwd:        x:110, y:88
//   two mastheads (fwd lower):  x:110, y:90  (aft higher) x:110, y:52
//   port sidelight:             x:72,  y:140
//   stbd sidelight:             x:148, y:140
//   all-round vertical stacks:  x:110, y:68/102  (2-stack)  y:52/84/116  (3-stack)
//
// ASTERN:
//   sternlight:   x:110, y:138
//   aft masthead: x:110, y:75
//
// PORT VIEW:
//   port sidelight: x:58, y:158
//   fwd masthead:   x:82, y:106
//   aft masthead:   x:138, y:64
//   sternlight:     x:155, y:158

export const LIGHTS_QUIZ = [

  // ── Q01 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q01',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead',
    lights: [
      { x: 110, y: 88,  color: '#FFFFFF', r: 8 },   // masthead
      { x:  72, y: 140, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 140, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Identify this vessel from its night lights:',
    options: [
      'Power-driven vessel <50 m, underway',
      'Sailing vessel underway',
      'Pilot vessel on duty, underway',
      'Vessel at anchor <50 m',
    ],
    correct: 0,
    rule: 'Rule 23(a)',
    explanation: 'One white masthead forward + red port sidelight + green starboard sidelight = Power-driven vessel underway. A vessel <50 m shows one masthead; ≥50 m must show a second (aft, higher).',
  },

  // ── Q02 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q02',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead',
    lights: [
      { x: 110, y: 52,  color: '#FFFFFF', r: 8 },   // aft masthead (higher)
      { x: 110, y: 90,  color: '#FFFFFF', r: 8 },   // fwd masthead (lower)
      { x:  72, y: 140, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 140, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Two white mastheads (aft one higher) plus sidelights — this is:',
    options: [
      'Power-driven vessel ≥50 m, underway',
      'Vessel towing — tow length ≤200 m',
      'Vessel constrained by draught (CBD)',
      'Power-driven vessel <50 m, underway',
    ],
    correct: 0,
    rule: 'Rule 23(a)',
    explanation: 'Two white masthead lights with the aft one higher + sidelights = PDV ≥50 m underway. Vessels ≥50 m LOA MUST carry a second masthead aft and higher. A towing vessel would also show a yellow towing light.',
  },

  // ── Q03 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q03',
    aspect: 'Astern',
    scenario: 'Night — seen from astern',
    lights: [
      { x: 110, y: 138, color: '#FFFFFF', r: 7 },   // sternlight
    ],
    q: 'You see only a single white light from astern. The vessel ahead is:',
    options: [
      'Being overtaken by you — you are give-way (Rule 13)',
      'Head-on — both alter to starboard (Rule 14)',
      'Crossing — she has right of way (Rule 15)',
      'Vessel at anchor <50 m',
    ],
    correct: 0,
    rule: 'Rule 13 & 23',
    explanation: 'A single white sternlight seen from directly astern means you are OVERTAKING the vessel. Rule 13 applies — the overtaking vessel is always the give-way vessel, regardless of any other rule.',
  },

  // ── Q04 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q04',
    aspect: 'Port side',
    scenario: 'Night — seen from the port side',
    lights: [
      { x:  58, y: 158, color: '#FF2222', r: 7 },   // port sidelight
      { x:  82, y: 106, color: '#FFFFFF', r: 8 },   // fwd masthead
      { x: 155, y: 158, color: '#FFFFFF', r: 7 },   // sternlight
    ],
    q: 'You see a red sidelight, one white masthead and a white sternlight. Your action:',
    options: [
      'Give way — this vessel is on your starboard side (crossing, Rule 15)',
      'Stand on — this vessel is on your port side (crossing, Rule 15)',
      'Both alter to starboard — head-on situation (Rule 14)',
      'No action required — the other vessel is at anchor',
    ],
    correct: 0,
    rule: 'Rules 15 & 23',
    explanation: 'You see her PORT (red) sidelight, so you are on her STARBOARD side — she is approaching from your port quarter. In a crossing situation under Rule 15, the vessel which has the other on her own starboard side is the stand-on vessel. You are the give-way vessel.',
  },

  // ── Q05 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q05',
    aspect: 'Port side',
    scenario: 'Night — seen from the port side',
    lights: [
      { x:  58, y: 158, color: '#FF2222', r: 7 },   // port sidelight
      { x:  82, y: 108, color: '#FFFFFF', r: 8 },   // fwd masthead (lower)
      { x: 138, y: 64,  color: '#FFFFFF', r: 8 },   // aft masthead (higher)
      { x: 155, y: 158, color: '#FFFFFF', r: 7 },   // sternlight
    ],
    q: 'Identify this vessel:',
    options: [
      'Power-driven vessel ≥50 m, underway',
      'Vessel towing — tow length >200 m',
      'Vessel constrained by draught (CBD)',
      'Power-driven vessel <50 m, underway',
    ],
    correct: 0,
    rule: 'Rule 23(a)',
    explanation: 'Red sidelight + two mastheads (aft higher) + white sternlight = PDV ≥50 m underway, seen from her port side. The two mastheads are horizontally separated because we are viewing from the side — the aft one appears further back and higher.',
  },

  // ── Q06 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q06',
    aspect: 'All-round',
    scenario: 'Night — vessel stopped',
    lights: [
      { x: 110, y: 100, color: '#FFFFFF', r: 8 },   // single all-round white
    ],
    q: 'A single all-round white light. This vessel is most likely:',
    options: [
      'At anchor <50 m OR a very small PDV (<7 m, max speed <7 kn)',
      'At anchor ≥50 m',
      'Vessel not under command (NUC), stopped',
      'Vessel aground <50 m',
    ],
    correct: 0,
    rule: 'Rules 23(d) & 30(b)',
    explanation: 'A single all-round white light can indicate: (1) Vessel at anchor <50 m (Rule 30(b)), or (2) PDV <7 m with maximum speed <7 kn (Rule 23(d)(ii)). Context — anchorage area, position, movement — helps distinguish the two.',
  },

  // ── Q07 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q07',
    aspect: 'All-round',
    scenario: 'Night — vessel at anchor',
    lights: [
      { x: 110, y: 65,  color: '#FFFFFF', r: 8 },   // fwd anchor light (higher)
      { x: 110, y: 118, color: '#FFFFFF', r: 8 },   // aft anchor light (lower)
    ],
    q: 'Two all-round white lights — upper forward, lower aft. This vessel is:',
    options: [
      'At anchor ≥50 m',
      'Vessel not under command (NUC)',
      'Vessel towing — tow length ≤200 m, stopped',
      'Pilot vessel at anchor',
    ],
    correct: 0,
    rule: 'Rule 30(a)',
    explanation: 'Two all-round white lights — forward one higher, aft one lower = Vessel at anchor ≥50 m. No sidelights are shown at anchor. A NUC vessel shows two RED lights; a pilot vessel would show white-over-red.',
  },

  // ── Q08 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q08',
    aspect: 'All-round',
    scenario: 'Night — vessel stopped',
    lights: [
      { x: 110, y: 72,  color: '#FF2222', r: 8 },   // upper red
      { x: 110, y: 108, color: '#FF2222', r: 8 },   // lower red
    ],
    q: 'Two vertical all-round RED lights, no masthead or sidelights. This is:',
    options: [
      'Vessel not under command (NUC) — not making way',
      'Vessel aground <50 m',
      'RAM vessel — not making way',
      'Vessel at anchor with failure of anchor lights',
    ],
    correct: 0,
    rule: 'Rule 27(a)',
    explanation: 'Two all-round RED lights in a vertical line = NUC vessel not making way. When NUC is making way, sidelights + sternlight are added. RAM shows Red-White-Red (three lights). Aground shows anchor lights + two reds.',
  },

  // ── Q09 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q09',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead',
    lights: [
      { x: 110, y: 68,  color: '#FF2222', r: 8 },   // upper red (NUC)
      { x: 110, y: 104, color: '#FF2222', r: 8 },   // lower red (NUC)
      { x:  72, y: 150, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 150, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Identify this vessel from its night lights:',
    options: [
      'Vessel not under command (NUC) — making way',
      'RAM vessel — making way, seen from ahead',
      'Fishing vessel (not trawling), making way',
      'Vessel constrained by draught — stopped in water',
    ],
    correct: 0,
    rule: 'Rule 27(a)',
    explanation: 'Two red all-round lights (vertical) + sidelights but NO white masthead = NUC vessel making way. Rule 27(a): a NUC vessel does not show masthead lights. RAM would show Red-White-Red (three all-rounds). CBD shows three RED all-rounds.',
  },

  // ── Q10 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q10',
    aspect: 'All-round',
    scenario: 'Night — vessel stopped',
    lights: [
      { x: 110, y: 58,  color: '#FF2222', r: 8 },   // top red
      { x: 110, y: 94,  color: '#FFFFFF', r: 8 },   // middle white
      { x: 110, y: 130, color: '#FF2222', r: 8 },   // bottom red
    ],
    q: 'Three all-round lights — Red over White over Red. This vessel is:',
    options: [
      'Restricted in ability to manoeuvre (RAM)',
      'Vessel constrained by draught (CBD)',
      'Vessel not under command (NUC)',
      'Dredger with obstruction to one side',
    ],
    correct: 0,
    rule: 'Rule 27(b)',
    explanation: 'Red-White-Red all-round lights (vertical) = RAM vessel. NUC shows only 2 RED lights. CBD shows 3 RED lights. A dredger (special RAM) shows Red-White-Red plus Red-Red on the obstruction side and Green-Green on the clear side.',
  },

  // ── Q11 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q11',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead',
    lights: [
      { x: 110, y: 45,  color: '#FF2222', r: 8 },   // top red (RAM)
      { x: 110, y: 76,  color: '#FFFFFF', r: 8 },   // middle white (RAM)
      { x: 110, y: 107, color: '#FF2222', r: 8 },   // bottom red (RAM)
      { x: 110, y: 130, color: '#FFFFFF', r: 7.5 }, // masthead light
      { x:  72, y: 158, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 158, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Identify this vessel from its night lights:',
    options: [
      'RAM vessel making way, seen from ahead',
      'CBD vessel underway, seen from ahead',
      'RAM vessel at anchor',
      'Vessel towing with obstruction',
    ],
    correct: 0,
    rule: 'Rule 27(b)',
    explanation: 'Red-White-Red all-rounds + masthead + sidelights + sternlight = RAM vessel making way. When making way, a RAM vessel shows normal PDV underway lights in addition to her R-W-R identification lights. CBD would show three RED lights instead.',
  },

  // ── Q12 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q12',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead',
    lights: [
      { x: 110, y: 42,  color: '#FF2222', r: 8 },   // top red (CBD)
      { x: 110, y: 72,  color: '#FF2222', r: 8 },   // mid red (CBD)
      { x: 110, y: 102, color: '#FF2222', r: 8 },   // bot red (CBD)
      { x: 110, y: 128, color: '#FFFFFF', r: 7.5 }, // masthead light
      { x:  72, y: 158, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 158, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Three vertical RED all-rounds above a white masthead and sidelights. This is:',
    options: [
      'Vessel constrained by draught (CBD) underway',
      'RAM vessel making way — seen from ahead',
      'Vessel not under command — making way',
      'Trawler making way at night',
    ],
    correct: 0,
    rule: 'Rule 28',
    explanation: 'Three all-round RED lights + masthead + sidelights + sternlight = CBD vessel underway. A CBD vessel is fully under command but cannot deviate from her track. She has priority over most other vessels. Distinguished from RAM by three reds vs R-W-R.',
  },

  // ── Q13 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q13',
    aspect: 'All-round',
    scenario: 'Night — stopped or making slow way',
    lights: [
      { x: 110, y: 72,  color: '#00DD55', r: 8 },   // upper GREEN (trawl)
      { x: 110, y: 108, color: '#FFFFFF', r: 8 },   // lower WHITE (trawl)
    ],
    q: 'Green all-round over White all-round. No masthead or sidelights. This is:',
    options: [
      'Vessel engaged in trawling — not making way',
      'Vessel engaged in fishing (not trawling)',
      'Pilot vessel on duty — at anchor',
      'RAM vessel — not making way',
    ],
    correct: 0,
    rule: 'Rule 26(b)',
    explanation: 'Green over White all-round lights = Vessel TRAWLING. When making way, sidelights + sternlight are added (no separate masthead). Fishing (not trawling) shows RED over white. Pilot shows white over RED. Remember: "Green trawler — the fish are green with envy!"',
  },

  // ── Q14 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q14',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead (trawler making way)',
    lights: [
      { x: 110, y: 65,  color: '#00DD55', r: 8 },   // upper green (trawl)
      { x: 110, y: 100, color: '#FFFFFF', r: 8 },   // lower white (trawl)
      { x:  72, y: 152, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 152, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Identify this vessel making way at night:',
    options: [
      'Trawler (trawling) — making way',
      'Fishing vessel (not trawling) — making way',
      'Pilot vessel underway',
      'RAM vessel — making way',
    ],
    correct: 0,
    rule: 'Rule 26(b)',
    explanation: 'Green-over-white all-rounds + sidelights = Trawler making way. No separate white masthead is required. KEY DISTINCTION: Trawler = Green over white; Other fishing = Red over white. The sidelights are added only when making way.',
  },

  // ── Q15 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q15',
    aspect: 'All-round',
    scenario: 'Night — fishing vessel at work',
    lights: [
      { x: 110, y: 72,  color: '#FF2222', r: 8 },   // upper RED (fishing)
      { x: 110, y: 108, color: '#FFFFFF', r: 8 },   // lower WHITE (fishing)
    ],
    q: 'Red all-round over White all-round — no masthead or sidelights:',
    options: [
      'Fishing vessel (not trawling) — not making way',
      'Vessel trawling — not making way',
      'NUC vessel — stopped',
      'Pilot vessel — at anchor',
    ],
    correct: 0,
    rule: 'Rule 26(c)',
    explanation: 'Red over White all-round = Fishing vessel NOT trawling (e.g., line fishing, purse seining, net fishing not dragged). KEY DISTINCTION from trawler: trawler is GREEN over white; other fishing is RED over white. Both add sidelights + sternlight when making way.',
  },

  // ── Q16 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q16',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead (making way)',
    lights: [
      { x: 110, y: 58,  color: '#FF2222', r: 8 },   // upper red (fishing)
      { x: 110, y: 92,  color: '#FFFFFF', r: 8 },   // lower white (fishing)
      { x:  72, y: 150, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 150, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Red-over-white all-rounds + sidelights — no white masthead. This is:',
    options: [
      'Fishing vessel (not trawling) — making way',
      'Trawler — making way',
      'NUC vessel — making way',
      'RAM vessel — making way',
    ],
    correct: 0,
    rule: 'Rule 26(c)',
    explanation: 'Red over white all-rounds + sidelights (no separate white masthead) = Fishing vessel (not trawling) making way. Compare: NUC shows RED-RED (no white between them); trawler shows GREEN over white. Fishing vessels do not show a separate masthead light.',
  },

  // ── Q17 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q17',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead',
    lights: [
      { x: 110, y: 48,  color: '#FFFFFF', r: 8 },   // upper masthead (tow)
      { x: 110, y: 80,  color: '#FFFFFF', r: 8 },   // lower masthead (tow)
      { x: 110, y: 115, color: '#FFDD00', r: 7.5 }, // yellow towing light
      { x:  72, y: 158, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 158, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Two white mastheads + yellow light below + sidelights:',
    options: [
      'PDV towing — tow length ≤200 m',
      'PDV towing — tow length >200 m',
      'PDV ≥50 m underway (no tow)',
      'Vessel pushing ahead',
    ],
    correct: 0,
    rule: 'Rule 24(a)',
    explanation: 'Two white masthead lights (vertical) + yellow towing light (in sternlight position) + sidelights = PDV towing, tow length ≤200 m. THREE mastheads + yellow = tow >200 m. A standard PDV ≥50 m shows NO yellow towing light and the mastheads are not both in a strict vertical line forward.',
  },

  // ── Q18 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q18',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead',
    lights: [
      { x: 110, y: 38,  color: '#FFFFFF', r: 8 },   // top masthead
      { x: 110, y: 66,  color: '#FFFFFF', r: 8 },   // mid masthead
      { x: 110, y: 94,  color: '#FFFFFF', r: 8 },   // bot masthead
      { x: 110, y: 126, color: '#FFDD00', r: 7.5 }, // yellow towing light
      { x:  72, y: 162, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 162, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Three white mastheads + yellow light + sidelights. This vessel is:',
    options: [
      'PDV towing — tow length >200 m',
      'PDV towing — tow length ≤200 m',
      'Vessel constrained by draught (CBD)',
      'Minesweeper underway',
    ],
    correct: 0,
    rule: 'Rule 24(a)(i)',
    explanation: 'Three white masthead lights + yellow towing light + sidelights = PDV towing with tow length EXCEEDING 200 m. The third masthead light is the critical distinguishing feature from a tow ≤200 m (which shows only two mastheads). This signals extra caution — the tow is very long.',
  },

  // ── Q19 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q19',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead',
    lights: [
      { x:  72, y: 140, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 140, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Only red and green sidelights — no white masthead light. From ahead, this is:',
    options: [
      'Sailing vessel underway OR vessel being towed',
      'PDV <7 m (very small boat)',
      'Fishing vessel at anchor',
      'NUC vessel — just stopped making way',
    ],
    correct: 0,
    rule: 'Rules 24(d) & 25(a)',
    explanation: 'Sidelights with NO white masthead = Sailing vessel (Rule 25 — sail vessels do not carry a forward masthead light) OR vessel being towed (Rule 24(d) — towed vessel shows sidelights + sternlight, no masthead). Context and other lights (towing vessel ahead) help distinguish.',
  },

  // ── Q20 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q20',
    aspect: 'All-round',
    scenario: 'Night — sailing vessel (option)',
    lights: [
      { x: 110, y: 62,  color: '#FF2222', r: 7.5 }, // red (port sector of tricolor)
      { x: 140, y: 62,  color: '#00DD55', r: 7.5 }, // green (stbd sector of tricolor)
    ],
    q: 'A sailing vessel <20 m may show a masthead tricolor lamp. From ahead it appears as:',
    options: [
      'Red on the port side and green on the starboard side — at masthead height',
      'White masthead light + lower red and green sidelights',
      'A single all-round white light at the top of the mast',
      'Red and green all-round lights in a vertical stack',
    ],
    correct: 0,
    rule: 'Rule 25(a)(ii)',
    explanation: 'A sailing vessel ≤20 m may use a tricolor masthead lantern combining red (port 112.5°), green (stbd 112.5°) and white (stern 135°) all in one fitting at the top of the mast. From ahead you see the red and green sectors at masthead height — no separate lower sidelights or white masthead.',
  },

  // ── Q21 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q21',
    aspect: 'All-round',
    scenario: 'Night — vessel on pilotage duty',
    lights: [
      { x: 110, y: 72,  color: '#FFFFFF', r: 8 },   // upper white
      { x: 110, y: 108, color: '#FF2222', r: 8 },   // lower red
    ],
    q: 'White all-round over Red all-round. This vessel is:',
    options: [
      'Pilot vessel on pilotage duty',
      'Vessel engaged in trawling',
      'RAM vessel (not making way)',
      'Vessel at anchor ≥50 m',
    ],
    correct: 0,
    rule: 'Rule 29(a)',
    explanation: 'White over Red all-round = Pilot vessel on pilotage duty. When underway, she also shows sidelights + sternlight. When at anchor, anchor light(s) are added. Memory aid: "White over red — pilot ahead."',
  },

  // ── Q22 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q22',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead',
    lights: [
      { x: 110, y: 48,  color: '#FFFFFF', r: 8 },   // upper white (pilot signal)
      { x: 110, y: 82,  color: '#FF2222', r: 8 },   // lower red (pilot signal)
      { x: 110, y: 118, color: '#FFFFFF', r: 7.5 }, // masthead light (fwd)
      { x:  72, y: 158, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 158, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Identify this vessel making way at night:',
    options: [
      'Pilot vessel underway — on pilotage duty',
      'RAM vessel making way, from ahead',
      'Vessel towing ≤200 m underway',
      'Vessel constrained by draught (CBD)',
    ],
    correct: 0,
    rule: 'Rule 29(a)',
    explanation: 'White-over-red all-rounds + masthead + sidelights + sternlight = Pilot vessel underway on pilotage duty. The white-over-red is her identification signal; she also shows normal PDV lights when making way. Note the pilot signal is above the masthead in this configuration.',
  },

  // ── Q23 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q23',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead (hovercraft)',
    lights: [
      { x: 110, y: 60,  color: '#FFDD00', r: 9 },   // yellow flashing all-round
      { x: 110, y: 96,  color: '#FFFFFF', r: 8 },   // masthead fwd
      { x:  72, y: 148, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 148, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'A yellow flashing all-round light above normal PDV lights indicates:',
    options: [
      'Air-cushion vessel (hovercraft) in non-displacement mode',
      'Vessel engaged in mine clearance operations',
      'Wing-in-ground craft (WIG) underway on water surface',
      'Vessel with special flag-state exemption lights',
    ],
    correct: 0,
    rule: 'Rule 23(b)',
    explanation: 'Yellow flashing all-round light + normal PDV underway lights = Air-cushion vessel (hovercraft) operating in non-displacement mode. A WIG craft shows a RED flashing all-round light at the highest point. The yellow flashing is unique to hovercraft.',
  },

  // ── Q24 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q24',
    aspect: 'All-round',
    scenario: 'Night — vessel aground',
    lights: [
      { x: 110, y: 56,  color: '#FFFFFF', r: 8 },   // anchor light
      { x: 110, y: 100, color: '#FF2222', r: 8 },   // upper red (aground)
      { x: 110, y: 136, color: '#FF2222', r: 8 },   // lower red (aground)
    ],
    q: 'One white all-round + two red all-round lights below. This is:',
    options: [
      'Vessel aground <50 m',
      'RAM vessel at anchor',
      'NUC vessel at anchor',
      'CBD vessel — stopped in the water',
    ],
    correct: 0,
    rule: 'Rule 30(d)',
    explanation: 'Anchor light(s) + two all-round RED lights = Vessel AGROUND. The two red lights signal "I am aground — I cannot manoeuvre." A vessel ≥50 m aground shows two anchor lights + two red lights. This is a signal to all vessels: give this vessel a wide berth.',
  },

  // ── Q25 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q25',
    aspect: 'Astern',
    scenario: 'Night — seen from astern',
    lights: [
      { x: 110, y: 68,  color: '#FF2222', r: 8 },   // upper red (NUC)
      { x: 110, y: 102, color: '#FF2222', r: 8 },   // lower red (NUC)
      { x: 110, y: 148, color: '#FFFFFF', r: 7 },   // sternlight
    ],
    q: 'From astern: two red lights above a white sternlight. This is:',
    options: [
      'NUC vessel — making way (you are overtaking her)',
      'RAM vessel — making way, seen from astern',
      'Vessel aground — seen from astern',
      'Trawler — making way, stern view',
    ],
    correct: 0,
    rule: 'Rule 27(a)',
    explanation: 'Two red all-round lights + white sternlight seen from astern = NUC vessel making way. The all-round reds are visible from any direction; the sternlight confirms she is making way (not stopped). Rule 13 applies — you are overtaking, therefore give-way.',
  },

  // ── Q26 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q26',
    aspect: 'Ahead',
    scenario: 'Night — seen from ahead',
    lights: [
      { x: 110, y: 55,  color: '#FFFFFF', r: 8 },   // upper masthead (vertical pair)
      { x: 110, y: 88,  color: '#FFFFFF', r: 8 },   // lower masthead (vertical pair)
      { x:  72, y: 145, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 145, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'Two mastheads in a vertical line — NO yellow towing light — plus sidelights:',
    options: [
      'Vessel pushing ahead or towing alongside',
      'Vessel towing — tow length ≤200 m astern',
      'Power-driven vessel ≥50 m underway (no tow)',
      'Vessel constrained by draught (CBD)',
    ],
    correct: 0,
    rule: 'Rule 24(b)',
    explanation: 'Two vertical masthead lights with NO yellow towing light = Vessel pushing ahead or towing alongside (Rule 24(b)). A vessel towing astern (Rule 24(a)) MUST show a yellow towing light above the sternlight. A standard PDV ≥50 m shows mastheads fwd and aft (with the aft one higher and offset), not in a strict vertical line forward.',
  },

  // ── Q27 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q27',
    aspect: 'All-round',
    scenario: 'Night — minesweeper at anchor',
    lights: [
      { x:  78, y: 62,  color: '#00DD55', r: 8 },   // foremast green (all-round)
      { x: 140, y: 78,  color: '#00DD55', r: 7.5 }, // fore yard port green
      { x:  80, y: 78,  color: '#00DD55', r: 7.5 }, // fore yard stbd green
      { x: 110, y: 130, color: '#FFFFFF', r: 8 },   // anchor light
    ],
    q: 'Three green all-round lights in a triangular formation + anchor light. This is:',
    options: [
      'Vessel engaged in minesweeping operations',
      'Vessel engaged in trawling — three gear directions',
      'RAM vessel with safe passage lights',
      'Pilot vessel at anchor with special signal',
    ],
    correct: 0,
    rule: 'Rule 27(f)',
    explanation: 'Three all-round GREEN lights (one at foremast head, one at each end of the fore yard) = Vessel engaged in minesweeping. This signals that other vessels should not approach within 1000 m of the minesweeper. When underway, masthead + sidelights + sternlight are also shown.',
  },

  // ── Q28 ─────────────────────────────────────────────────────────────────────
  {
    id: 'q28',
    aspect: 'Ahead',
    scenario: 'Night — sailing vessel under engine',
    lights: [
      { x: 110, y: 88,  color: '#FFFFFF', r: 8 },   // masthead (motoring)
      { x:  72, y: 140, color: '#FF2222', r: 7 },   // port sidelight
      { x: 148, y: 140, color: '#00DD55', r: 7 },   // stbd sidelight
    ],
    q: 'A sailing vessel propelling herself by machinery shall exhibit at night:',
    options: [
      'Same as a power-driven vessel — masthead + sidelights + sternlight',
      'Tricolor only — engine use does not change her lights',
      'Red-green bicolor at masthead + white masthead (combined)',
      'Red and green sidelights only — no white masthead needed',
    ],
    correct: 0,
    rule: 'Rule 25(e)',
    explanation: 'A sailing vessel under engine (or engine + sail) must show PDV lights — masthead + sidelights + sternlight. By day she shows a cone, point downward, forward. At night her light pattern is identical to a power-driven vessel — she is treated as a PDV for COLREGS purposes.',
  },

];
