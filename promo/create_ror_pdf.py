#!/usr/bin/env python3
"""
Generate a diamond-level colored ROR (Rules of the Road) flashcard PDF.
NavPrep 2M - Maritime exam preparation.
"""

import re
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm, cm
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY

# ── Paths ──
SOURCE_FILE = r"C:\Users\Vivek\.claude\projects\D--misc-projects-NAVI-1-2MATES\2a0a781f-cfd7-497b-aa1c-9f1fc86f54a6\tool-results\bx51bbal4.txt"
OUTPUT_FILE = r"D:\misc projects\NAVI 1 2MATES\promo\ROR_Cards_Colored.pdf"

# ── Colors ──
NAVY = HexColor('#0A1628')
NAVY_LIGHT = HexColor('#112240')
NAVY_CARD = HexColor('#1B2A4A')
GOLD = HexColor('#C9A84C')
GOLD_LIGHT = HexColor('#E8D48B')
GOLD_DARK = HexColor('#A07E2E')
TEXT_WHITE = HexColor('#E8ECF1')
TEXT_LIGHT = HexColor('#B0BEC5')
SUBTLE_LINE = HexColor('#2A3F6F')

# Action colors
GREEN_BG = HexColor('#1B4332')
GREEN_BORDER = HexColor('#2D6A4F')
AMBER_BG = HexColor('#4A3000')
AMBER_BORDER = HexColor('#E65100')

# Category colors
CATEGORY_COLORS = {
    'towing': HexColor('#1565C0'),
    'fishing': HexColor('#2E7D32'),
    'nuc': HexColor('#C62828'),
    'ram': HexColor('#C62828'),
    'sailing': HexColor('#00838F'),
    'anchored': HexColor('#F57F17'),
    'mining': HexColor('#6A1B9A'),
    'pilot': HexColor('#C9A84C'),
    'aground': HexColor('#8B0000'),
    'cbd': HexColor('#E65100'),
    'aircushion': HexColor('#00ACC1'),
    'pushing': HexColor('#455A64'),
    'dredge': HexColor('#7B1FA2'),
    'power_driven': HexColor('#1976D2'),
    'default': HexColor('#546E7A'),
}

# ── Abbreviation expansions ──
ABBREVIATIONS = [
    (r'\bP\.D\.\b', 'Power Driven'),
    (r'v/Is\b', 'vessels'),
    (r'v/sI\b', 'vessels'),
    (r'v/I\b', 'vessel'),
    (r'v/l\b', 'vessel', re.IGNORECASE),
    (r'v/i\b', 'vessel'),
    (r'\bstbd\.?\b', 'Starboard', re.IGNORECASE),
    (r'\bS\.V\.\b', 'Sailing Vessel'),
    (r'\ba/c\b', 'alter course'),
    (r'\bN\.U\.C\.\b', 'Not Under Command'),
    (r'\bR\.A\.M\.\b', 'Restricted in Ability to Manoeuvre'),
    (r'\bC\.B\.D\.\b', 'Constrained By Draught'),
    (r'\bF\.V\.\b', 'Fishing Vessel'),
    (r'\buwo\b', 'underwater operations'),
    (r'\bFord\b', 'Forward'),
    (r'\bford\b', 'forward'),
    (r'\bAddl\b', 'Additional'),
    (r'\baddl\b', 'additional'),
    (r'\bVert\b', 'Vertical'),
    (r'\bvert\b', 'vertical'),
    (r'\bHorz\b', 'Horizontal'),
    (r'\bhorz\b', 'horizontal'),
    (r'\blts\b', 'lights'),
    (r'\bspee\b', 'speed'),
]

def expand_abbreviations(text):
    """Expand maritime abbreviations in text."""
    result = text
    for entry in ABBREVIATIONS:
        if len(entry) == 3:
            pattern, replacement, flags = entry
            result = re.sub(pattern, replacement, result, flags=flags)
        else:
            pattern, replacement = entry
            result = re.sub(pattern, replacement, result)
    # Fix common OCR issues
    result = result.replace('lIght', 'Light').replace('lIghts', 'Lights')
    return result


