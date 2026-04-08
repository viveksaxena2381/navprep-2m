const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Vivek Saxena";
pres.title = "NavPrep 2M — Interactive Diagrams & COLREGS Scenarios";

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
  green: "2D8B4E",
  red: "C0392B",
  textDark: "1A2744",
  textMuted: "6B7280",
  cardBg: "FFFFFF",
};

const logoPath = path.resolve(__dirname, "..", "public", "logo.png");

// Helper: add gold top bar + slide title
const addSlideHeader = (slide, bg, title, titleColor) => {
  slide.background = { color: bg };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });
  if (title) {
    slide.addText(title, {
      x: 0.5, y: 0.25, w: 9, h: 0.7,
      fontSize: 32, fontFace: "Georgia", bold: true,
      color: titleColor || C.white, align: "center", margin: 0,
    });
  }
};


// ═══════════════════════════════════════════════════════
// SLIDE 1: TITLE — Focus on Interactive Learning
// ═══════════════════════════════════════════════════════
const s1 = pres.addSlide();
s1.background = { color: C.deepBlue };
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });

// Logo
s1.addImage({ path: logoPath, x: 3.85, y: 0.45, w: 2.3, h: 2.3 });

// Title
s1.addText("NavPrep 2M", {
  x: 0.5, y: 2.85, w: 9, h: 0.85,
  fontSize: 50, fontFace: "Georgia", bold: true,
  color: C.white, align: "center", margin: 0,
});

// Subtitle
s1.addText("Interactive Diagrams · COLREGS Scenarios · Visual Learning", {
  x: 0.5, y: 3.65, w: 9, h: 0.5,
  fontSize: 17, fontFace: "Calibri", italic: true,
  color: C.gold, align: "center", margin: 0,
});

// Big stat numbers
const heroStats = [
  { num: "51", label: "ANIMATED\nDIAGRAMS", color: C.teal },
  { num: "72", label: "STATIC SVG\nILLUSTRATIONS", color: C.gold },
  { num: "7", label: "COLREGS\nCATEGORIES", color: C.coral },
  { num: "12+", label: "VESSEL LIGHT\nPATTERNS", color: C.green },
];
heroStats.forEach((s, i) => {
  const xPos = 0.5 + i * 2.35;
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: 4.35, w: 2.05, h: 1.1,
    fill: { color: "152238" }, rectRadius: 0.1,
    line: { color: "2A3F5F", width: 0.8 },
  });
  s1.addText(s.num, {
    x: xPos, y: 4.35, w: 2.05, h: 0.6,
    fontSize: 30, fontFace: "Georgia", bold: true,
    color: s.color, align: "center", margin: 0,
  });
  s1.addText(s.label, {
    x: xPos, y: 4.85, w: 2.05, h: 0.5,
    fontSize: 8.5, fontFace: "Calibri", bold: true,
    color: "8899AA", align: "center", charSpacing: 2, margin: 0,
  });
});

s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.gold } });


// ═══════════════════════════════════════════════════════
// SLIDE 2: WHY INTERACTIVE DIAGRAMS MATTER
// ═══════════════════════════════════════════════════════
const s2 = pres.addSlide();
addSlideHeader(s2, C.offWhite, "Why Interactive Diagrams?", C.navy);

// Problem vs Solution
const leftItems = [
  { icon: "📖", text: "Textbook diagrams are static & hard to visualise" },
  { icon: "😰", text: "COLREGS scenarios are confusing on paper" },
  { icon: "🤷", text: "Vessel lights — impossible to memorise from tables" },
  { icon: "📝", text: "Oral examiners expect you to draw & explain" },
];
const rightItems = [
  { icon: "🎬", text: "51 animated step-by-step diagrams you can interact with" },
  { icon: "🚢", text: "Live vessel encounters — watch ships move & respond" },
  { icon: "💡", text: "12+ vessel light configs with arc displays & day shapes" },
  { icon: "✅", text: "Practice exactly what surveyors ask in MMD orals" },
];

