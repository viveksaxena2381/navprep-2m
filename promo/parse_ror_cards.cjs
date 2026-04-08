#!/usr/bin/env node
/**
 * Parse ROR Cards from extracted PDF text and output JS arrays
 * for use in the RORCardsAnim component.
 */
const fs = require('fs');
const path = require('path');

const SOURCE = path.resolve(__dirname, '..', '.claude', 'projects', 'D--misc-projects-NAVI-1-2MATES',
  '2a0a781f-cfd7-497b-aa1c-9f1fc86f54a6', 'tool-results', 'bx51bbal4.txt');
// Try alternate path
const SOURCE2 = String.raw`C:\Users\Vivek\.claude\projects\D--misc-projects-NAVI-1-2MATES\2a0a781f-cfd7-497b-aa1c-9f1fc86f54a6\tool-results\bx51bbal4.txt`;

const src = fs.existsSync(SOURCE) ? SOURCE : SOURCE2;
const text = fs.readFileSync(src, 'utf-8');

// Split by page markers
const pageRegex = /===== PAGE (\d+) =====/g;
const pages = {};
let match;
const splits = text.split(/===== PAGE \d+ =====/);
const pageNums = [];
while ((match = pageRegex.exec(text)) !== null) pageNums.push(parseInt(match[1]));
for (let i = 0; i < pageNums.length; i++) pages[pageNums[i]] = splits[i + 1] || '';

// Extract card blocks from a page
function extractCards(pageText) {
  const lines = pageText.trim().split('\n');
  const blocks = [];
  let curNum = null, curLines = [];
  for (const raw of lines) {
    const line = raw.trim();
    // Card number: standalone number at start of line
    const m = line.match(/^(\d+)\s*\1?\s*$/); // handles "13 13", "18 18" doubled
    if (m) {
      const num = parseInt(m[1]);
      if (num > 500) continue; // skip garbled like "7700"
      if (curNum !== null) blocks.push({ num: curNum, text: curLines.join('\n') });
      curNum = num;
      curLines = [];
    } else if (curNum !== null) {
      curLines.push(line);
    }
  }
  if (curNum !== null) blocks.push({ num: curNum, text: curLines.join('\n') });
  return blocks;
}

// Parse fields from card text
function parseFields(num, cardText, section) {
  const lines = cardText.split('\n').map(l => l.trim()).filter(Boolean);
  let curField = null;
  const fields = { 1: [], 2: [], 3: [], 4: [] };
  for (const line of lines) {
    const m = line.match(/^([1-4])[\.\s](.*)$/);
    if (m) {
      const fnum = parseInt(m[1]);
      const rest = m[2].trim();
      if (curField === null || fnum >= curField) {
        curField = fnum;
        if (rest) fields[fnum].push(rest);
      } else {
        if (curField) fields[curField].push(line);
      }
    } else if (curField) {
      fields[curField].push(line);
    }
  }
  return {
    num,
    situation: fields[1].join(' ').trim(),
    action: fields[2].join(' ').trim(),
    signals: fields[3].join(' ').trim(),
    fog: fields[4].join(' ').trim(),
    section,
  };
}

// Abbreviation expansion
function expand(s) {
  return s
    .replace(/P\.D\.\s*/g, 'Power-driven ')
    .replace(/\bv\/Is\b/g, 'vessels')
    .replace(/\bv\/I\b/g, 'vessel')
    .replace(/\bv\/l\b/gi, 'vessel')
    .replace(/\bv\/i\b/g, 'vessel')
    .replace(/\bstbd\.?\b/gi, 'starboard')
    .replace(/S\.V\.\s*/g, 'Sailing vessel ')
    .replace(/\ba\/c\b/g, 'alter course')
    .replace(/N\.U\.C\./g, 'NUC')
    .replace(/R\.A\.M\./g, 'RAM')
    .replace(/C\.B\.D\./g, 'CBD')
    .replace(/F\.V\./g, 'Fishing vessel')
    .replace(/\bFord\b/g, 'Forward')
    .replace(/\bford\b/g, 'forward')
    .replace(/\bAddl\b/g, 'Additional')
    .replace(/\baddl\b/g, 'additional')
    .replace(/\bVert\b/g, 'Vertical')
    .replace(/\bvert\b/g, 'vertical')
    .replace(/\bHorz\b/g, 'Horizontal')
    .replace(/\bhorz\b/g, 'horizontal')
    .replace(/\bIts\b/g, 'lights')
    .replace(/\bits\b/g, 'lights')
    .replace(/\bIt\b/g, 'light')
    .replace(/\bspee\b/g, 'speed')
    .replace(/\bManitain\b/g, 'Maintain')
    .replace(/\bSnopped\b/g, 'Stopped')
    .replace(/\bintervat\b/g, 'interval')
    .replace(/\bbali\b/g, 'ball')
    .replace(/\bstem\b/g, 'stern')
    .replace(/\blenth\b/g, 'length')
    .replace(/\blignts\b/g, 'lights')
    .replace(/\btower\b/g, 'lower')
    .replace(/\bbee\b/g, 'be')
    .replace(/\bsingal\b/g, 'signal')
    .replace(/\bLights\b/g, 'lights')
    .replace(/\bLight\b/g, 'light')
    .replace(/  +/g, ' ')
    .trim();
}

