// NavPrep 2M — Flashcard Decks
// front: term / concept / rule
// back: definition, rule text, or key points (markdown-lite: ** for bold, \n for newline)

export const FLASHCARD_DECKS = [

  // ══════════════════════════════════════════════════════════════
  // NAVIGATION
  // ══════════════════════════════════════════════════════════════
  {
    id: 'nav-charts',
    subjectId: 'nav',
    name: 'Charts & Projections',
    icon: '🗺️',
    color: '#1B5E9A',
    cards: [
      { id: 'nc01', front: 'Mercator Chart', back: '**Conformal (orthomorphic) projection.** Meridians and parallels are straight, parallel, and perpendicular.\n\n• Rhumb lines appear as straight lines\n• Great circles appear as curves (except meridians/equator)\n• Scale increases with latitude — NOT usable near poles\n• Standard chart for coastal/ocean navigation' },
      { id: 'nc02', front: 'Gnomonic Chart', back: '**Great circle projection** — all great circles appear as straight lines.\n\n• Used to plot great circle routes\n• NOT conformal — angles and shapes are distorted\n• Transfer great circle waypoints to Mercator for actual navigation' },
      { id: 'nc03', front: 'Rhumb Line', back: 'A line that **cuts all meridians at the same angle**.\n\n• Appears as a straight line on a Mercator chart\n• NOT the shortest distance (except along equator or meridian)\n• Longer than great circle route — except for short distances or E-W near equator\n• Easy to steer — constant course' },
      { id: 'nc04', front: 'Great Circle', back: 'Any circle on the Earth\'s surface whose **plane passes through the centre** of the Earth.\n\n• **Shortest distance** between two points on the Earth\'s surface\n• Appears as a straight line on a Gnomonic chart\n• Appears as a curve on a Mercator chart (curves toward the pole)\n• Equator and all meridians are great circles' },
      { id: 'nc05', front: 'DMP — Difference in Meridional Parts', back: 'Used in **Mercator sailing** to account for scale expansion with latitude.\n\n**Formula:** DMP = MP(lat₂) − MP(lat₁)\n\nMeridional part = 3437.75 × log tan(45° + lat/2)\n\n**Mercator Course:** tan Co = D.Long / DMP\n**Distance:** D = D.Lat × sec Co' },
      { id: 'nc06', front: 'Departure (Dep)', back: 'The **east-west distance in nautical miles** made good.\n\n**Formula:** Dep = D.Long × cos(Mean Lat)\n\nor: Dep = Dist × sin(Course)\n\nUsed in plane sailing for short distances where Earth curvature is ignored.' },
      { id: 'nc07', front: 'Vertex of a Great Circle', back: 'The **point of maximum latitude** on a great circle track.\n\n• At the vertex, the great circle is **parallel to the equator** (course = 090° or 270°)\n• Used to determine highest latitude reached on a great circle route\n• Relevant for ice avoidance routing' },
      { id: 'nc08', front: 'Composite Great Circle Sailing', back: 'A **modified great circle route** that limits maximum latitude to avoid ice or restricted waters.\n\n• Follow great circle to limiting latitude\n• Sail along the parallel of limiting latitude\n• Resume great circle to destination\n• Calculated using Gnomonic chart or spherical trigonometry' },
    ],
  },

  {
    id: 'nav-celestial',
    subjectId: 'nav',
    name: 'Celestial Navigation',
    icon: '⭐',
    color: '#1B5E9A',
    cards: [
      { id: 'cel01', front: 'GHA — Greenwich Hour Angle', back: 'Angular distance of a celestial body **westward from the Greenwich Meridian**.\n\n• Measured 0°–360° westward\n• Found in Nautical Almanac for Sun, Moon, planets, Aries\n• Increases by ~15°/hour (Earth rotates)\n\n**LHA = GHA + East Longitude − West Longitude** (or ± longitude)' },
      { id: 'cel02', front: 'LHA — Local Hour Angle', back: '**LHA = GHA ± Longitude**\n(+ if East, − if West)\n\n• Angular distance of body westward from **observer\'s meridian**\n• LHA = 0° when body is on meridian (upper transit/meridian passage)\n• Used with declination and latitude to compute altitude and azimuth (Hc, Zn)' },
      { id: 'cel03', front: 'Declination', back: '**Angular distance of a celestial body north or south of the celestial equator.**\n\nSame concept as latitude but for celestial sphere.\n\n• Sun: ranges from 23.5°N (summer solstice) to 23.5°S (winter solstice)\n• Changes slowly — found in Nautical Almanac daily\n• Used in all celestial calculations (PZX triangle)' },
      { id: 'cel04', front: 'Zenith Distance (ZD)', back: '**ZD = 90° − Observed Altitude (Ho)**\n\n• Angular distance of body from observer\'s zenith\n• True Zenith Distance (TZD) is used to determine latitude\n• At meridian passage: **Latitude = ZD ± Declination** (same name: subtract, opposite name: add)' },
      { id: 'cel05', front: 'Meridian Altitude (Meridian Passage)', back: 'When the Sun (or other body) crosses the observer\'s meridian — **maximum altitude for the day.**\n\nTime of meridian passage from Almanac.\n\n**Latitude by meridian altitude:**\nLat = 90° − Corrected Altitude ± Declination\n(Declination same name as Lat: subtract; opposite: add)\n\nPrecision: ±1\' of latitude' },
      { id: 'cel06', front: 'Intercept Method (Marc St. Hilaire)', back: '**Comparing observed altitude (Ho) with computed altitude (Hc) at an assumed position.**\n\n1. Assume position (AP) near DR\n2. Calculate Hc and Zn using AP, Dec, LHA\n3. Compare: **Intercept (a) = Ho − Hc**\n4. If Ho > Hc → toward (GOAT)\n5. Plot position line through AP perpendicular to Zn, offset by intercept\n\nGOAT: **G**reater **O**bserved **A**way **T**oward (if Ho > Hc → toward)' },
      { id: 'cel07', front: 'Amplitude', back: 'The bearing of a rising or setting body **measured from East (rising) or West (setting)**.\n\n**sin A = sin Dec / cos Lat**\n\n• Amplitude E → N in NH in summer (body rises north of east)\n• Used to find **Compass Error** at sunrise/sunset\n• **True Amplitude:** prefix E or W; suffix N or S\n• Compass Error = True Bearing − Compass Bearing' },
      { id: 'cel08', front: 'SHA — Sidereal Hour Angle', back: '**Fixed angular distance of a star westward from Aries (γ).**\n\n• Stars have essentially constant SHA (changes very slowly)\n• Found in Nautical Almanac (monthly pages)\n\n**GHA★ = GHA♈ + SHA★**\n\nAries (♈) is the vernal equinox point — reference for stellar navigation.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // METEOROLOGY
  // ══════════════════════════════════════════════════════════════
  {
    id: 'met-basics',
    subjectId: 'met',
    name: 'Weather Systems',
    icon: '🌤️',
    color: '#1F6B3A',
    cards: [
      { id: 'met01', front: 'Buys Ballot\'s Law', back: '**Stand with your back to the wind:**\n\n• **N. Hemisphere:** Low pressure is to your LEFT\n• **S. Hemisphere:** Low pressure is to your RIGHT\n\nWind circulates **anticlockwise** around lows in NH, **clockwise** in SH.\n(Reversed for highs)\n\nUsed to locate a depression\'s centre from shipboard wind observation.' },
      { id: 'met02', front: 'Coriolis Effect', back: '**Deflection of moving air due to Earth\'s rotation.**\n\n• Deflects wind to the **RIGHT** in the Northern Hemisphere\n• Deflects wind to the **LEFT** in the Southern Hemisphere\n• Zero at equator, maximum at poles\n• Causes cyclonic (anticlockwise NH, clockwise SH) circulation around lows\n\nCauses prevailing wind systems and ocean current gyres.' },
      { id: 'met03', front: 'Tropical Revolving Storm (TRS)', back: '**Intense low-pressure system** forming over warm tropical seas (SST ≥26°C).\n\nNames by region:\n• **Hurricane** — North Atlantic, NE Pacific\n• **Typhoon** — NW Pacific\n• **Cyclone** — Bay of Bengal, Arabian Sea, SW Pacific, S Indian Ocean\n\nSeason: generally May–Nov (NH), Nov–May (SH)\n\nNot found <5° or >20° latitude (typically 8°–15°)' },
      { id: 'met04', front: 'TRS — Dangerous vs Safe Semicircle', back: '**Northern Hemisphere:**\n• **Dangerous (Right):** Wind blows ship into path; storm recurves toward you\n• **Navigable/Safe (Left):** Wind blows ship away from path\n\n**Southern Hemisphere:** (reversed — left = dangerous)\n\n**Rule of thumb (NH):** Face wind → centre is on your RIGHT\n\n**Action in dangerous semicircle:** Heave to on starboard tack, put wind on starboard bow (045°R), make best way.' },
      { id: 'met05', front: 'Warm Front', back: '**Leading edge of an advancing warm air mass.**\n\nSequence of cloud types as it approaches:\nCirrus → Cirrostratus → Altostratus → Nimbostratus (rain)\n\nCharacteristics:\n• **Gradual pressure fall**, long-period rain/drizzle\n• Wind backs (NH) and increases\n• Poor visibility in rain ahead of front\n• After passage: warmer, wind veers, pressure steadies\n• Slope ~1:150 (very gentle)' },
      { id: 'met06', front: 'Cold Front', back: '**Leading edge of an advancing cold air mass.**\n\nCharacteristics:\n• **Rapid pressure fall then sharp rise**\n• Heavy showers, squalls, thunderstorms\n• Wind **veers sharply** on passage (NH)\n• Rapid improvement after passage — good visibility\n• Steep slope ~1:50 (much steeper than warm front)\n• Cold fronts move faster than warm fronts → occlusion' },
      { id: 'met07', front: 'ITCZ — Intertropical Convergence Zone', back: '**Equatorial belt where NE and SE Trade Winds converge.**\n\n• Zone of low pressure, rising air, heavy convective rainfall\n• Position migrates N/S following the sun (~5°–10° each side of equator)\n• Variable, often calm winds (the Doldrums)\n• Associated with: squalls, thunderstorms, poor visibility\n• Recognised by towering cumulonimbus clouds' },
      { id: 'met08', front: 'Beaufort Scale — Key Levels', back: '**Force 0:** Calm, <1 kn, glassy sea\n**Force 4:** Moderate breeze, 11–16 kn, small waves\n**Force 6:** Strong breeze, 22–27 kn, large waves, spray\n**Force 7:** Near gale, 28–33 kn, sea heaps up\n**Force 8:** Gale, 34–40 kn, moderately high waves, foam\n**Force 10:** Storm, 48–55 kn, very high waves, sea white\n**Force 12:** Hurricane, ≥64 kn, exceptionally high waves, air filled with foam' },
      { id: 'met09', front: 'Sea Fog — Types', back: '**Advection fog:** Warm moist air moves over cold sea surface → sea cools air below dew point. Most common at sea. Persists in strong winds.\n\n**Radiation fog:** Night cooling of land radiates cold air seaward. Shallow, usually dissipates after sunrise. Common near coasts.\n\n**Arctic sea smoke (steam fog):** Cold air over warm water — water "steams". Common in polar regions.\n\n**Frontal fog:** Evaporation from warm rain into cold air ahead of warm front.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // STABILITY
  // ══════════════════════════════════════════════════════════════
  {
    id: 'stab-terms',
    subjectId: 'stab',
    name: 'Stability — Key Terms',
    icon: '⚖️',
    color: '#7B3F00',
    cards: [
      { id: 'st01', front: 'GM — Metacentric Height', back: '**GM = KM − KG**\n\n• **Positive GM:** Vessel is stable (G below M)\n• **Negative GM:** Vessel is unstable (G above M) → loll\n• **Large GM:** Stiff ship, short rolling period, uncomfortable\n• **Small GM:** Tender ship, slow rolling, more comfortable\n\nMinimum GM varies by vessel type — typically 0.15 m for general cargo.' },
      { id: 'st02', front: 'BM — Metacentric Radius', back: '**BM = I / V**\n\n• I = Second moment of waterplane area about centreline\n• V = Volume of displacement\n\nFor a box-shaped vessel: **BM = B² / 12d**\n\n• BM is a purely geometric property (shape, not loading)\n• BM decreases as vessel is loaded deeper (V increases)\n• GML = KML − KG (longitudinal metacentric height)' },
      { id: 'st03', front: 'GZ — Righting Lever', back: 'The **horizontal distance between G and the vertical through B** at any angle of heel.\n\n**GZ = GM × sin θ** (for small angles ≤15°)\n\n• GZ curve (statical stability curve) shows GZ at all angles\n• Max GZ: angle of maximum stability (~40°–60° for cargo ships)\n• GZ reaches zero = angle of vanishing stability\n• Area under GZ curve = dynamical stability' },
      { id: 'st04', front: 'Free Surface Effect (FSE)', back: '**Liquid free surfaces in slack tanks reduce effective GM.**\n\nFSM = l × b³ × ρ_liquid / 12 × V × ρ_SW\n\nor simply: **GG₁ = (l × b³ × ρ_L) / (12 × Δ)**\n\nKey points:\n• FSE depends on **TANK DIMENSIONS** (b³), not how full\n• Worst when tank is ~50% full\n• Subdivide tanks to reduce FSE\n• Press up or empty tanks to eliminate FSE\n• FSE is independent of ship size' },
      { id: 'st05', front: 'Angle of Loll', back: 'When **GM is negative**, the vessel is unstable upright and flops to one side to find equilibrium (where GZ becomes positive).\n\n**Characteristics:**\n• Vessel lists but returns to SAME side when pushed upright\n• Dangerous — small disturbance can cause capsize\n\n**Correction:** NEVER ballast high tanks first!\n1. Reduce G: add ballast to LOWEST tanks\n2. Pump out high weights\n3. Flood double bottom ballast tanks slowly' },
      { id: 'st06', front: 'TPC — Tonnes Per Centimetre', back: '**Mass required to change mean draft by 1 cm.**\n\n**TPC = Aw × ρ / 100**\n\n• Aw = waterplane area (m²)\n• ρ = water density (1.025 SW, 1.000 FW)\n\nTPC in salt water: TPC_SW = Aw / 97.56 (approx)\n\nChanges with draft as waterplane area changes — use hydrostatic tables for accuracy.' },
      { id: 'st07', front: 'FWA — Fresh Water Allowance', back: '**Change in mean draft when moving between salt water and fresh water.**\n\n**FWA = Δ / (4 × TPC × 1.025)** (in mm)\n\nor: FWA = Δ / (4 × TPC) (in cm, approximate)\n\n• Vessel rises in SW → sinks in FW by FWA amount\n• Dock Water Allowance (DWA) for intermediate densities:\n  **DWA = FWA × (1.025 − ρ_DW) / 0.025**' },
      { id: 'st08', front: 'MCTC — Moment to Change Trim 1 cm', back: '**MCTC = GML × Δ / (100 × L)**\n\nor from hydrostatics: **MCTC = (Aw × BML) × Δ / (100 × L)**\n\nUsed to calculate change of trim due to loading/discharging:\n\n**Change of trim = Trimming moment / MCTC**\n\n**Trimming moment = w × d** (where d = distance from LCF)\n\nChange at each perpendicular from change of trim using lever from F.' },
      { id: 'st09', front: 'Block Coefficient (Cb)', back: '**Cb = ∇ / (L × B × d)**\n\n∇ = underwater volume, L = LBP, B = breadth, d = draft\n\nTypical values:\n• Tankers/Bulk carriers: 0.80–0.85 (full form)\n• Container ships: 0.60–0.70\n• Fast passenger vessels: 0.50–0.60 (fine form)\n\nHigh Cb = more cargo capacity, slower; Low Cb = faster, less capacity.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // COLREGS / ROR
  // ══════════════════════════════════════════════════════════════
  {
    id: 'ror-rules',
    subjectId: 'nav',
    name: 'COLREGS — Key Rules',
    icon: '⚓',
    color: '#1B5E9A',
    cards: [
      { id: 'ror01', front: 'Rule 5 — Look-out', back: '**Every vessel shall at all times maintain a proper look-out by sight and hearing, as well as by all available means appropriate to prevailing circumstances and conditions.**\n\nIncludes: visual watch, radar, AIS, VHF, sound signals.\n\nLook-out is a CONTINUOUS duty — cannot be delegated to radar alone.' },
      { id: 'ror02', front: 'Rule 6 — Safe Speed', back: '**Every vessel shall proceed at all times at a safe speed.**\n\nFactors include:\n• Visibility\n• Traffic density\n• Manoeuvrability (stopping distance, turning)\n• State of wind, sea, current\n• Background lights (light pollution)\n• Radar limitations\n• Draft vs available water depth\n\nNo specific speed is defined — judgment based on circumstances.' },
      { id: 'ror03', front: 'Rule 7 — Risk of Collision', back: '**Risk of collision exists if Compass Bearing Does Not Appreciably Change (CBDNAC).**\n\n• Use radar plotting or systematic observation\n• Decreasing range + steady bearing = definite risk\n• Risk may exist even with large bearing change (large vessels, towing)\n• When in doubt — risk exists\n\nIf compass bearing changes but radar shows decreasing CPA → still risk.' },
      { id: 'ror04', front: 'Rule 8 — Action to Avoid Collision', back: 'Any action shall be:\n• **Positive, made in ample time**\n• **Large enough to be readily apparent** to the other vessel\n• Result in passing at a safe distance\n\nSeries of small alterations is PROHIBITED.\n\nReducing speed is always an option. In open water — altering course to starboard is preferred.\n\nCheck: will the action result in a safe situation?' },
      { id: 'ror05', front: 'Rule 9 — Narrow Channels', back: '**Keep to starboard side of narrow channel or fairway.**\n\n• Vessel <20 m or sailing vessel shall not impede vessels using the channel\n• Fishing vessels shall not impede vessels using the channel\n• No crossing if it impedes vessels in channel\n• Overtaking only with agreement (sound signals)\n• Bend signals: 1 prolonged blast; reply 1 prolonged blast\n• Anchor: avoid where it impedes traffic\n\nDeep draft vessels have priority in the channel itself.' },
      { id: 'ror06', front: 'Rule 13 — Overtaking', back: '**A vessel is overtaking if approaching from abaft the beam — more than 22.5° abaft the beam of the vessel ahead.**\n\n• Overtaking vessel is ALWAYS the give-way vessel\n• Stand-on vessel maintains course and speed\n• Overtaking vessel must keep clear **until finally past and clear**\n• When in doubt: assume you are overtaking → give way\n• Sound signals to pass: 2 short (port), 1 short (stbd); reply same + 1 long' },
      { id: 'ror07', front: 'Rule 14 — Head-on Situation', back: '**When two PDVs meet head-on (or nearly so), both alter course to STARBOARD to pass port-to-port.**\n\n• Both vessels are give-way to each other\n• Sound signal: 2 short blasts when altering to port (but rule says alter to STBD)\n• Head-on exists when: on reciprocal courses, OR bearing of other is nearly ahead, OR her mast/sidelights are seen nearly in line' },
      { id: 'ror08', front: 'Rule 15 — Crossing Situation', back: '**When two PDVs cross, the vessel which has the other on her starboard side shall give way** and avoid crossing ahead.\n\n• Stand-on vessel: maintains course and speed\n• Give-way vessel: shall take early and substantial action\n\nMemory: **Red on starboard → you\'re give-way** (you see her red sidelight = she\'s on your starboard side = you give way)' },
      { id: 'ror09', front: 'Rule 18 — Responsibilities Between Vessels', back: 'Hierarchy (highest priority = must be avoided):\n\n1. **NUC** — Not under command\n2. **RAM** — Restricted in ability to manoeuvre\n3. **CBD** — Constrained by draught (power vessels give way)\n4. **Fishing** — Engaged in fishing\n5. **Sailing** — Under sail only\n6. **Power-driven** — Normal vessel\n\nA sailing vessel must give way to NUC, RAM, CBD, and fishing vessels.' },
      { id: 'ror10', front: 'Rule 19 — Restricted Visibility', back: '**All vessels shall proceed at safe speed adapted to prevailing conditions of restricted visibility.**\n\n• PDV: not using radar only → STOP engines when hearing fog signal of another vessel apparently forward of beam\n• Using radar: if CPA too close → reduce speed to minimum, stop if necessary\n\n**CRITICAL:** Rules 11-18 do NOT apply in restricted visibility — Rule 19 applies.\n\nIn RV, no stand-on/give-way — each vessel takes independent action to avoid close-quarters.' },
    ],
  },

  {
    id: 'ror-shapes-signals',
    subjectId: 'nav',
    name: 'COLREGS — Shapes & Sound Signals',
    icon: '🔔',
    color: '#1B5E9A',
    cards: [
      { id: 'rs01', front: 'Day Shapes — NUC', back: '**2 black balls in a vertical line**\n\nNot Under Command — vessel unable to manoeuvre due to exceptional circumstances.\n\nWhen making way: also shows sidelights + sternlight\n(Rule 27(a))' },
      { id: 'rs02', front: 'Day Shapes — RAM', back: '**Ball − Diamond − Ball in a vertical line**\n\nRestricted in Ability to Manoeuvre (e.g., cable-laying, dredging, replenishment).\n\nDredger: also shows 2 diamonds (obstruction side) and 2 balls (clear side)\n(Rule 27(b))' },
      { id: 'rs03', front: 'Day Shapes — CBD', back: '**3 black balls in a vertical line (cylinder)**\n\nActually the shape is a **cylinder** (not 3 balls — that\'s a common exam trick).\n\nConstrained by Draught — power-driven vessel constrained by available depth.\n(Rule 28)' },
      { id: 'rs04', front: 'Day Shapes — Vessel at Anchor', back: '**1 black ball forward (where best seen)**\n\nVessel ≥100 m: also shows working lights to illuminate deck.\n\nVessel at anchor in or near a TSS — sounds anchor signal every minute:\n• <100 m: rapid bell forward 5s\n• ≥100 m: rapid bell fwd 5s + gong aft 5s\n(Rule 30)' },
      { id: 'rs05', front: 'Day Shapes — Vessel Aground', back: '**3 black balls in a vertical line** (same as anchor shape × 3)\n\nAlso sounds anchor fog signal + 3 separate distinct strokes before and after.\n(Rule 30(d))\n\nNote: CBD = **cylinder** day shape; Aground = **3 balls** — don\'t confuse!' },
      { id: 'rs06', front: 'Sound Signals — Manoeuvring (clear visibility)', back: '**1 short** — I am altering course to STARBOARD\n**2 short** — I am altering course to PORT\n**3 short** — My engines are going ASTERN\n**5 or more short** — Doubt / Warning signal\n**2 long + 1 short** — I intend to overtake on your STARBOARD\n**2 long + 2 short** — I intend to overtake on your PORT\n\n(Rule 34)' },
      { id: 'rs07', front: 'Fog Signals — Power-Driven Vessel', back: '**Making way:** 1 prolonged blast (4–6 s) every 2 minutes\n**Stopped, not making way:** 2 prolonged blasts (with 2 s interval) every 2 minutes\n\n**Sailing vessel / NUC / RAM / CBD / Fishing (underway):** 1 prolonged + 2 short every 2 min\n**At anchor:** Rapid ringing of bell 5 s, every 1 minute\n**Aground:** Rapid bell + 3 strokes before and after\n(Rule 35)' },
      { id: 'rs08', front: 'Bend Signal — Narrow Channel', back: '**1 prolonged blast** when approaching a bend or area where other vessels may be obscured.\n\nAny vessel hearing the signal shall reply:\n**1 prolonged blast** (acknowledgement).\n\nIf both vessels hear each other: proceed with caution.\n\n(Rule 34(e))' },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // CARGO
  // ══════════════════════════════════════════════════════════════
  {
    id: 'cargo-terms',
    subjectId: 'cargo',
    name: 'Cargo Operations',
    icon: '📦',
    color: '#5D4037',
    cards: [
      { id: 'cg01', front: 'Stowage Factor (SF)', back: '**Volume occupied by one tonne of cargo in cubic metres.**\n\n**SF = Volume (m³) / Mass (tonnes)**\n\n• Low SF (e.g., 0.5) → dense, heavy cargo (steel, ore)\n• High SF (e.g., 2.0+) → light, bulky cargo (cotton, wood)\n\nUsed to calculate cargo capacity:\n**Cargo = Available Hold Volume / Stowage Factor**\n\nCompare SF to broken stowage-adjusted hold capacity.' },
      { id: 'cg02', front: 'Broken Stowage', back: '**Lost space between cargo units** that cannot be used.\n\n• Irregular shapes: 10–25% broken stowage\n• Uniform boxes/bales: 5–10%\n• Bags: 5–15%\n\n**Effective volume = Hold volume × (1 − broken stowage %)**\n\nActual cargo = Effective volume / Stowage Factor' },
      { id: 'cg03', front: 'TML — Transportable Moisture Limit', back: '**Maximum moisture content of a cargo that is safe for carriage without risk of liquefaction.**\n\n• TML = 0.9 × FMP (Flow Moisture Point)\n• Cargo with moisture content > TML must NOT be loaded\n• Applies to: iron ore fines, coal, nickel ore, cement clinker, etc.\n\n**Can Test:** Fill can ½ full, strike 25 times. If free moisture appears → DO NOT LOAD.\n\n(IMSBC Code Group A cargo)' },
      { id: 'cg04', front: 'IMSBC Code — Cargo Groups', back: '**Group A:** May liquefy if shipped at moisture content exceeding TML\n(e.g., iron ore fines, coal, nickel ore)\n\n**Group B:** Possesses chemical hazard that could give rise to dangerous situations\n(e.g., coal — self-heating/toxic gas)\n\n**Group C:** Neither Group A nor B — no special hazard\n\n**Group A+B:** Has both properties' },
      { id: 'cg05', front: 'Cargo Sweat vs Ship Sweat', back: '**Cargo sweat:** Cargo surface temperature is BELOW dew point of air in hold → moisture condenses ON cargo.\nPrevent by: NOT ventilating when external dew point > cargo temperature.\n\n**Ship sweat:** Hold structure temperature is BELOW dew point of air in hold → moisture on ship\'s sides/deckhead drips onto cargo.\nPrevent by: Adequate ventilation to prevent moist air from reaching cold structure.\n\nRule: **Ventilate if outside dew point is lower than cargo temperature.**' },
      { id: 'cg06', front: 'Dangerous Goods — IMDG Code Classes', back: '**Class 1:** Explosives\n**Class 2:** Gases (2.1 Flammable, 2.2 Non-flammable, 2.3 Toxic)\n**Class 3:** Flammable liquids\n**Class 4:** Flammable solids / Spontaneously combustible / Dangerous when wet\n**Class 5:** Oxidising substances / Organic peroxides\n**Class 6:** Toxic / Infectious substances\n**Class 7:** Radioactive material\n**Class 8:** Corrosives\n**Class 9:** Miscellaneous dangerous substances' },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // BUSINESS & LAW
  // ══════════════════════════════════════════════════════════════
  {
    id: 'law-conventions',
    subjectId: 'law',
    name: 'Maritime Conventions',
    icon: '📋',
    color: '#854F0B',
    cards: [
      { id: 'lw01', front: 'SOLAS — Main Chapters', back: '**Safety of Life at Sea Convention**\n\nKey Chapters:\n• **Ch. II-1:** Construction, watertight integrity, stability\n• **Ch. II-2:** Fire protection, detection, extinction\n• **Ch. III:** LSA — lifeboats, liferafts, EPIRBs, SARTs\n• **Ch. IV:** Radiocommunications (GMDSS)\n• **Ch. V:** Safety of Navigation (includes AIS, VDR, passage planning)\n• **Ch. VI:** Carriage of cargoes\n• **Ch. XI-2:** ISPS Code — port/ship security' },
      { id: 'lw02', front: 'ISM Code — Key Requirements', back: '**International Safety Management Code (SOLAS Ch. IX)**\n\n• Company must have **Safety Management System (SMS)**\n• **Designated Person Ashore (DPA):** Direct link between management and ship, access to highest level of management\n• Ship must have **Safety Management Certificate (SMC)**\n• Company must have **Document of Compliance (DOC)**\n• Regular drills, internal audits, incident reporting\n• Non-conformity reporting encouraged (just culture)' },
      { id: 'lw03', front: 'MARPOL — Annexes', back: '**International Convention for Prevention of Pollution from Ships**\n\n• **Annex I:** Oil (discharge limits, ORB, OWS)\n• **Annex II:** Noxious liquid substances in bulk (NLS)\n• **Annex III:** Harmful substances in packaged form\n• **Annex IV:** Sewage (holding tanks, treatment plant)\n• **Annex V:** Garbage (Garbage Management Plan, GRB)\n• **Annex VI:** Air pollution (SOx, NOx, ODS, SEEMP, EEDI)' },
      { id: 'lw04', front: 'STCW — Watch Competence Requirements', back: '**Standards of Training, Certification and Watchkeeping**\n\nFor 2nd Mate CoC (Officer in Charge of Navigational Watch):\n• Certificate of Competency: Function 1 (Navigation at management level)\n• ARPA / ECDIS proficiency\n• Medical fitness (ENG1)\n• GMDSS GOC or ROC\n• Basic Safety Training (BST): FPFF, EFA, PST, PSSR\n• Advanced Fire Fighting (AFF)\n• Medical First Aid (MFA)\n• Sea service: 12 months (post OOW) for management level' },
      { id: 'lw05', front: 'ISPS Code — Ship Security Levels', back: '**International Ship and Port Facility Security Code**\n\n**Level 1 (Normal):** Minimum security measures always maintained\n**Level 2 (Heightened):** Additional measures due to increased risk\n**Level 3 (Exceptional):** Specific action when probable or imminent incident — may restrict port access\n\nSSO — Ship Security Officer (usually Master or Chief Officer)\nCSO — Company Security Officer\nPFSO — Port Facility Security Officer\n\nSSP — Ship Security Plan (confidential, approved by flag state)' },
      { id: 'lw06', front: 'MLC 2006 — Maritime Labour Convention', back: '**"Seafarers\' Bill of Rights"** — minimum standards for working conditions.\n\nKey provisions:\n• **Work hours:** Max 14 h/day, 72 h/week\n• **Rest hours:** Min 10 h/day, 77 h/week; min 6 h uninterrupted\n• **MLC Certificate** issued by flag state\n• **DMLC I & II:** Declaration of Maritime Labour Compliance\n• Covers: accommodation, food, health care, social security, repatriation, wages\n• Enforced by port state control inspections' },
    ],
  },

];