// Left card - Problem
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: 1.15, w: 4.3, h: 3.6,
  fill: { color: C.white }, rectRadius: 0.12,
  shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.06 },
});
s2.addText("❌  The Problem", {
  x: 0.7, y: 1.3, w: 3.7, h: 0.4,
  fontSize: 16, fontFace: "Calibri", bold: true, color: C.coral, margin: 0,
});
leftItems.forEach((item, i) => {
  s2.addText(`${item.icon}  ${item.text}`, {
    x: 0.7, y: 1.85 + i * 0.65, w: 3.8, h: 0.55,
    fontSize: 11.5, fontFace: "Calibri", color: C.textDark, margin: 0, valign: "middle",
  });
});

// Right card - Solution
s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.3, y: 1.15, w: 4.3, h: 3.6,
  fill: { color: C.white }, rectRadius: 0.12,
  shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.06 },
});
s2.addText("✅  NavPrep 2M Solution", {
  x: 5.6, y: 1.3, w: 3.7, h: 0.4,
  fontSize: 16, fontFace: "Calibri", bold: true, color: C.teal, margin: 0,
});
rightItems.forEach((item, i) => {
  s2.addText(`${item.icon}  ${item.text}`, {
    x: 5.6, y: 1.85 + i * 0.65, w: 3.8, h: 0.55,
    fontSize: 11.5, fontFace: "Calibri", color: C.textDark, margin: 0, valign: "middle",
  });
});

// Bottom tagline
s2.addText("Every diagram is designed around what MMD oral examiners actually ask", {
  x: 1, y: 4.9, w: 8, h: 0.4,
  fontSize: 12, fontFace: "Calibri", italic: true, color: C.textMuted, align: "center", margin: 0,
});


// ═══════════════════════════════════════════════════════
// SLIDE 3: COLREGS / ROR SITUATIONS — The Star Feature
// ═══════════════════════════════════════════════════════
const s3 = pres.addSlide();
addSlideHeader(s3, C.deepBlue, "COLREGS Encounter Scenarios", C.white);

s3.addText("Interactive Rule-of-the-Road situations — exactly as asked in MMD orals", {
  x: 0.5, y: 0.9, w: 9, h: 0.35,
  fontSize: 12, fontFace: "Calibri", italic: true, color: C.goldLight, align: "center", margin: 0,
});

const rorCategories = [
  { icon: "⚓", title: "Head-On\n(Rule 14)", desc: "Both vessels alter to STARBOARD. 20+ scenarios including close quarters & night identification", color: "2D5F3F" },
  { icon: "✂️", title: "Crossing\n(Rule 15)", desc: "Give-way vs stand-on obligations. Multiple vessel type combinations", color: "5C4B8A" },
  { icon: "🏎️", title: "Overtaking\n(Rule 13)", desc: "Overtaking vessel ALWAYS gives way. Sound signals & safe passing distances", color: "1B6B5A" },
  { icon: "🔀", title: "Narrow Ch. / TSS\n(Rules 9 & 10)", desc: "Keep-to-starboard, no-impede rules, overtaking signal exchange", color: "8B5E3C" },
  { icon: "🌫️", title: "Restricted\nVisibility (R.19)", desc: "Radar-only detection. Why PORT turns are prohibited for forward contacts", color: "3A6B7B" },
  { icon: "🚢", title: "Special Vessels\n(Rule 18)", desc: "NUC > RAM > CBD > Fishing > Sailing > Power hierarchy in action", color: "7B3A3A" },
  { icon: "⚠️", title: "Tough\nSituations", desc: "Complex multi-vessel scenarios. The questions that separate pass from fail", color: "4A4A6A" },
];

rorCategories.forEach((cat, i) => {
  const col = i < 4 ? i : i - 4;
  const row = i < 4 ? 0 : 1;
  const w = i < 4 ? 2.15 : 2.85;
  const xPos = i < 4 ? (0.4 + col * 2.35) : (0.8 + (i - 4) * 3.05);
  const yPos = 1.45 + row * 2.0;

  s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: yPos, w: w, h: 1.75,
    fill: { color: cat.color }, rectRadius: 0.1,
  });

  s3.addText(cat.icon, {
    x: xPos, y: yPos + 0.1, w: w, h: 0.35,
    fontSize: 22, align: "center", margin: 0,
  });

  s3.addText(cat.title, {
    x: xPos + 0.1, y: yPos + 0.42, w: w - 0.2, h: 0.45,
    fontSize: 10.5, fontFace: "Calibri", bold: true,
    color: C.white, align: "center", margin: 0,
  });

  s3.addText(cat.desc, {
    x: xPos + 0.1, y: yPos + 0.9, w: w - 0.2, h: 0.7,
    fontSize: 8.5, fontFace: "Calibri",
    color: C.goldLight, align: "center", margin: 0,
  });
});