def categorize_card(situation_text):
    """Determine category from the situation text."""
    s = situation_text.lower()
    if 'mine clearance' in s:
        return 'mining', 'Mine Clearance'
    if 'dredge' in s or 'dredger' in s:
        return 'dredge', 'Dredger'
    if 'diving' in s:
        return 'ram', 'Diving Ops'
    if 'n.u.c' in s or 'nuc' in s:
        return 'nuc', 'NUC'
    if 'r.a.m' in s or 'ram' in s:
        if 'towing' in s:
            return 'towing', 'Towing (RAM)'
        return 'ram', 'RAM'
    if 'c.b.d' in s or 'constrained by draught' in s:
        return 'cbd', 'CBD'
    if 'aground' in s:
        return 'aground', 'Aground'
    if 'pilot' in s:
        return 'pilot', 'Pilot'
    if 'anchor' in s and 'trawl' not in s and 'fish' not in s:
        return 'anchored', 'Anchored'
    if 'air' in s and 'cushion' in s:
        return 'aircushion', 'Air-cushion'
    if 'trawl' in s:
        return 'fishing', 'Trawler'
    if 'f.v.' in s or 'fishing' in s:
        return 'fishing', 'Fishing'
    if 's.v.' in s or 'sailing' in s:
        return 'sailing', 'Sailing'
    if 'push' in s:
        return 'pushing', 'Pushing'
    if 'tow' in s:
        return 'towing', 'Towing'
    if 'inconspicuous' in s or 'submerged' in s:
        return 'towing', 'Towing (Submerged)'
    if 'p.d.' in s or 'power driven' in s:
        return 'power_driven', 'Power Driven'
    return 'default', 'General'


def generate_explanation(situation, action):
    """Generate a simple English explanation for the card."""
    s = situation.lower()
    a = action.lower()

    # Determine viewing direction
    if 'end on' in s or 'head on' in s or 'from ahead' in s:
        direction = 'end_on'
    elif 'stbd side' in s or 'starboard side' in s or 'stbd. side' in s:
        direction = 'starboard'
    elif 'port side' in s in s:
        direction = 'port'
    elif 'astern' in s:
        direction = 'astern'
    else:
        direction = 'unknown'

    # Determine vessel type
    vessel_type = ''
    if 'mine clearance' in s:
        vessel_type = 'mine clearance vessel'
    elif 'dredge' in s or 'dredger' in s:
        vessel_type = 'dredger'
    elif 'trawl' in s:
        vessel_type = 'trawler'
    elif 'f.v.' in s or 'fishing' in s:
        vessel_type = 'fishing vessel'
    elif 'pilot' in s:
        vessel_type = 'pilot vessel'
    elif 'n.u.c' in s:
        vessel_type = 'vessel Not Under Command'
    elif 'r.a.m' in s:
        vessel_type = 'vessel Restricted in Ability to Manoeuvre'
    elif 'c.b.d' in s:
        vessel_type = 'vessel Constrained By Draught'
    elif 'aground' in s:
        vessel_type = 'vessel aground'
    elif 'air' in s and 'cushion' in s:
        vessel_type = 'air-cushion vessel'
    elif 's.v.' in s or 'sailing' in s:
        vessel_type = 'sailing vessel'
    elif 'push' in s:
        vessel_type = 'vessel pushing ahead'
    elif 'tow' in s:
        vessel_type = 'towing vessel'
    elif 'anchor' in s:
        vessel_type = 'anchored vessel'
    elif 'p.d.' in s:
        vessel_type = 'power-driven vessel'
    elif 'inconspicuous' in s or 'submerged' in s:
        vessel_type = 'partly submerged object being towed'
    else:
        vessel_type = 'vessel'

    # Build explanation
    is_standon = 'maintain course and speed' in a or 'maintain course speed' in a
    is_mine = 'mine clearance' in s
    is_aground = 'aground' in s

    if is_mine:
        return f"This is a {vessel_type}. You must keep well clear (at least 1000m). Sound the appropriate signal and alter course to pass safely."

    if is_aground:
        return f"This is a {vessel_type}. Immediately alter course away, reverse course if needed, and inform the Master. An aground vessel cannot manoeuvre."

    if is_standon:
        if direction == 'starboard':
            return f"You see this {vessel_type} on your starboard side. Under COLREGS you are the stand-on vessel -- maintain your course and speed."
        elif direction == 'port':
            return f"You see this {vessel_type} on your port side. You are the stand-on vessel -- maintain course and speed."
        else:
            return f"You are the stand-on vessel. Maintain your course and speed as required by the Rules."
    else:
        if direction == 'end_on':
            return f"You see this {vessel_type} end-on (head-on situation, Rule 14). Both vessels must alter to starboard. Sound one short blast."
        elif direction == 'port':
            return f"You see this {vessel_type} on your port side. You are the give-way vessel. Alter course to starboard and pass astern."
        elif direction == 'starboard':
            if 'two short' in a and 'port' in a:
                return f"This {vessel_type} is on your starboard side but is a special category vessel. Sound two short blasts and alter to port to keep clear."
            return f"You see this {vessel_type} on your starboard side. Alter course to starboard to pass around her stern."
        elif direction == 'astern':
            return f"You are overtaking this {vessel_type} from astern. As the overtaking vessel you must keep clear. Sound the appropriate signal and alter course."
        else:
            return f"Take appropriate action as per the Rules. Sound the appropriate signal and alter course to keep clear of this {vessel_type}."