// Categorize card
function categorize(sit) {
  const s = sit.toLowerCase();
  if (s.includes('towing') || s.includes('tow ') || s.includes('towed')) {
    if (s.includes('ram') || s.includes('restricted')) return 'Towing';
    return 'Towing';
  }
  if (s.includes('pushing')) return 'Pushing';
  if (s.includes('alongside') && !s.includes('fishing')) return 'Towing';
  if (s.includes('trawler') || s.includes('fishing') || s.includes('nets') || s.includes('net ')) return 'Fishing';
  if (s.includes('not under command') || s.includes('nuc') || s.includes('n.u.c')) return 'NUC';
  if (s.includes('ram') || s.includes('restricted') || s.includes('dredge') || s.includes('diving')) return 'RAM';
  if (s.includes('sailing') || s.includes('s.v.') || s.includes('sail')) return 'Sailing';
  if (s.includes('aground')) return 'Aground';
  if (s.includes('anchor')) return 'Anchored';
  if (s.includes('mine clearance') || s.includes('mine ')) return 'Mine';
  if (s.includes('constrained by draught') || s.includes('c.b.d')) return 'CBD';
  if (s.includes('pilot')) return 'Pilot';
  if (s.includes('air') && s.includes('cushion')) return 'ACV';
  if (s.includes('inconspicuous') || s.includes('submerged')) return 'Towing';
  return 'PD';
}

// Generate "why" explanation
function generateWhy(sit, action) {
  const s = sit.toLowerCase();
  const a = action.toLowerCase();

  if (a.includes('maintain course')) {
    if (s.includes('starboard') || s.includes('stbd'))
      return 'Vessel on your starboard side — you are the stand-on vessel. Hold your course and speed.';
    return 'You are the stand-on vessel. Maintain course and speed.';
  }
  if (s.includes('end on') || s.includes('seen from ahead'))
    return 'Head-on situation (Rule 14). Both vessels alter to starboard and pass port-to-port.';
  if (s.includes('port'))
    return 'Vessel on your port side — you are the give-way vessel. Alter to starboard to pass astern.';
  if (s.includes('starboard') || s.includes('stbd'))
    return 'Vessel on your starboard side — keep clear and alter as appropriate.';
  if (s.includes('astern') || s.includes('from behind'))
    return 'Vessel seen from astern — overtaking situation. Take appropriate action.';
  if (s.includes('aground'))
    return 'Vessel aground — danger zone with shallow water. Stay well clear and inform the Master.';
  if (s.includes('anchor'))
    return 'Vessel at anchor. Alter to keep clear.';
  return 'Take appropriate action as per COLREGS rules.';
}

// Collect night cards (pages 2-8)
let nightCards = [];
for (let pg = 2; pg <= 8; pg++) {
  if (pages[pg]) {
    for (const block of extractCards(pages[pg])) {
      nightCards.push(parseFields(block.num, block.text, 'night'));
    }
  }
}

// Collect day cards (pages 10-66)
let dayCards = [];
for (let pg = 10; pg <= 66; pg++) {
  if (pages[pg]) {
    for (const block of extractCards(pages[pg])) {
      dayCards.push(parseFields(block.num, block.text, 'day'));
    }
  }
}

// Add missing card 70 (garbled as "7700")
const card70idx = dayCards.findIndex(c => c.num > 70);
const card70 = {
  num: 70, section: 'day',
  situation: 'Trawler less than 50 m. making way seen from port side.',
  action: 'One short blast a/c to stbd.',
  signals: 'Two cones with apexes together in vertical line.',
  fog: 'One prolonged and two short blasts.',
};
if (card70idx >= 0) dayCards.splice(card70idx, 0, card70);
else dayCards.push(card70);

// Deduplicate
const seenN = new Set();
nightCards = nightCards.filter(c => { if (seenN.has(c.num)) return false; seenN.add(c.num); return true; });
const seenD = new Set();
dayCards = dayCards.filter(c => { if (seenD.has(c.num)) return false; seenD.add(c.num); return true; });

// Sort
nightCards.sort((a, b) => a.num - b.num);
dayCards.sort((a, b) => a.num - b.num);

console.log(`Parsed: ${nightCards.length} night cards, ${dayCards.length} day cards`);

// Generate JS output
function cardToJS(c, isNight) {
  const sit = expand(c.situation);
  const act = expand(c.action);
  const sig = expand(c.signals);
  const fog = expand(c.fog);
  const cat = categorize(c.situation);
  const why = generateWhy(c.situation, c.action);
  const sigKey = isNight ? 'lights' : 'day';

  return `  { id:${c.num}, cat:"${cat}", sit:${JSON.stringify(sit)}, action:${JSON.stringify(act)}, why:${JSON.stringify(why)}, ${sigKey}:${JSON.stringify(sig)}, fog:${JSON.stringify(fog)} }`;
}

let output = '// === NIGHT CARDS ===\n const nightCards = [\n';
output += nightCards.map(c => cardToJS(c, true)).join(',\n');
output += '\n ];\n\n';

output += '// === DAY CARDS ===\n const dayCards = [\n';
output += dayCards.map(c => cardToJS(c, false)).join(',\n');
output += '\n ];\n';

fs.writeFileSync(path.resolve(__dirname, 'ror_cards_data.js'), output, 'utf-8');
console.log('Written to promo/ror_cards_data.js');