s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.gold } });


// ═══════════════════════════════════════════════════════
// SLIDE 4: WHAT EACH ROR SCENARIO INCLUDES
// ═══════════════════════════════════════════════════════
const s4 = pres.addSlide();
addSlideHeader(s4, C.white, "What Each Scenario Includes", C.navy);

const features = [
  { icon: "🚢", title: "Animated Vessel Positions", desc: "Watch ships approach, cross, and pass — step by step with course vectors and range circles" },
  { icon: "📢", title: "Sound Signals", desc: "Correct signals for each situation — 1 short, 2 short, 5 rapid blasts with timing" },
  { icon: "📖", title: "COLREGS Rule Text", desc: "Full rule reference for each scenario — know exactly which rule applies and why" },
  { icon: "🎯", title: "Action Recommendations", desc: "What to do as give-way, stand-on, or in extremis — with CPA/TCPA guidance" },
  { icon: "❓", title: "Surveyor Exam Tips", desc: "\"Why\" explanations for each action — prepared for oral examiner follow-up questions" },
  { icon: "📊", title: "Range & Bearing Display", desc: "Target vessel range, relative bearing, and aspect — real radar plotting context" },
];

features.forEach((f, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const xPos = 0.4 + col * 3.15;
  const yPos = 1.2 + row * 2.15;

  s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: yPos, w: 2.95, h: 1.85,
    fill: { color: C.offWhite }, rectRadius: 0.1,
  });

  s4.addText(f.icon, {
    x: xPos, y: yPos + 0.12, w: 2.95, h: 0.45,
    fontSize: 28, align: "center", margin: 0,
  });

  s4.addText(f.title, {
    x: xPos + 0.15, y: yPos + 0.55, w: 2.65, h: 0.35,
    fontSize: 12, fontFace: "Calibri", bold: true,
    color: C.navy, align: "center", margin: 0,
  });

  s4.addText(f.desc, {
    x: xPos + 0.15, y: yPos + 0.92, w: 2.65, h: 0.75,
    fontSize: 9.5, fontFace: "Calibri",
    color: C.textMuted, align: "center", margin: 0,
  });
});


// ═══════════════════════════════════════════════════════
// SLIDE 5: HEAD-ON COLREGS DIAGRAM (Rule 14) — Real App Screenshot
// ═══════════════════════════════════════════════════════
const colregsImgPath = path.resolve(__dirname, "colregs_headon.png");
const s5a = pres.addSlide();
addSlideHeader(s5a, C.deepBlue, "Head-On Encounter — Rule 14", C.white);
s5a.addText("Both vessels alter course to STARBOARD — pass port to port", {
  x: 0.5, y: 0.85, w: 9, h: 0.35,
  fontSize: 13, fontFace: "Calibri", italic: true, color: C.goldLight, align: "center", margin: 0,
});

// --- Real app screenshot diagram ---
s5a.addImage({ path: colregsImgPath, x: 0.6, y: 1.35, w: 5.8, h: 3.9, rounding: true });

// === Right side panel — Rule summary ===
s5a.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.7, y: 1.35, w: 2.9, h: 3.9,
  fill: { color: "111D2E" }, rectRadius: 0.12,
  line: { color: "2A3F5F", width: 1 },
});

s5a.addText("Rule 14 — Head-On", {
  x: 6.85, y: 1.5, w: 2.6, h: 0.35,
  fontSize: 14, fontFace: "Georgia", bold: true, color: "E53935", align: "center", margin: 0,
});

const rulePoints = [
  "When two power-driven vessels are meeting on reciprocal or nearly reciprocal courses",
  "Each shall alter course to STARBOARD",
  "Pass on the PORT side of the other",
  "Sound signal: 1 short blast (altering to starboard)",
  "If in doubt — assume head-on situation exists",
  "Applies when you see both sidelights of a vessel ahead",
  "At night: masthead lights in line or nearly in line",
];