def parse_cards_from_text(filepath):
    """Parse the text file and extract all cards."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Split by page markers
    pages = re.split(r'===== PAGE (\d+) =====', text)

    night_cards = []
    day_cards = []

    # Pages 2-8 are night cards (page 9 = abbreviations)
    # Pages 10-66 are day cards

    all_page_data = {}
    for i in range(1, len(pages), 2):
        page_num = int(pages[i])
        page_text = pages[i + 1]
        all_page_data[page_num] = page_text

    def extract_cards_from_page(page_text):
        """Extract individual cards from a page's text."""
        cards = []
        # Find card numbers at the start of lines
        # Card numbers appear as standalone numbers at start, like "1\n" or "25\n"
        lines = page_text.strip().split('\n')

        # Merge into card blocks
        card_blocks = []
        current_block = []
        current_num = None

        i = 0
        while i < len(lines):
            line = lines[i].strip()
            # Check if this line is a card number (standalone number)
            # Handle doubled text like "7700" and "13 13", "18 18"
            if re.match(r'^(\d+)\s*\1?\s*$', line):
                # Extract the actual number
                m = re.match(r'^(\d+)', line)
                num = int(m.group(1))
                # Skip garbled entries (like 7700 which is double-printed 70)
                if num > 500:
                    i += 1
                    continue
                if current_num is not None:
                    card_blocks.append((current_num, '\n'.join(current_block)))
                current_num = num
                current_block = []
            else:
                if current_num is not None:
                    current_block.append(line)
            i += 1

        if current_num is not None:
            card_blocks.append((current_num, '\n'.join(current_block)))

        return card_blocks

    def parse_card_fields(card_num, card_text, section):
        """Parse the 4 fields from a card's text block."""
        # Try to split by field markers: "1.", "2.", "3.", "4."
        # These appear at the start of lines
        fields = {'num': card_num, 'situation': '', 'action': '', 'signals': '', 'fog': ''}

        lines = card_text.split('\n')
        current_field = None
        field_text = {1: [], 2: [], 3: [], 4: []}

        for line in lines:
            stripped = line.strip()
            if not stripped:
                continue

            # Check for field markers
            # Match "1." or "1." at start, or "1.a)" etc
            m = re.match(r'^([1-4])[\.\s](.*)$', stripped)
            if m:
                fnum = int(m.group(1))
                rest = m.group(2).strip()
                # Only treat as new field if fnum > current or fnum==1 and current is None
                if current_field is None or fnum > current_field or (fnum == 1 and current_field is None):
                    current_field = fnum
                    if rest:
                        field_text[fnum].append(rest)
                elif current_field == fnum:
                    field_text[fnum].append(rest)
                else:
                    # Sub-item of current field
                    if current_field:
                        field_text[current_field].append(stripped)
            else:
                if current_field:
                    field_text[current_field].append(stripped)

        fields['situation'] = ' '.join(field_text[1]).strip()
        fields['action'] = ' '.join(field_text[2]).strip()
        if section == 'night':
            fields['signals'] = ' '.join(field_text[3]).strip()
            fields['signals_label'] = 'Lights'
        else:
            fields['signals'] = ' '.join(field_text[3]).strip()
            fields['signals_label'] = 'Day Signals'
        fields['fog'] = ' '.join(field_text[4]).strip()

        return fields

    # Process night cards (pages 2-8)
    for pg in range(2, 9):
        if pg in all_page_data:
            blocks = extract_cards_from_page(all_page_data[pg])
            for num, text_block in blocks:
                card = parse_card_fields(num, text_block, 'night')
                night_cards.append(card)

    # Process day cards (pages 10-66)
    for pg in range(10, 67):
        if pg in all_page_data:
            blocks = extract_cards_from_page(all_page_data[pg])
            for num, text_block in blocks:
                card = parse_card_fields(num, text_block, 'day')
                day_cards.append(card)

    # Handle garbled card 70 (page 26) - it's double-printed
    # We already skip numbers > 500 so the garbled "7700" is skipped
    # We need to manually add card 70 from the garbled data
    # Card 70 content: Trawler less than 50 m. making way seen from port side.
    card_70 = {
        'num': 70,
        'situation': 'Trawler less than 50 m. making way seen from port side.',
        'action': 'One short blast a/c to stbd.',
        'signals': 'Two cones with apexes together in vertical line.',
        'signals_label': 'Day Signals',
        'fog': 'One prolonged and two short blasts.'
    }
    # Insert card 70 in the right position
    inserted = False
    for idx, c in enumerate(day_cards):
        if c['num'] > 70:
            day_cards.insert(idx, card_70)
            inserted = True
            break
    if not inserted:
        day_cards.append(card_70)

    # Remove duplicates (same card number) - keep first occurrence
    seen_night = set()
    unique_night = []
    for c in night_cards:
        if c['num'] not in seen_night:
            seen_night.add(c['num'])
            unique_night.append(c)

    seen_day = set()
    unique_day = []
    for c in day_cards:
        if c['num'] not in seen_day:
            seen_day.add(c['num'])
            unique_day.append(c)

    return unique_night, unique_day