rulePoints.forEach((point, i) => {
  s5a.addText(`▸ ${point}`, {
    x: 6.95, y: 2.0 + i * 0.44, w: 2.5, h: 0.4,
    fontSize: 9, fontFace: "Calibri", color: C.goldLight, margin: 0, valign: "top",
  });
});

s5a.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.gold } });


// ═══════════════════════════════════════════════════════
// SLIDE 6: THREE-BEARING FIX DIAGRAM
// ═══════════════════════════════════════════════════════
const s5b = pres.addSlide();
addSlideHeader(s5b, C.offWhite, "Three-Bearing Fix — Interactive Chart Work", C.navy);
s5b.addText("Step-by-step construction of a simultaneous fix with cocked hat", {
  x: 0.5, y: 0.85, w: 9, h: 0.35,
  fontSize: 13, fontFace: "Calibri", italic: true, color: C.textMuted, align: "center", margin: 0,
});

// --- Real app screenshot diagram ---
const bearingFixImgPath = path.resolve(__dirname, "three_bearing_fix.png");
s5b.addImage({ path: bearingFixImgPath, x: 0.5, y: 1.35, w: 5.8, h: 3.9, rounding: true });

// === Right side panel — Steps ===
s5b.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.6, y: 1.35, w: 3.0, h: 3.9,
  fill: { color: C.white }, rectRadius: 0.12,
  shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.06 },
});

s5b.addText("Step-by-Step Fix", {
  x: 6.75, y: 1.5, w: 2.7, h: 0.35,
  fontSize: 15, fontFace: "Georgia", bold: true, color: C.navy, align: "center", margin: 0,
});

const fixSteps = [
  { step: "1", title: "Take bearing to Lt Ho A", desc: "Plot LOP1 (red) — 325°", color: "EE4444" },
  { step: "2", title: "Take bearing to Lt Ho B", desc: "Plot LOP2 (green) — 042°", color: "00AA00" },
  { step: "3", title: "Take bearing to Water Twr C", desc: "Plot LOP3 (blue) — 135°", color: "0066CC" },
  { step: "4", title: "Identify the cocked hat", desc: "Triangle formed by 3 LOPs", color: "CC8800" },
  { step: "5", title: "Plot the fix position", desc: "Centre of cocked hat = Fix ⊕", color: "333333" },
];

fixSteps.forEach((s, i) => {
  // Step number circle
  s5b.addShape(pres.shapes.OVAL, {
    x: 6.85, y: 2.0 + i * 0.55, w: 0.28, h: 0.28,
    fill: { color: s.color },
  });
  s5b.addText(s.step, {
    x: 6.85, y: 2.0 + i * 0.55, w: 0.28, h: 0.28,
    fontSize: 10, fontFace: "Calibri", bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });
  s5b.addText(s.title, {
    x: 7.2, y: 1.98 + i * 0.55, w: 2.2, h: 0.2,
    fontSize: 10, fontFace: "Calibri", bold: true, color: C.navy, margin: 0,
  });
  s5b.addText(s.desc, {
    x: 7.2, y: 2.16 + i * 0.55, w: 2.2, h: 0.18,
    fontSize: 8.5, fontFace: "Calibri", color: C.textMuted, margin: 0,
  });
});

// Tip box
s5b.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.75, y: 4.75, w: 2.7, h: 0.4,
  fill: { color: "FFF8E1" }, rectRadius: 0.06,
  line: { color: "CC8800", width: 0.8 },
});
s5b.addText("💡 Ideal bearing spread: 120° between LOPs", {
  x: 6.85, y: 4.75, w: 2.5, h: 0.4,
  fontSize: 8.5, fontFace: "Calibri", bold: true, color: "8B6914", align: "center", valign: "middle", margin: 0,
});


// ═══════════════════════════════════════════════════════
// SLIDE 7: VESSEL LIGHTS & DAY SHAPES
// ═══════════════════════════════════════════════════════
const s5 = pres.addSlide();
addSlideHeader(s5, C.deepBlue, "Interactive Vessel Lights & Day Shapes", C.white);

s5.addText("12+ vessel types with color-coded light arcs, visibility ranges & day shapes", {
  x: 0.5, y: 0.9, w: 9, h: 0.35,
  fontSize: 12, fontFace: "Calibri", italic: true, color: C.goldLight, align: "center", margin: 0,
});

const vesselTypes = [
  { name: "Power ≥50m", lights: "2 Masthead + Sides + Stern", color: "2D5F3F" },
  { name: "Power <50m", lights: "1 Masthead + Sides + Stern", color: "3A6B5A" },
  { name: "Not Under Command", lights: "2 All-round Red", color: "8B2E2E" },
  { name: "RAM", lights: "Red-White-Red All-round", color: "7B3A5A" },
  { name: "CBD", lights: "3 All-round Red", color: "6B2E2E" },
  { name: "Towing ≥200m", lights: "3 Masthead + Yellow Tow", color: "5A4B2A" },
  { name: "Fishing (Trawl)", lights: "Green over White", color: "2A5A3A" },
  { name: "Fishing (Other)", lights: "Red over White", color: "5A2A2A" },
  { name: "Sailing", lights: "Sides + Stern only", color: "2A4A6A" },
  { name: "Anchor ≥50m", lights: "2 All-round White + Ball", color: "4A4A5A" },
  { name: "Pilot on Duty", lights: "White over Red", color: "3A3A6A" },
  { name: "Vessel Aground", lights: "2 Red + Anchor lights", color: "6A3A2A" },
];

vesselTypes.forEach((v, i) => {
  const col = i % 4;
  const row = Math.floor(i / 4);
  const xPos = 0.3 + col * 2.42;
  const yPos = 1.45 + row * 1.3;

  s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: yPos, w: 2.22, h: 1.1,
    fill: { color: v.color }, rectRadius: 0.08,
  });

  s5.addText(v.name, {
    x: xPos + 0.1, y: yPos + 0.1, w: 2.02, h: 0.35,
    fontSize: 11, fontFace: "Calibri", bold: true,
    color: C.white, align: "center", margin: 0,
  });

  s5.addText(v.lights, {
    x: xPos + 0.1, y: yPos + 0.5, w: 2.02, h: 0.45,
    fontSize: 9, fontFace: "Calibri",
    color: C.goldLight, align: "center", margin: 0,
  });
});

s5.addText("Each vessel type shows: light arcs (225°, 112.5°, 135°) · visibility ranges (2-6 NM) · day shapes · memory aids", {
  x: 0.5, y: 5.0, w: 9, h: 0.35,
  fontSize: 10, fontFace: "Calibri", italic: true, color: "667788", align: "center", margin: 0,
});

s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.gold } });


// ═══════════════════════════════════════════════════════
// SLIDE 6: NAVIGATION DIAGRAMS — Chart Work
// ═══════════════════════════════════════════════════════
const s6 = pres.addSlide();
addSlideHeader(s6, C.offWhite, "Navigation & Chart Work — 13 Interactive Diagrams", C.navy);

const navDiagrams = [
  { icon: "🗺️", title: "Mercator Sailing", desc: "Interactive D.Lat, D.Lo & DMP triangle" },
  { icon: "📍", title: "3-Bearing Fix", desc: "Step-by-step cocked hat construction" },
  { icon: "🔄", title: "Running Fix", desc: "Transferred position line technique" },
  { icon: "🧭", title: "Course to Steer", desc: "Tidal vector triangle for CTS calculation" },
  { icon: "📐", title: "Doubling Angle", desc: "Bow angle & four-point bearing mode" },
  { icon: "⚓", title: "Dead Reckoning", desc: "DR & EP with leeway & tidal vectors" },
  { icon: "🌍", title: "Great Circle", desc: "GC routing vs Rhumb Line comparison" },
  { icon: "✈️", title: "Plane Sailing", desc: "Right-angled triangle with sliders" },
  { icon: "📏", title: "HSA Fix", desc: "Horizontal sextant angle with draggable vessel" },
  { icon: "📊", title: "Line of Soundings", desc: "Depth profile strip matching" },
  { icon: "🔍", title: "Raising/Dipping", desc: "Geographic range calculator" },
  { icon: "🌊", title: "Running Fix + Current", desc: "CMG transfer vs course steered" },
];