# ── PDF Drawing Functions ──

def draw_rounded_rect(c, x, y, w, h, radius, fill_color=None, stroke_color=None, stroke_width=0.5):
    """Draw a rounded rectangle."""
    p = c.beginPath()
    p.roundRect(x, y, w, h, radius)
    if fill_color:
        c.setFillColor(fill_color)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    if fill_color and stroke_color:
        c.drawPath(p, fill=1, stroke=1)
    elif fill_color:
        c.drawPath(p, fill=1, stroke=0)
    elif stroke_color:
        c.drawPath(p, fill=0, stroke=1)


def draw_gradient_rect(c, x, y, w, h, color_top, color_bottom, steps=20):
    """Simulate a vertical gradient with horizontal strips."""
    strip_h = h / steps
    for i in range(steps):
        ratio = i / steps
        r = color_top.red + (color_bottom.red - color_top.red) * ratio
        g = color_top.green + (color_bottom.green - color_top.green) * ratio
        b = color_top.blue + (color_bottom.blue - color_top.blue) * ratio
        from reportlab.lib.colors import Color
        c.setFillColor(Color(r, g, b))
        c.rect(x, y + h - (i + 1) * strip_h, w, strip_h + 0.5, fill=1, stroke=0)


def draw_circle_badge(c, x, y, radius, color, text_str, font_size=10):
    """Draw a colored circle with text inside."""
    c.setFillColor(color)
    c.circle(x, y, radius, fill=1, stroke=0)
    # Dark outline
    c.setStrokeColor(HexColor('#000000'))
    c.setLineWidth(0.5)
    c.circle(x, y, radius, fill=0, stroke=1)
    # Text
    c.setFillColor(white)
    c.setFont('Helvetica-Bold', font_size)
    tw = c.stringWidth(str(text_str), 'Helvetica-Bold', font_size)
    c.drawString(x - tw / 2, y - font_size / 3, str(text_str))


def wrap_text(c, text, font_name, font_size, max_width):
    """Simple text wrapper that returns list of lines."""
    words = text.split()
    lines = []
    current_line = ''
    for word in words:
        test = current_line + (' ' if current_line else '') + word
        if c.stringWidth(test, font_name, font_size) <= max_width:
            current_line = test
        else:
            if current_line:
                lines.append(current_line)
            current_line = word
    if current_line:
        lines.append(current_line)
    return lines if lines else ['']


def draw_text_block(c, text, x, y, max_width, font_name='Helvetica', font_size=8, color=TEXT_WHITE, line_height=11):
    """Draw wrapped text and return the y position after the last line."""
    lines = wrap_text(c, text, font_name, font_size, max_width)
    c.setFont(font_name, font_size)
    c.setFillColor(color)
    current_y = y
    for line in lines:
        c.drawString(x, current_y, line)
        current_y -= line_height
    return current_y


def draw_footer(c, page_num, page_width, page_height):
    """Draw page footer with page number and branding."""
    # Subtle line
    c.setStrokeColor(SUBTLE_LINE)
    c.setLineWidth(0.5)
    c.line(20 * mm, 12 * mm, page_width - 20 * mm, 12 * mm)

    # Page number
    c.setFont('Helvetica', 8)
    c.setFillColor(TEXT_LIGHT)
    c.drawCentredString(page_width / 2, 7 * mm, f"Page {page_num}")

    # NavPrep 2M
    c.setFont('Helvetica-Oblique', 7)
    c.setFillColor(GOLD_DARK)
    c.drawRightString(page_width - 20 * mm, 7 * mm, "NavPrep 2M")


def draw_title_page(c, page_width, page_height):
    """Draw an elegant title page."""
    # Full page navy background
    c.setFillColor(NAVY)
    c.rect(0, 0, page_width, page_height, fill=1, stroke=0)

    # Decorative top bar
    draw_gradient_rect(c, 0, page_height - 8 * mm, page_width, 8 * mm, GOLD, GOLD_DARK)

    # Decorative bottom bar
    draw_gradient_rect(c, 0, 0, page_width, 4 * mm, GOLD_DARK, GOLD)

    # Center diamond shape decoration
    center_x = page_width / 2
    center_y = page_height * 0.55

    # Diamond outline
    diamond_size = 60
    p = c.beginPath()
    p.moveTo(center_x, center_y + diamond_size)
    p.lineTo(center_x + diamond_size * 0.7, center_y)
    p.lineTo(center_x, center_y - diamond_size)
    p.lineTo(center_x - diamond_size * 0.7, center_y)
    p.close()
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.drawPath(p, fill=0, stroke=1)

    # Inner diamond
    diamond_size2 = 45
    p2 = c.beginPath()
    p2.moveTo(center_x, center_y + diamond_size2)
    p2.lineTo(center_x + diamond_size2 * 0.7, center_y)
    p2.lineTo(center_x, center_y - diamond_size2)
    p2.lineTo(center_x - diamond_size2 * 0.7, center_y)
    p2.close()
    c.setFillColor(GOLD_DARK)
    c.setLineWidth(1)
    c.drawPath(p2, fill=1, stroke=1)

    # Anchor symbol text inside diamond
    c.setFont('Helvetica-Bold', 28)
    c.setFillColor(NAVY)
    tw = c.stringWidth('ROR', 'Helvetica-Bold', 28)
    c.drawString(center_x - tw / 2, center_y - 8, 'ROR')

    # Main title
    y = center_y - diamond_size - 30
    c.setFont('Helvetica-Bold', 28)
    c.setFillColor(GOLD)
    title = "Rules of the Road"
    tw = c.stringWidth(title, 'Helvetica-Bold', 28)
    c.drawString(center_x - tw / 2, y, title)

    y -= 30
    c.setFont('Helvetica-Bold', 18)
    c.setFillColor(GOLD_LIGHT)
    sub = "Flashcards"
    tw = c.stringWidth(sub, 'Helvetica-Bold', 18)
    c.drawString(center_x - tw / 2, y, sub)

    # Divider line
    y -= 20
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.line(center_x - 80, y, center_x + 80, y)

    # Subtitle
    y -= 30
    c.setFont('Helvetica', 12)
    c.setFillColor(TEXT_LIGHT)
    sub2 = "Night Cards & Day Cards"
    tw = c.stringWidth(sub2, 'Helvetica', 12)
    c.drawString(center_x - tw / 2, y, sub2)

    y -= 20
    c.setFont('Helvetica', 10)
    c.setFillColor(TEXT_LIGHT)
    sub3 = "Complete ROR card set for 2nd Mate CoC preparation"
    tw = c.stringWidth(sub3, 'Helvetica', 10)
    c.drawString(center_x - tw / 2, y, sub3)

    # Bottom branding
    y = 40 * mm
    c.setFont('Helvetica-Bold', 20)
    c.setFillColor(GOLD)
    brand = "NavPrep 2M"
    tw = c.stringWidth(brand, 'Helvetica-Bold', 20)
    c.drawString(center_x - tw / 2, y, brand)

    y -= 18
    c.setFont('Helvetica', 9)
    c.setFillColor(TEXT_LIGHT)
    tag = "DG Shipping 2nd Mate Certificate of Competency"
    tw = c.stringWidth(tag, 'Helvetica', 9)
    c.drawString(center_x - tw / 2, y, tag)