navDiagrams.forEach((d, i) => {
  const col = i % 4;
  const row = Math.floor(i / 4);
  const xPos = 0.3 + col * 2.42;
  const yPos = 1.15 + row * 1.45;

  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: yPos, w: 2.22, h: 1.25,
    fill: { color: C.white }, rectRadius: 0.1,
    shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.05 },
  });

  s6.addText(d.icon, {
    x: xPos, y: yPos + 0.08, w: 2.22, h: 0.35,
    fontSize: 22, align: "center", margin: 0,
  });

  s6.addText(d.title, {
    x: xPos + 0.1, y: yPos + 0.4, w: 2.02, h: 0.3,
    fontSize: 10.5, fontFace: "Calibri", bold: true,
    color: C.navy, align: "center", margin: 0,
  });

  s6.addText(d.desc, {
    x: xPos + 0.1, y: yPos + 0.7, w: 2.02, h: 0.4,
    fontSize: 8.5, fontFace: "Calibri",
    color: C.textMuted, align: "center", margin: 0,
  });
});

// Bottom note
s6.addText("+ Day's Work calculator  ·  Compass Conversion (CDMVT)  ·  Mercator Scale visualization", {
  x: 0.5, y: 4.85, w: 9, h: 0.35,
  fontSize: 10, fontFace: "Calibri", italic: true, color: C.textMuted, align: "center", margin: 0,
});


// ═══════════════════════════════════════════════════════
// SLIDE 7: STABILITY & CELESTIAL DIAGRAMS
// ═══════════════════════════════════════════════════════
const s7 = pres.addSlide();
addSlideHeader(s7, C.deepBlue, "Stability & Celestial Navigation Diagrams", C.white);

// Stability column
s7.addText("⚖️  Stability — 11 Interactive", {
  x: 0.4, y: 1.1, w: 4.3, h: 0.4,
  fontSize: 14, fontFace: "Calibri", bold: true, color: C.gold, margin: 0,
});

const stabilityItems = [
  "GM & Metacentric Height — draggable G, B, M visualization",
  "GZ Curve with IMO IS Code criteria (pass/fail overlay)",
  "Free Surface Effect — tank fill level & virtual rise of G",
  "Trim Calculator — LCF pivot with MCTC",
  "Inclining Experiment — pendulum deflection & GM calc",
  "Angle of Loll — unstable upright with DB tank correction",
  "Damage Stability — flooding, waterline rise & list change",
  "Weight Shift — addition/removal effects on list & G",
  "Load Lines — Plimsoll marks with zone & season selection",
  "Ship Cross-Section — 3-view with interactive hotspots",
];

stabilityItems.forEach((item, i) => {
  s7.addText(`▸  ${item}`, {
    x: 0.5, y: 1.55 + i * 0.37, w: 4.5, h: 0.33,
    fontSize: 9.5, fontFace: "Calibri", color: C.goldLight, margin: 0, valign: "middle",
  });
});

// Celestial column
s7.addText("⭐  Celestial Navigation — 6 Interactive", {
  x: 5.3, y: 1.1, w: 4.3, h: 0.4,
  fontSize: 14, fontFace: "Calibri", bold: true, color: C.gold, margin: 0,
});

const celestialItems = [
  "Celestial Sphere — interactive 3D sphere visualization",
  "PZX Triangle — Position-Zenith-X for celestial fixes",
  "Intercept Workflow — Marc St. Hilaire method step-by-step",
  "GP Circle — Ground Position circle construction",
  "Amplitude & Compass — observation & error determination",
  "Sextant Principle — double reflection optics explained",
  "Sextant Parts — labeled hotspots on interactive anatomy",
  "Sextant Errors — perpendicularity, side, index, collimation",
];

celestialItems.forEach((item, i) => {
  s7.addText(`▸  ${item}`, {
    x: 5.4, y: 1.55 + i * 0.37, w: 4.3, h: 0.33,
    fontSize: 9.5, fontFace: "Calibri", color: C.goldLight, margin: 0, valign: "middle",
  });
});

// Divider line
s7.addShape(pres.shapes.RECTANGLE, {
  x: 5.05, y: 1.2, w: 0.02, h: 3.8,
  fill: { color: "2A3F5F" },
});

s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.gold } });