def draw_section_divider(c, page_width, page_height, section_title, section_subtitle, card_count):
    """Draw a section divider page."""
    c.setFillColor(NAVY)
    c.rect(0, 0, page_width, page_height, fill=1, stroke=0)

    center_x = page_width / 2
    center_y = page_height / 2

    # Large decorative circle
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.circle(center_x, center_y + 20, 70, fill=0, stroke=1)
    c.setLineWidth(1)
    c.circle(center_x, center_y + 20, 60, fill=0, stroke=1)

    # Section icon/text
    c.setFont('Helvetica-Bold', 24)
    c.setFillColor(GOLD)
    if 'Night' in section_title:
        icon = "NIGHT"
    else:
        icon = "DAY"
    tw = c.stringWidth(icon, 'Helvetica-Bold', 24)
    c.drawString(center_x - tw / 2, center_y + 14, icon)

    # Section title
    y = center_y - 70
    c.setFont('Helvetica-Bold', 24)
    c.setFillColor(GOLD)
    tw = c.stringWidth(section_title, 'Helvetica-Bold', 24)
    c.drawString(center_x - tw / 2, y, section_title)

    # Subtitle
    y -= 25
    c.setFont('Helvetica', 12)
    c.setFillColor(TEXT_LIGHT)
    tw = c.stringWidth(section_subtitle, 'Helvetica', 12)
    c.drawString(center_x - tw / 2, y, section_subtitle)

    # Card count
    y -= 30
    c.setFont('Helvetica-Bold', 14)
    c.setFillColor(GOLD_LIGHT)
    count_text = f"{card_count} Cards"
    tw = c.stringWidth(count_text, 'Helvetica-Bold', 14)
    c.drawString(center_x - tw / 2, y, count_text)

    # Decorative lines
    c.setStrokeColor(GOLD_DARK)
    c.setLineWidth(0.5)
    c.line(center_x - 100, y - 10, center_x + 100, y - 10)