// ═══════════════════════════════════════════════════════
// SLIDE 8: FOG SIGNALS & SOUND SIGNALS
// ═══════════════════════════════════════════════════════
const s8 = pres.addSlide();
addSlideHeader(s8, C.white, "Sound & Fog Signals — Animated", C.navy);

s8.addText("Rule 34 (Manoeuvring) & Rule 35 (Fog) — animated signal patterns with timing", {
  x: 0.5, y: 0.9, w: 9, h: 0.35,
  fontSize: 12, fontFace: "Calibri", italic: true, color: C.textMuted, align: "center", margin: 0,
});

const signals = [
  { vessel: "Power-driven making way", signal: "1 prolonged blast", timing: "≤ 2 minutes", icon: "🚢" },
  { vessel: "Power-driven stopped", signal: "2 prolonged blasts", timing: "≤ 2 minutes", icon: "⛴️" },
  { vessel: "Sailing vessel", signal: "1 prolonged + 2 short", timing: "≤ 2 minutes", icon: "⛵" },
  { vessel: "Vessel being towed", signal: "1 prolonged + 3 short", timing: "After towing vessel", icon: "🔗" },
  { vessel: "Vessel at anchor", signal: "5 sec rapid bell ringing", timing: "≤ 1 minute", icon: "⚓" },
  { vessel: "Vessel aground", signal: "3 bell + rapid ring + 3 bell", timing: "≤ 1 minute", icon: "🪨" },
];

// Header row
const colX = [0.5, 1.2, 3.8, 6.2, 8.0];
const headLabels = ["", "VESSEL TYPE", "FOG SIGNAL", "INTERVAL", ""];
headLabels.forEach((label, i) => {
  if (label) {
    s8.addText(label, {
      x: colX[i], y: 1.4, w: i === 2 ? 2.2 : 1.8, h: 0.35,
      fontSize: 9, fontFace: "Calibri", bold: true, color: C.textMuted,
      letterSpacing: 1, margin: 0,
    });
  }
});

signals.forEach((sig, i) => {
  const yPos = 1.85 + i * 0.58;
  const bgColor = i % 2 === 0 ? C.offWhite : C.white;

  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: yPos, w: 9.2, h: 0.5,
    fill: { color: bgColor }, rectRadius: 0.06,
  });

  s8.addText(sig.icon, { x: 0.5, y: yPos, w: 0.5, h: 0.5, fontSize: 18, align: "center", margin: 0 });
  s8.addText(sig.vessel, { x: 1.2, y: yPos, w: 2.4, h: 0.5, fontSize: 11, fontFace: "Calibri", bold: true, color: C.navy, margin: 0, valign: "middle" });
  s8.addText(sig.signal, { x: 3.8, y: yPos, w: 2.2, h: 0.5, fontSize: 11, fontFace: "Calibri", color: C.coral, margin: 0, valign: "middle" });
  s8.addText(sig.timing, { x: 6.2, y: yPos, w: 1.8, h: 0.5, fontSize: 10, fontFace: "Calibri", color: C.textMuted, margin: 0, valign: "middle" });
});

// Manoeuvring signals box
s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: 4.55, w: 9.2, h: 0.8,
  fill: { color: C.navy }, rectRadius: 0.1,
});
s8.addText("Rule 34 — Manoeuvring Signals (in sight):    1 short = Starboard  ·  2 short = Port  ·  3 short = Astern  ·  5+ rapid = DANGER", {
  x: 0.6, y: 4.55, w: 8.8, h: 0.8,
  fontSize: 12, fontFace: "Calibri", bold: true,
  color: C.gold, align: "center", valign: "middle", margin: 0,
});


// ═══════════════════════════════════════════════════════
// SLIDE 9: RADAR PLOTTING & PASSAGE PLANNING
// ═══════════════════════════════════════════════════════
const s9 = pres.addSlide();
addSlideHeader(s9, C.offWhite, "Radar Plotting & Passage Planning", C.navy);