def draw_card(c, card, x, y, card_width, card_height, section):
    """Draw a single flashcard at the given position."""
    situation_raw = card['situation']
    action_raw = card['action']
    signals_raw = card['signals']
    fog_raw = card['fog']
    card_num = card['num']
    signals_label = card.get('signals_label', 'Lights' if section == 'night' else 'Day Signals')

    # Categorize
    cat_key, cat_label = categorize_card(situation_raw)
    cat_color = CATEGORY_COLORS.get(cat_key, CATEGORY_COLORS['default'])

    # Expand abbreviations for situation
    situation_expanded = expand_abbreviations(situation_raw)
    action_expanded = expand_abbreviations(action_raw)
    signals_expanded = expand_abbreviations(signals_raw)
    fog_expanded = expand_abbreviations(fog_raw)

    # Generate explanation
    explanation = generate_explanation(situation_raw, action_raw)

    # Determine action color
    is_maintain = 'maintain' in action_raw.lower()
    action_bg = GREEN_BG if is_maintain else AMBER_BG
    action_border = GREEN_BORDER if is_maintain else AMBER_BORDER

    margin = 6 * mm
    inner_width = card_width - 2 * margin

    # Card background
    draw_rounded_rect(c, x, y, card_width, card_height, 4 * mm, fill_color=NAVY_CARD, stroke_color=SUBTLE_LINE, stroke_width=1)

    # Top accent bar with category color
    p = c.beginPath()
    r = 4 * mm
    p.moveTo(x + r, y + card_height)
    p.arcTo(x + card_width - r, y + card_height - r, x + card_width, y + card_height, -90, -90)
    p.lineTo(x + card_width, y + card_height - 4 * mm)
    p.lineTo(x, y + card_height - 4 * mm)
    p.arcTo(x, y + card_height - r, x + r, y + card_height, 180, -90)
    p.close()
    c.setFillColor(cat_color)
    c.drawPath(p, fill=1, stroke=0)

    # Card number badge
    badge_x = x + margin + 8
    badge_y = y + card_height - 4 * mm
    draw_circle_badge(c, badge_x, badge_y, 8, NAVY, str(card_num), 8)

    # Category label on top bar
    c.setFont('Helvetica-Bold', 8)
    c.setFillColor(white)
    c.drawString(badge_x + 14, badge_y - 3, cat_label)

    # Section indicator (Night/Day)
    section_label = "NIGHT" if section == 'night' else "DAY"
    c.setFont('Helvetica', 6)
    c.setFillColor(HexColor('#FFFFFF99'))
    c.drawRightString(x + card_width - margin, badge_y - 2, section_label)

    # Content area
    content_y = y + card_height - 4 * mm - 6 * mm

    # Q1: Situation (bold, expanded)
    c.setFont('Helvetica-Bold', 7)
    c.setFillColor(GOLD_LIGHT)
    c.drawString(x + margin, content_y, "SITUATION")
    content_y -= 2 * mm
    content_y = draw_text_block(c, situation_expanded, x + margin, content_y, inner_width,
                                'Helvetica-Bold', 7.5, TEXT_WHITE, 10)
    content_y -= 3 * mm

    # Q2: Action (color-coded background)
    action_box_y = content_y + 2 * mm
    # Estimate action height
    action_lines = wrap_text(c, action_expanded, 'Helvetica-Bold', 7.5, inner_width - 6 * mm)
    action_h = max(len(action_lines) * 10 + 8, 18)

    draw_rounded_rect(c, x + margin - 2, content_y - action_h + 6, inner_width + 4, action_h + 2,
                      2 * mm, fill_color=action_bg, stroke_color=action_border, stroke_width=0.8)

    # Action label
    c.setFont('Helvetica-Bold', 6)
    c.setFillColor(GOLD if is_maintain else HexColor('#FFB74D'))
    action_label_text = "ACTION -- STAND ON" if is_maintain else "ACTION -- GIVE WAY"
    c.drawString(x + margin + 2, content_y, action_label_text)
    content_y -= 3 * mm

    action_color = HexColor('#81C784') if is_maintain else HexColor('#FFB74D')
    content_y = draw_text_block(c, action_expanded, x + margin + 2, content_y, inner_width - 6 * mm,
                                'Helvetica-Bold', 7.5, action_color, 10)
    content_y -= 3 * mm

    # Q3: Lights / Day signals
    c.setFont('Helvetica-Bold', 7)
    c.setFillColor(GOLD_LIGHT)
    c.drawString(x + margin, content_y, signals_label.upper())
    content_y -= 2 * mm
    content_y = draw_text_block(c, signals_expanded, x + margin, content_y, inner_width,
                                'Helvetica', 7, TEXT_LIGHT, 9.5)
    content_y -= 3 * mm

    # Q4: Fog signals
    c.setFont('Helvetica-Bold', 7)
    c.setFillColor(GOLD_LIGHT)
    c.drawString(x + margin, content_y, "FOG SIGNALS")
    content_y -= 2 * mm
    content_y = draw_text_block(c, fog_expanded, x + margin, content_y, inner_width,
                                'Helvetica', 7, TEXT_LIGHT, 9.5)
    content_y -= 3 * mm

    # Explanation box
    # Subtle divider
    c.setStrokeColor(SUBTLE_LINE)
    c.setLineWidth(0.3)
    c.line(x + margin, content_y + 1 * mm, x + card_width - margin, content_y + 1 * mm)

    c.setFont('Helvetica-Bold', 6)
    c.setFillColor(GOLD_DARK)
    c.drawString(x + margin, content_y - 1 * mm, "WHY?")
    content_y -= 4 * mm
    draw_text_block(c, explanation, x + margin, content_y, inner_width,
                    'Helvetica-Oblique', 6.5, HexColor('#90A4AE'), 9)


def generate_pdf():
    """Main function to generate the PDF."""
    print("Parsing cards from source file...")
    night_cards, day_cards = parse_cards_from_text(SOURCE_FILE)
    print(f"Found {len(night_cards)} night cards and {len(day_cards)} day cards")

    page_width, page_height = A4
    c = canvas.Canvas(OUTPUT_FILE, pagesize=A4)
    c.setTitle("ROR Cards - Rules of the Road Flashcards - NavPrep 2M")
    c.setAuthor("NavPrep 2M")

    page_num = 0

    # ── Title Page ──
    page_num += 1
    draw_title_page(c, page_width, page_height)
    c.showPage()

    # ── Night Cards Section Divider ──
    page_num += 1
    draw_section_divider(c, page_width, page_height,
                        "Night Cards", "Lights and fog signals for vessels seen at night",
                        len(night_cards))
    draw_footer(c, page_num, page_width, page_height)
    c.showPage()

    # ── Night Cards (2 per page) ──
    card_margin_x = 12 * mm
    card_margin_top = 18 * mm
    card_margin_bottom = 18 * mm
    card_gap = 6 * mm
    card_width = page_width - 2 * card_margin_x
    card_height = (page_height - card_margin_top - card_margin_bottom - card_gap) / 2

    for i in range(0, len(night_cards), 2):
        page_num += 1
        # Page background
        c.setFillColor(NAVY)
        c.rect(0, 0, page_width, page_height, fill=1, stroke=0)

        # Card 1 (top)
        y1 = page_height - card_margin_top - card_height
        draw_card(c, night_cards[i], card_margin_x, y1, card_width, card_height, 'night')

        # Card 2 (bottom) if exists
        if i + 1 < len(night_cards):
            y2 = card_margin_bottom
            draw_card(c, night_cards[i + 1], card_margin_x, y2, card_width, card_height, 'night')

        draw_footer(c, page_num, page_width, page_height)
        c.showPage()

    # ── Day Cards Section Divider ──
    page_num += 1
    draw_section_divider(c, page_width, page_height,
                        "Day Cards", "Day signals and fog signals for vessels seen during daylight",
                        len(day_cards))
    draw_footer(c, page_num, page_width, page_height)
    c.showPage()

    # ── Day Cards (2 per page) ──
    for i in range(0, len(day_cards), 2):
        page_num += 1
        # Page background
        c.setFillColor(NAVY)
        c.rect(0, 0, page_width, page_height, fill=1, stroke=0)

        # Card 1 (top)
        y1 = page_height - card_margin_top - card_height
        draw_card(c, day_cards[i], card_margin_x, y1, card_width, card_height, 'day')

        # Card 2 (bottom) if exists
        if i + 1 < len(day_cards):
            y2 = card_margin_bottom
            draw_card(c, day_cards[i + 1], card_margin_x, y2, card_width, card_height, 'day')

        draw_footer(c, page_num, page_width, page_height)
        c.showPage()

    c.save()
    print(f"\nPDF generated successfully: {OUTPUT_FILE}")
    print(f"Total pages: {page_num}")


if __name__ == '__main__':
    generate_pdf()