// Radar card
s9.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: 1.15, w: 4.3, h: 3.6,
  fill: { color: C.white }, rectRadius: 0.12,
  shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.06 },
});
s9.addText("📡", { x: 0.4, y: 1.3, w: 4.3, h: 0.6, fontSize: 36, align: "center", margin: 0 });
s9.addText("Radar Plotting", {
  x: 0.6, y: 1.9, w: 3.9, h: 0.4,
  fontSize: 18, fontFace: "Georgia", bold: true, color: C.navy, align: "center", margin: 0,
});
const radarFeatures = [
  "Animated target tracks on radar display",
  "Relative motion plotting with CPA/TCPA",
  "True motion vector construction",
  "Target aspect & closest point calculation",
  "Rule 19 decision integration for fog targets",
];
radarFeatures.forEach((f, i) => {
  s9.addText(`▸  ${f}`, {
    x: 0.8, y: 2.45 + i * 0.4, w: 3.7, h: 0.35,
    fontSize: 11, fontFace: "Calibri", color: C.textDark, margin: 0, valign: "middle",
  });
});

// Passage Planning card
s9.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.3, y: 1.15, w: 4.3, h: 3.6,
  fill: { color: C.white }, rectRadius: 0.12,
  shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.06 },
});
s9.addText("🗺️", { x: 5.3, y: 1.3, w: 4.3, h: 0.6, fontSize: 36, align: "center", margin: 0 });
s9.addText("Passage Planning (APEM)", {
  x: 5.5, y: 1.9, w: 3.9, h: 0.4,
  fontSize: 18, fontFace: "Georgia", bold: true, color: C.navy, align: "center", margin: 0,
});
const ppFeatures = [
  "IMO A.893(21) four-stage flow diagram",
  "Appraisal — information gathering checklist",
  "Planning — route, waypoints, contingencies",
  "Execution — monitoring & cross-track distance",
  "Watch handover step-by-step procedure",
];
ppFeatures.forEach((f, i) => {
  s9.addText(`▸  ${f}`, {
    x: 5.6, y: 2.45 + i * 0.4, w: 3.7, h: 0.35,
    fontSize: 11, fontFace: "Calibri", color: C.textDark, margin: 0, valign: "middle",
  });
});


// ═══════════════════════════════════════════════════════
// SLIDE 10: CTA — Call to Action
// ═══════════════════════════════════════════════════════
const s10 = pres.addSlide();
s10.background = { color: C.deepBlue };
s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });

s10.addImage({ path: logoPath, x: 4.0, y: 0.4, w: 2.0, h: 2.0 });

s10.addText("See the Diagrams in Action", {
  x: 0.5, y: 2.5, w: 9, h: 0.8,
  fontSize: 38, fontFace: "Georgia", bold: true,
  color: C.white, align: "center", margin: 0,
});

s10.addText("51 animated diagrams  ·  7 COLREGS categories  ·  12+ vessel light configs", {
  x: 1, y: 3.3, w: 8, h: 0.4,
  fontSize: 14, fontFace: "Calibri",
  color: C.goldLight, align: "center", margin: 0,
});

s10.addText("Free  ·  No Installation  ·  Works on Any Device", {
  x: 1, y: 3.75, w: 8, h: 0.4,
  fontSize: 14, fontFace: "Calibri",
  color: C.gold, align: "center", margin: 0,
});

// URL button
s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 2.8, y: 4.35, w: 4.4, h: 0.7,
  fill: { color: C.gold }, rectRadius: 0.35,
});
s10.addText("navprep-2m.vercel.app", {
  x: 2.8, y: 4.35, w: 4.4, h: 0.7,
  fontSize: 18, fontFace: "Calibri", bold: true,
  color: C.deepBlue, align: "center", valign: "middle", margin: 0,
  hyperlink: { url: "https://navprep-2m.vercel.app" },
});

s10.addText("Built for aspiring 2nd Mates  ·  DG Shipping CoC Exam Prep", {
  x: 1, y: 5.15, w: 8, h: 0.3,
  fontSize: 11, fontFace: "Calibri", italic: true,
  color: "667788", align: "center", margin: 0,
});

s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.gold } });


// ═══════════════════════════════════════════════════════
// SAVE
// ═══════════════════════════════════════════════════════
const outputPath = path.resolve(__dirname, "NavPrep_2M_Diagrams_Promo_v3.pptx");
pres.writeFile({ fileName: outputPath }).then(() => {
  console.log("Presentation saved to: " + outputPath);
}).catch(err => {
  console.error("Error:", err);
});
