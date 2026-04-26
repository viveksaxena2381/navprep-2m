// ─── Topic Enrichment Data ────────────────────────────────────────────────────
// Real-world images and document mockups linked to theory topics.
// Images sourced from Wikimedia Commons (public domain / CC licensed).
// onError handlers in the rendering components silently hide any broken URLs.

const WC = (filename) => `https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;

// ─── Topic Images ─────────────────────────────────────────────────────────────
// Each entry: { url, caption, credit }
export const TOPIC_ENRICHMENTS = {

  // ── NAVIGATION ──────────────────────────────────────────────────────────────

  "t-nav-1-1": {
    funFact: "Gerardus Mercator published his famous nautical chart in 1569 — 57 years before the first telescope was used at sea!",
    images: [
      { url: WC("Mercator_projection_SW.jpg"), caption: "Mercator projection — landmasses near the poles appear greatly exaggerated (Greenland looks as large as Africa)", credit: "Wikimedia Commons" },
      { url: WC("Rhumb_line_vs_great_circle.svg"), caption: "Rhumb line (straight on Mercator) vs Great Circle (curved on Mercator, but shortest actual distance)", credit: "Wikimedia Commons" },
      { url: WC("Nautical_chart.jpg"), caption: "A typical nautical chart showing depth soundings, buoyage, and coastal features", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-1-10": {
    funFact: "A skilled navigator can measure a horizontal sextant angle to within 0.1 minutes of arc — about 180 metres accuracy at 10 miles from the shore!",
    images: [
      { url: WC("Sextant_2.jpg"), caption: "Marine sextant — arc, index mirror, horizon glass, and telescope assembly", credit: "Wikimedia Commons" },
      { url: WC("Sextant_telescope.jpg"), caption: "Telescope and shading filters (index shades) on a modern marine sextant", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-1-11": {
    funFact: "The IALA buoyage system divides the world into two regions: Region A (red to port — used in Europe, Africa, Asia and Australasia) and Region B (red to starboard — used in the Americas, Japan, Korea and Philippines). Confusing the two regions in a harbour entrance has caused groundings!",
    images: [
      { url: WC("IALA_Maritime_Buoyage_System_Regions.svg"), caption: "IALA Maritime Buoyage System — Region A (red to port) covers Europe, Africa, Asia and Australasia; Region B (green to port) covers the Americas, Japan, Korea and Philippines. Critical to know which region you are in!", credit: "Wikimedia Commons" },
      { url: WC("Lateral_system_a_mark.svg"), caption: "IALA Region A lateral marks — port-hand mark (red can/cylinder, red light) left to port when entering harbour; starboard-hand mark (green conical, green light) kept to starboard. Region B is the opposite!", credit: "Wikimedia Commons" },
      { url: WC("Cardinal_mark_diagram.svg"), caption: "Cardinal marks — North (two points up), South (two points down), East (points apart — egg shape), West (points together — waist shape). Black and yellow, quick or very quick flashing white light. Pass on the named side!", credit: "Wikimedia Commons" },
      { url: WC("Cardinal_Marks.gif"), caption: "Cardinal mark buoys in context — placed around a hazard to indicate the safe water lies to the North, South, East or West of the mark. Memorise the topmark and light rhythm combinations!", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-2-1": {
    funFact: "Sailors have used celestial navigation for over 5,000 years. The Vikings navigated across the Atlantic using the North Star and a simple sun-shadow board — no sextant needed!",
    images: [
      { url: WC("Sextant_2.jpg"), caption: "Marine sextant — primary instrument for celestial observations at sea", credit: "Wikimedia Commons" },
      { url: WC("Celestial_sphere.png"), caption: "The celestial sphere showing the relationship between the observer, zenith (Z), pole (P) and celestial body (X) — the PZX triangle", credit: "Wikimedia Commons" },
      { url: WC("Nautical_Almanac.jpg"), caption: "Nautical Almanac — published annually by HM Nautical Almanac Office; provides tabulated data for all celestial bodies", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-2-4": {
    funFact: "The Marc St. Hilaire intercept method was published in 1875 and revolutionised celestial navigation — for the first time, a sight could be reduced to a simple plotted line rather than tedious trigonometric tables.",
    images: [
      { url: WC("Sextant_2.jpg"), caption: "Taking a sun sight with a marine sextant — intercept method requires an accurate time, a sextant altitude, and an assumed position", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-3-1": {
    funFact: "A ship's magnetic compass was so valuable in the Age of Sail that stealing the compass needle was punishable by death in some navies!",
    images: [
      { url: WC("Compass_aligned_north.jpg"), caption: "Marine magnetic compass — the card is suspended in liquid to dampen oscillation", credit: "Wikimedia Commons" },
      { url: WC("Dry_compass_design.jpg"), caption: "Cutaway diagram showing compass card, pivot, and bowl construction", credit: "Wikimedia Commons" },
      { url: WC("Compass_card.jpg"), caption: "Traditional compass card — divided into 32 points and 360°", credit: "Wikimedia Commons" },
      { url: WC("Magnetic_declination.svg"), caption: "Magnetic declination (variation) — the angle between True North and Magnetic North varies by location and changes year by year. Isogonic lines connect places of equal variation. Apply variation with the mnemonic: Variation West — Magnetic Best; Variation East — Magnetic Least", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-3-3": {
    funFact: "The gyrocompass was invented by Hermann Anschütz-Kaempfe in 1908. The first ship to use one was SMS Deutschland in 1910. Today virtually every large ship uses one as the primary compass.",
    images: [
      { url: WC("Gyrocompass.jpg"), caption: "Anschütz-type gyrocompass — the spinning gyroscope seeks true north via gyroscopic precession", credit: "Wikimedia Commons" },
      { url: WC("Gyrocompass_repeater.jpg"), caption: "Gyrocompass repeater — shows heading in the wheelhouse and at remote stations", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-4-1": {
    funFact: "The highest tidal range in the world is in the Bay of Fundy, Canada — where tides rise and fall up to 16.3 metres. On the Indian coast, the Gulf of Khambhat (Cambay) has tides over 11 metres — affecting navigation significantly in this busy shipping route.",
    images: [
      { url: WC("Bay_of_Fundy_Low_Tide.jpg"), caption: "Bay of Fundy at low tide — ships run aground intentionally to load or discharge cargo!", credit: "Wikimedia Commons" },
      { url: WC("Tidal_range_diagram.svg"), caption: "Tidal terms: MHWS, MHWN, MSL, MLWN, MLWS and Chart Datum (LAT) — used in tide table calculations", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-5-1": {
    funFact: "SOLAS Chapter V passage planning rules apply to ALL ships on ALL voyages — even a fisherman crossing a harbour must legally plan his passage since 2002!",
    images: [
      { url: WC("Admiralty_chart.jpg"), caption: "A corrected Admiralty chart being used for passage planning — all dangers, TSS, and waypoints marked", credit: "Wikimedia Commons" },
    ],
    doc: "passage_plan",
  },

  "t-nav-5-2": {
    funFact: "COLREGS (International Regulations for Preventing Collisions at Sea) were adopted in 1972 and came into force on 15 July 1977. There are 38 Rules in 5 Parts (A–E) plus 4 Annexes. Rule 2 is vital: 'Nothing in these Rules shall exonerate any vessel from the consequences of neglect of any precaution which may be required by the ordinary practice of seamen.' Common sense always applies!",
    images: [
      { url: WC("IALA_Maritime_Buoyage_System_Regions.svg"), caption: "IALA buoyage — vessels must know both Region A and Region B systems to navigate safely in all parts of the world. COLREGS Rule 1(c) applies internationally in all waters beyond the baselines", credit: "Wikimedia Commons" },
      { url: WC("VTG.svg"), caption: "Traffic Separation Scheme (TSS) — vessels in a TSS must proceed in the appropriate traffic lane (Rule 10), follow the general direction of traffic, and cross at right angles if they must cross. Sailing vessels, vessels fishing and vessels less than 20m must not impede safe passage of power-driven vessels following the lane", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-6-1": {
    funFact: "ARPA was mandated on large ships after the Torrey Canyon oil spill in 1967. The 118,000-tonne supertanker stranded because the officer didn't detect a collision course in time — with only basic radar and no ARPA.",
    images: [
      { url: WC("Radar_screen_ship.jpg"), caption: "Typical ship radar display showing echoes, range rings, and ARPA target vectors", credit: "Wikimedia Commons" },
      { url: WC("Radar_screen.svg"), caption: "Radar PPI (Plan Position Indicator) — concentric range rings, heading marker, and target echoes. The ship's own position is at the centre. Range rings are typically 0.25, 0.5, 1, 2, 3, 6, 12, 24 NM", credit: "Wikimedia Commons" },
      { url: WC("SART_radar_trace.svg"), caption: "SART (Search and Rescue Transponder) radar response — a SART activates when it detects an X-band (9 GHz) radar signal and responds with 12 dots in a line extending from the SART position. Range: 10 NM ship-to-ship, 30 NM from aircraft", credit: "Wikimedia Commons" },
      { url: WC("Principle_of_SBES.svg"), caption: "Echo sounder (Single Beam Echo Sounder) principle — a transducer transmits a sound pulse, which reflects off the seabed and returns. Water depth = (speed of sound × time) ÷ 2. Assumes sound speed 1500 m/s in standard seawater", credit: "Wikimedia Commons" },
      { url: WC("Furuno_radar.jpg"), caption: "Furuno navigational radar — one of the most common on merchant ships worldwide", credit: "Wikimedia Commons" },
      { url: WC("Radar_antenna_ship.jpg"), caption: "Rotating radar antenna (scanner) mounted on the mast of a merchant vessel", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-6-2": {
    funFact: "ECDIS became mandatory for large passenger ships in 2012. An ECDIS database contains over 15,000 electronic nautical charts (ENCs) published by hydrographic offices worldwide.",
    images: [
      { url: WC("ECDIS_display.jpg"), caption: "ECDIS display showing the electronic chart with ship's position, route, and safety contours highlighted", credit: "Wikimedia Commons" },
      { url: WC("ECDIS_Kelvin_Hughes.jpg"), caption: "Kelvin Hughes SharpEye ECDIS installation on the bridge of a merchant ship", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-6-3": {
    funFact: "AIS was originally designed as a collision-avoidance tool. But it's now so widely used for tracking that there are websites showing the real-time positions of over 200,000 ships — free for anyone to view!",
    images: [
      { url: WC("GPS_Spheres.svg"), caption: "GPS trilateration principle — a receiver needs signals from at least 4 satellites to calculate 3D position (latitude, longitude, altitude). Each satellite transmits its position and precise time; the receiver calculates the distance to each satellite from the signal travel time", credit: "Wikimedia Commons" },
      { url: WC("GMDSS_Sea_Areas.jpg"), caption: "GMDSS Sea Areas — A1 (VHF DSC coverage, ≤25–30 NM), A2 (MF DSC, ≤150–400 NM), A3 (INMARSAT satellite coverage, between 70°N and 70°S), A4 (polar regions beyond A3). Ships carry equipment matched to their area of operation", credit: "Wikimedia Commons" },
      { url: WC("Navtex.jpg"), caption: "NAVTEX receiver — automatic system for receiving maritime safety information (MSI) on 518 kHz (English) and 490 kHz (local language). Covers approximately 400 NM from the transmitting station", credit: "Wikimedia Commons" },
      { url: WC("GPS_receiver_ship.jpg"), caption: "Shipborne GPS receiver — provides position accurate to ±5 metres", credit: "Wikimedia Commons" },
      { url: WC("AIS_transponder.jpg"), caption: "AIS Class A transponder — mandatory on ships above 300 GT on international voyages", credit: "Wikimedia Commons" },
      { url: WC("MarineTraffic_screenshot.png"), caption: "AIS vessel tracking — all vessels appear on real-time charts visible to anyone worldwide", credit: "MarineTraffic / Wikimedia Commons" },
    ],
  },

  "t-nav-7-3": {
    funFact: "GMDSS (Global Maritime Distress and Safety System) replaced the Morse code distress system on 1 February 1999. The new system uses DSC (Digital Selective Calling) to automatically transmit a vessel's identity, position and nature of distress at the push of a single button — far faster and more reliable than morse code!",
    images: [
      { url: WC("GMDSS_Sea_Areas.jpg"), caption: "GMDSS Sea Areas A1–A4 — the four sea areas define what radio equipment a ship must carry. Most international trading vessels operate in A1+A2+A3 and must carry VHF DSC, MF DSC, and an INMARSAT terminal or MF/HF radio", credit: "Wikimedia Commons" },
      { url: WC("Navtex.jpg"), caption: "NAVTEX receiver — automatic reception of Maritime Safety Information (MSI) including weather warnings, navigational warnings, and SAR information. Range ≈ 400 NM on 518 kHz (international English broadcasts)", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-8-1": {
    funFact: "Rule 10 (Traffic Separation Schemes) is one of the most frequently tested rules in DG Shipping oral examinations. Remember: vessels using the inshore traffic zone are not 'breaking' the TSS rules — Rule 10(d) specifically permits this for vessels under 20m, sailing vessels, and vessels fishing. A vessel crossing a TSS should cross on a heading as nearly as practicable at right angles to the general direction of traffic flow.",
    images: [
      { url: WC("VTG.svg"), caption: "Traffic Separation Scheme (TSS) — vessels must use the appropriate lane in the general direction of traffic flow, keep clear of the separation zone, and cross at right angles to the lane direction (Rule 10). Failure to comply is a criminal offence in most flag states", credit: "Wikimedia Commons" },
      { url: WC("IALA_Maritime_Buoyage_System_Regions.svg"), caption: "IALA buoyage within TSS approaches — lateral marks guide vessels into and out of traffic lanes. Knowing the local IALA region is essential for correct interpretation of port and starboard marks", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-8-2": {
    funFact: "Rule 16 (the give-way vessel) says take 'early and substantial action' — NOT a small token alteration. The UK MCA has stated that a 30° course alteration to starboard is generally the minimum to be clearly visible on another vessel's radar. Smaller alterations may be invisible on the stand-on vessel's display and fail to demonstrate your intentions!",
    images: [
      { url: WC("Propmec50.PNG"), caption: "Power-driven vessel lights — masthead light (white, 225° arc), sidelights (red port, green starboard, 112.5° each), and sternlight (white, 135°). A second masthead light is required on vessels ≥50m. Head-on (Rule 14): both masthead lights and both sidelights visible — both vessels alter to starboard", credit: "Wikimedia Commons" },
      { url: WC("TrawlingFishingBoat.PNG"), caption: "Vessel engaged in trawling — two all-round lights (green over white) plus sidelights and sternlight when making way. Green-over-white = 'Go fishing here!' Rule 18 gives trawlers priority over power-driven vessels, sailing vessels, and vessels not under command", credit: "Wikimedia Commons" },
      { url: WC("FishinOtherThanTrawling.PNG"), caption: "Fishing vessel not trawling — two all-round lights (red over white). When gear extends more than 150m horizontally: additional all-round white light in the direction of the gear. Rule 18: power-driven vessels keep out of the way of vessels fishing", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-8-3": {
    funFact: "Rule 19 applies whenever vessels are NOT in sight of one another in or near restricted visibility — not only when IN fog. A vessel detecting another vessel by radar alone must take avoiding action in ample time if risk of collision exists, and must avoid altering course to port for a vessel forward of the beam (except when overtaking). In doubt — STOP the engines!",
    images: [
      { url: WC("Radar_screen.svg"), caption: "Ship's radar PPI display — in restricted visibility (Rule 19), radar plotting or equivalent systematic observation is required to determine if risk of collision exists before any avoiding action. Never alter course to port for a vessel forward of the beam!", credit: "Wikimedia Commons" },
      { url: WC("SART_radar_trace.svg"), caption: "SART radar response — in restricted visibility, a SART signal (12 dots in a line) on the radar identifies a vessel or survival craft in distress. Steer towards the first dot; the SART position is at the end of the line furthest from the radar centre", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-8-4": {
    funFact: "COLREGS Rule 23 requires power-driven vessels to show a masthead light visible for 6 miles — the light must be at least 2.5 metres above the sidelights. This simple rule has prevented countless collisions on dark nights at sea.",
    images: [
      { url: WC("Ship_positionLights.svg"), caption: "Navigation lights on a power-driven vessel — masthead light (white, 225°, forward), second masthead light (white, 225°, aft and higher), port sidelight (red, 112.5°), starboard sidelight (green, 112.5°), and sternlight (white, 135°). Together they allow you to determine aspect and crossing situation", credit: "Wikimedia Commons" },
      { url: WC("VisibilityArc.svg"), caption: "Arcs of visibility for navigation lights — the combined light arcs allow an observer to determine whether a vessel is approaching head-on, crossing from port or starboard, or overtaking. Memorise: port red 112.5° + starboard green 112.5° + stern white 135° + masthead white 225°", credit: "Wikimedia Commons" },
      { url: WC("TrawlingFishingBoat.PNG"), caption: "Trawler lights — green over white all-round lights plus sidelights and stern. COLREGS Annex I specifies exact vertical separation between lights. The green-over-white combination is unique to trawlers and cannot be confused with any other vessel type", credit: "Wikimedia Commons" },
      { url: WC("FishinOtherThanTrawling.PNG"), caption: "Fishing vessel (not trawling) lights — red over white all-round lights. Gear direction shown by white light if gear extends > 150m. Rule 26 gives complete details of all fishing vessel light and shape requirements", credit: "Wikimedia Commons" },
      { url: WC("AMarcasDiurnas.PNG"), caption: "Day shapes — used instead of lights during daylight hours: Ball (vessel at anchor ≥7m), two Balls vertical (vessel aground), cone apex down (vessel under sail and power), diamond (vessel constrained by her draught), cylinder (vessel fishing), ball-diamond-ball (vessel restricted in ability to manoeuvre)", credit: "Wikimedia Commons" },
      { url: WC("Ship_running_lights.jpg"), caption: "Running lights on a merchant ship — masthead (white), port (red), starboard (green), and stern (white) lights for identifying vessel type and aspect", credit: "Wikimedia Commons" },
      { url: WC("Navigation_light_diagram.svg"), caption: "Arc of visibility for navigation lights — port light 112.5°, starboard 112.5°, stern 135°, masthead 225°", credit: "Wikimedia Commons" },
    ],
  },

  "t-nav-8-5": {
    funFact: "Rule 34 sound signals: one short blast (●) = altering to starboard; two short blasts (●●) = altering to port; three short blasts (●●●) = going astern. Mnemonic: 'One Right, Two Left, Three Back'. The doubt/danger signal (5 short rapid blasts) is the most important signal of all — never hesitate to use it when in doubt!",
    images: [
      { url: WC("AMarcasDiurnas.PNG"), caption: "Day shapes (Rule 30 and others) — used in conjunction with sound signals: a vessel at anchor sounds one short and one long blast every minute in restricted visibility (Rule 35d), and the anchor ball is displayed by day. Shapes and signals work together to identify vessel status and intentions", credit: "Wikimedia Commons" },
    ],
  },

  // ── METEOROLOGY ─────────────────────────────────────────────────────────────

  "t-met-1-1": {
    funFact: "Tropical revolving storms rotate anticlockwise in the Northern Hemisphere and clockwise in the Southern Hemisphere due to the Coriolis effect — a result of the Earth's rotation. A typhoon and a hurricane are the same phenomenon, just named differently by region!",
    images: [
      { url: WC("Hurricane_Isabel_from_ISS.jpg"), caption: "Tropical cyclone (Hurricane Isabel) viewed from the International Space Station — spiral cloud bands, eye wall, and calm eye are clearly visible", credit: "NASA / Wikimedia Commons" },
      { url: WC("Cyclone_Catarina_from_ISS003-E-7720.jpg"), caption: "Tropical cyclone from space — the cloud-free eye at the centre indicates a well-developed storm with intense convection around the eye wall", credit: "NASA / Wikimedia Commons" },
    ],
  },

  "t-met-2-1": {
    funFact: "The Trade Winds are so reliable that for centuries they were the engine of global commerce. Columbus used the NE Trades to sail to the Americas in 1492, and the return voyage used the SW Anti-Trades — a circular sailing route that became the standard for centuries.",
    images: [
      { url: WC("AtmosphCirc2.svg"), caption: "Global atmospheric circulation — Hadley, Ferrel and Polar cells; Trade Winds, Westerlies, and Polar Easterlies", credit: "Wikimedia Commons" },
      { url: WC("Wind_map.jpg"), caption: "Global wind patterns — the foundation of pilot charts, routing decisions and understanding weather systems at sea", credit: "Wikimedia Commons" },
    ],
  },

  "t-met-3-1": {
    funFact: "There are 10 main cloud genera, divided into 4 altitude groups. The tallest clouds — Cumulonimbus — can extend from 300 metres above the sea surface all the way to 16 km into the stratosphere, taller than Mount Everest twice over!",
    images: [
      { url: WC("Cloud_types_en.svg"), caption: "The international cloud classification: High (Ci, Cs, Cc), Middle (As, Ac, Ns), Low (St, Sc), and Vertical (Cu, Cb)", credit: "Wikimedia Commons" },
      { url: WC("Cumulonimbus_cloud_over_Africa.jpg"), caption: "Cumulonimbus — the 'King of Clouds', associated with violent squalls, heavy rain, hail, lightning, and waterspouts at sea", credit: "Wikimedia Commons" },
      { url: WC("Cirrus_clouds.jpg"), caption: "Cirrus clouds — high-altitude ice crystals; their appearance often heralds the approach of a warm front within 24–48 hours", credit: "Wikimedia Commons" },
    ],
  },

  "t-met-4-1": {
    funFact: "The Newfoundland Grand Banks have some of the world's most famous weather because cold Labrador Current water meets warm Gulf Stream water — creating the ideal conditions for dense sea fog and powerful frontal systems. The Titanic sank in these waters.",
    images: [
      { url: WC("Idealized_frontal_surface.svg"), caption: "Cross-section of a warm front — gradual lifting of warm air over cold air produces cirriform clouds giving way to stratus and rain", credit: "Wikimedia Commons" },
      { url: WC("Cold_front_weather.svg"), caption: "Cold front passage — rapid replacement of warm air produces cumuliform clouds, heavy showers, and sudden wind veer", credit: "Wikimedia Commons" },
    ],
  },

  "t-met-5-1": {
    funFact: "Weather forecasters use isobars drawn every 4 hPa to show pressure patterns. When isobars are closely spaced (steep pressure gradient), winds are strong. The ship's barometer falling more than 3 hPa in 3 hours is a storm warning!",
    images: [
      { url: WC("Synoptic_chart.png"), caption: "Synoptic weather chart — isobars, fronts, highs (H) and lows (L) showing the weather pattern over the North Atlantic", credit: "Met Office / Wikimedia Commons" },
    ],
  },

  "t-met-8-1": {
    funFact: "The lowest barometric pressure ever recorded at sea level was 870 hPa inside Typhoon Tip in 1979 — the most intense tropical cyclone ever measured!",
    images: [
      { url: WC("Aneroid_barometer.jpg"), caption: "Aneroid barometer — no liquid, uses a sealed metal capsule that expands and contracts with pressure changes", credit: "Wikimedia Commons" },
      { url: WC("Barograph.jpg"), caption: "Barograph — a barometer with a chart recorder that traces pressure history over days or weeks", credit: "Wikimedia Commons" },
      { url: WC("Mercury_barometer.jpg"), caption: "Mercury barometer — the original Torricelli design from 1643; still the standard for calibration", credit: "Wikimedia Commons" },
    ],
  },

  "t-met-8-2": {
    funFact: "The dry and wet bulb thermometer (psychrometer) was invented in 1820 by Ernst Ferdinand August. It's still the most accurate way to measure humidity on ships today.",
    images: [
      { url: WC("Psychrometer.jpg"), caption: "Stevenson Screen psychrometer — two thermometers, one with a wet wick muslin sleeve. The difference in readings gives dew point and relative humidity", credit: "Wikimedia Commons" },
      { url: WC("Stevenson_screen.jpg"), caption: "Stevenson Screen housing the meteorological instruments on a ship's bridge wing", credit: "Wikimedia Commons" },
    ],
  },

  "t-met-8-3": {
    funFact: "The Beaufort Scale was invented by Admiral Sir Francis Beaufort in 1806. He described it in terms of the canvas a 'well-conditioned man-of-war' could carry — not in wind speed at all! Wind speed equivalents were only added in 1912.",
    images: [
      { url: WC("Cup-anemometer.jpg"), caption: "Cup anemometer — three rotating cups measure wind speed; arrow vane gives direction", credit: "Wikimedia Commons" },
      { url: WC("Beaufort_scale_en.svg"), caption: "Beaufort Wind Scale — from Force 0 (Calm) to Force 12 (Hurricane) with sea state descriptions", credit: "Wikimedia Commons" },
    ],
  },

  // ── CARGO ───────────────────────────────────────────────────────────────────

  "t-cargo-1-1": {
    funFact: "Modern container ships carry up to 24,000 TEU (twenty-foot equivalent units). If you laid those containers end to end, they would stretch for 273 kilometres!",
    images: [
      { url: WC("Cargo_lashing.jpg"), caption: "Cargo lashing — twist locks, turnbuckles, and lashing bars secure containers to the cell guides", credit: "Wikimedia Commons" },
      { url: WC("Breakbulk_cargo.jpg"), caption: "Conventional general cargo — bagged goods, drums and crates stowed in a cargo hold", credit: "Wikimedia Commons" },
    ],
  },

  "t-cargo-1-2": {
    funFact: "The temperature at which moisture condenses is called the dew point. If the dew point of the air in the cargo hold is higher than the surface temperature of the cargo, condensation ('ship's sweat' or 'cargo sweat') will form — potentially damaging hygroscopic goods like grain, cotton, and paper.",
    images: [
      { url: WC("Cargo_hold_ventilation.jpg"), caption: "Cargo hold ventilation cowls — used for surface ventilation in dry weather to prevent ship's sweat", credit: "Wikimedia Commons" },
    ],
  },

  "t-cargo-2-1": {
    funFact: "The world's first purpose-built container ship was SS Ideal-X, which sailed on 26 April 1956 carrying 58 containers — the equivalent of about half a single row on today's ultra-large container ships.",
    images: [
      { url: WC("Container_ship_Cosco.jpg"), caption: "COSCO container ship — ultra-large container vessel (ULCV) carrying over 20,000 TEU", credit: "Wikimedia Commons" },
      { url: WC("ISO_container_types.jpg"), caption: "ISO container types — standard dry, open-top, flat rack, refrigerated (reefer), and tank containers", credit: "Wikimedia Commons" },
      { url: WC("Container_stack_ship.jpg"), caption: "Containers stacked on deck — secured by twist locks, lashing rods, and bridge fittings", credit: "Wikimedia Commons" },
    ],
    doc: "bill_of_lading",
  },

  "t-cargo-3-1": {
    funFact: "The IMDG Code currently lists over 3,000 individual substances with dangerous goods entries. A single wrong placard can result in a ship being detained by port state control!",
    images: [
      { url: WC("IMDG_class_1.svg"), caption: "IMDG Class 1 — Explosives: six divisions from mass explosion hazard (1.1) to very insensitive articles (1.6). Orange/black placard with bomb symbol. Segregated from all other classes and from each other in complex compatibility groups", credit: "Wikimedia Commons" },
      { url: WC("UN_dangerous_goods_pictograms.svg"), caption: "All 9 IMDG hazard class labels and their subdivisions — Class 1 Explosives, Class 2 Gases, Class 3 Flammable Liquids, Class 4 Flammable Solids, Class 5 Oxidizers, Class 6 Toxic, Class 7 Radioactive, Class 8 Corrosive, Class 9 Miscellaneous", credit: "Wikimedia Commons" },
      { url: WC("Dangerous_goods_vehicle_placard.jpg"), caption: "Orange placard and diamond labels on a road vehicle — the same placard system is used on road, rail, and sea transport under the IMDG Code and ADR agreement", credit: "Wikimedia Commons" },
    ],
    doc: "dangerous_goods_manifest",
  },

  "t-cargo-3-2": {
    funFact: "IMDG Class 3 (Flammable Liquids) is the most commonly shipped dangerous good by volume globally — covering everything from petrol (UN1203) to acetone, paints and varnishes. The flash point of 60°C is the defining boundary between Class 3 and non-classified flammable liquids.",
    images: [
      { url: WC("Imdg_class_2_1.svg"), caption: "Class 2.1 — Flammable Gas (LPG, acetylene, hydrogen): red flame on white/red background. Must be segregated from Class 3 flammable liquids and Class 5.1 oxidizers. Examples: propane (UN1978), LPG (UN1075)", credit: "Wikimedia Commons" },
      { url: WC("Imdg_class_3.svg"), caption: "Class 3 — Flammable Liquids: red flame on red background. Flash point < 60°C. Examples: gasoline/petrol (UN1203, PG II), ethanol (UN1170), acetone (UN1090). Most common DG class by volume of shipment worldwide", credit: "Wikimedia Commons" },
      { url: WC("Imdg_class_4_1.svg"), caption: "Class 4.1 — Flammable Solids: vertical red and white stripes with black flame. Examples: matches (UN1944), nitrocellulose (UN2557), metal powders. May ignite through friction or heat; stored away from ignition sources", credit: "Wikimedia Commons" },
      { url: WC("Imdg_class_5_1.svg"), caption: "Class 5.1 — Oxidizing Substances: yellow background with black flame-over-circle symbol. Accelerate combustion of other materials. Examples: ammonium nitrate (UN1942), hydrogen peroxide (UN2014). Must be kept away from Class 3 and 4", credit: "Wikimedia Commons" },
      { url: WC("Imdg_class_6_1.svg"), caption: "Class 6.1 — Toxic Substances: white background with black skull-and-crossbones. Examples: pesticides, lead compounds, cyanides. Require special stowage under deck; spillage can be fatal to crew and must be reported under MARPOL", credit: "Wikimedia Commons" },
      { url: WC("Imdg_class_8.svg"), caption: "Class 8 — Corrosive Substances: black-and-white test tubes dripping onto hand and surface. Examples: sulphuric acid (UN1830), sodium hydroxide (UN1823), batteries. Can destroy living tissue and corrode metals — critical segregation from Classes 3, 4 and 6", credit: "Wikimedia Commons" },
    ],
    doc: "dangerous_goods_manifest",
  },

  "t-cargo-4-1": {
    funFact: "Over a dozen vessels have been lost due to cargo liquefaction in recent decades. Iron ore fines and nickel ore are among the most dangerous — they can turn from solid to liquid in minutes during heavy rolling, causing a ship to capsize with no warning.",
    images: [
      { url: WC("Bulk_carrier_ship.jpg"), caption: "Bulk carrier loading iron ore — the cargo must be tested for moisture content (TML) before loading to prevent liquefaction", credit: "Wikimedia Commons" },
      { url: WC("Can_test_liquefaction.jpg"), caption: "Can test for liquefaction potential — impacting a sealed can of cargo sample with a hammer. Moisture on the rim indicates dangerous moisture content", credit: "Wikimedia Commons" },
    ],
  },

  "t-cargo-5-1": {
    funFact: "The world's largest oil tanker ever built was TI Europe (formerly Jahre Viking), with a deadweight of 564,763 tonnes — she was so large she could not enter the English Channel or pass through the Suez or Panama Canals!",
    images: [
      { url: WC("Oil_tanker_ship.jpg"), caption: "VLCC (Very Large Crude Carrier) at sea — capacity 200,000–320,000 DWT", credit: "Wikimedia Commons" },
      { url: WC("Inert_gas_system.jpg"), caption: "Inert Gas System (IGS) diagram — maintains oxygen-deficient atmosphere above the oil cargo to prevent explosion", credit: "Wikimedia Commons" },
      { url: WC("Tanker_cargo_pumps.jpg"), caption: "Deep-well cargo pumps in a product tanker — each pump serves one cargo tank", credit: "Wikimedia Commons" },
    ],
    doc: "oil_record_book",
  },

  "t-cargo-6-1": {
    funFact: "The derrick on a traditional cargo ship can lift up to 100 tonnes — the equivalent of 10 double-decker buses. A modern harbour crane can lift over 1,000 tonnes!",
    images: [
      { url: WC("Ship_derrick.jpg"), caption: "Traditional union purchase rig (married rig) — two derricks working together over cargo hold and quayside", credit: "Wikimedia Commons" },
      { url: WC("Deck_crane_ship.jpg"), caption: "Modern electric deck crane replacing the traditional derrick on a general cargo vessel", credit: "Wikimedia Commons" },
      { url: WC("Swl_marking.jpg"), caption: "Safe Working Load (SWL) markings on a ship's lifting gear — required by ILO Convention 152", credit: "Wikimedia Commons" },
    ],
  },

  // ── STABILITY ───────────────────────────────────────────────────────────────

  "t-stab-2-1": {
    funFact: "The metacentre was first described by French naval architect Pierre Bouguer in 1746. GM (metacentric height) is positive when G is below M — the ship is stable. When G rises above M, GM becomes negative and the ship develops an angle of loll — a dangerous condition requiring immediate corrective action!",
    images: [
      { url: WC("Brosen_metacentrum.svg"), caption: "Metacentre diagram — G is the centre of gravity, B is the centre of buoyancy, M is the metacentre. When the ship heels, B shifts to B₁ creating the righting lever GZ. Positive GM (G below M) = stable; Negative GM (G above M) = unstable/loll", credit: "Wikimedia Commons" },
      { url: WC("MetacentricHeight.svg"), caption: "Metacentric height (GM) — the vertical distance between G (centre of gravity) and M (metacentre). A large positive GM gives a stiff ship with a short, jerky roll period. A small positive GM gives a tender ship with a long, comfortable roll but less reserve buoyancy. Formula: GM = KB + BM − KG", credit: "Wikimedia Commons" },
      { url: WC("Ship_Stability.svg"), caption: "Ship stability forces at a heeled angle — weight W acts downward through G; buoyancy B acts upward through B₁. The righting lever GZ (horizontal distance between W and B forces) multiplied by the displacement gives the righting moment. GZ = GM × sin θ for small angles", credit: "Wikimedia Commons" },
    ],
  },

  "t-stab-2-3": {
    funFact: "The area under the GZ curve represents dynamical stability (work done to capsize the vessel). IMO Resolution A.749(18) requires: area to 30° ≥ 0.055 m·rad; area to 40° ≥ 0.090 m·rad; maximum GZ at ≥ 25° and ≥ 0.20 m; initial GM ≥ 0.15 m. These criteria apply to all ships — memorise them for the oral exam!",
    images: [
      { url: WC("Stability_curve_NT.svg"), caption: "GZ (righting lever) curve — x-axis: angle of heel (degrees); y-axis: righting lever GZ (metres). The curve rises from 0° (upright), reaches a maximum GZ (angle of maximum stability), then falls back to 0 (angle of vanishing stability = range of stability). The shaded area = dynamical stability", credit: "Wikimedia Commons" },
    ],
  },

  "t-stab-4-1": {
    funFact: "Angle of loll is NOT the same as list! List occurs when G is off the centreline (off-centre weight). Loll occurs when GM is negative (G above M). The key danger: a ship at loll may flop suddenly to the opposite loll angle if disturbed. NEVER correct loll by adding ballast to the high side — this makes it worse. Always add ballast low and in the centreline first!",
    images: [
      { url: WC("Angle_of_Loll.jpg"), caption: "Angle of loll — when GM is zero or negative, the ship is unstable in the upright position and seeks equilibrium at the loll angle where GZ returns to zero. The ship may flop violently between the loll angle on either side in a seaway — a condition that can rapidly lead to capsize if not corrected", credit: "Wikimedia Commons" },
    ],
  },

  "t-stab-4-2": {
    funFact: "The world's oldest operating dry dock was built in Portsmouth, UK in 1495 for King Henry VII — over 500 years old and still used today by the Royal Navy!",
    images: [
      { url: WC("Drydock.jpg"), caption: "A ship in graving dock — keel blocks support the hull, and shores prevent the ship from falling to port or starboard", credit: "Wikimedia Commons" },
      { url: WC("Floating_drydock.jpg"), caption: "Floating dry dock — ballasted down to allow the ship to float in, then deballasted to lift the ship clear of the water", credit: "Wikimedia Commons" },
      { url: WC("Ship_keel_blocks.jpg"), caption: "Keel blocks and side shores carefully positioned to support the ship's weight uniformly", credit: "Wikimedia Commons" },
    ],
  },

  "t-stab-5-1": {
    funFact: "Samuel Plimsoll ('the Sailor's Friend') fought for 30 years to get the load line made law. His Merchant Shipping Act of 1876 is estimated to have saved tens of thousands of sailors' lives by preventing ships from being dangerously overloaded.",
    images: [
      { url: WC("Plimsoll_line.jpg"), caption: "Plimsoll mark (Load Line) on the ship's side — TF=Tropical Fresh, F=Fresh, T=Tropical, S=Summer, W=Winter, WNA=Winter North Atlantic", credit: "Wikimedia Commons" },
      { url: WC("Plimsoll_line_close_up.jpg"), caption: "Close-up of the Load Line marks showing the circle, horizontal bar (Summer draught), and seasonal marks", credit: "Wikimedia Commons" },
    ],
  },

  "t-stab-6-1": {
    funFact: "A large container ship has over 300 km of welded seams in its hull. Welding all this steel produces enough heat to power a small town for a year!",
    images: [
      { url: WC("Ship_cross_section.png"), caption: "Cross-section of a merchant ship showing the double bottom, frames, stringers, floors, and longitudinals", credit: "Wikimedia Commons" },
      { url: WC("Double_bottom_tank.jpg"), caption: "Double bottom tanks — used for ballast water, fresh water, fuel oil, and provides structural protection in grounding", credit: "Wikimedia Commons" },
    ],
  },

  "t-stab-6-3-ffa": {
    funFact: "The modern enclosed totally-enclosed motor-propelled survival craft (TEMPSC) lifeboat can right itself automatically if it capsizes — a critical safety feature introduced after the Ocean Ranger disaster in 1982.",
    images: [
      { url: WC("Fire_triangle.svg"), caption: "The Fire Triangle — fire requires all three elements: Fuel (combustible material), Oxygen (≥ 15% for combustion to continue), and Heat (above ignition temperature). Remove ANY one element to extinguish the fire. CO₂ and inert gas systems remove oxygen; water removes heat; foam smothers to remove oxygen", credit: "Wikimedia Commons" },
      { url: WC("Enclosed_lifeboat.jpg"), caption: "Totally-enclosed motor-propelled survival craft (TEMPSC) — capacity typically 150% of the crew", credit: "Wikimedia Commons" },
      { url: WC("Life_raft_inflated.jpg"), caption: "Inflated davit-launched life raft — inflates automatically when painter line pulls taut on sinking", credit: "Wikimedia Commons" },
      { url: WC("EPIRB1.png"), caption: "EPIRB Category I — Emergency Position Indicating Radio Beacon. Activates automatically when submerged 1–4m in water. Transmits on 406 MHz to COSPAS-SARSAT satellites and on 121.5 MHz as homing signal. Provides position to within 5km to MRCC within minutes", credit: "Wikimedia Commons" },
      { url: WC("Survival_suit_mg_6521.jpg"), caption: "Immersion suit (survival suit) — insulated, waterproof coverall that must be donnable within 2 minutes (including gloves). Maintains core body temperature for ≥ 6 hours in water between 0–2°C. Bright red/orange for visibility. SOLAS III requires one per person plus spares", credit: "Wikimedia Commons" },
      { url: WC("EPIRB.jpg"), caption: "EPIRB mounted in float-free bracket on the bridge wing — the hydrostatic release automatically frees the EPIRB when the bracket is submerged to 1–4 metres depth if the ship sinks", credit: "Wikimedia Commons" },
      { url: WC("SART_search_rescue.jpg"), caption: "Search and Rescue Transponder (SART) — responds to X-band radar pulses with a distinctive blip pattern, range 10 NM ship-to-ship, 30 NM from aircraft", credit: "Wikimedia Commons" },
      { url: WC("Immersion_suit.jpg"), caption: "Immersion suit donning procedure — SOLAS requires all crew to be able to don the suit without assistance within 2 minutes", credit: "Wikimedia Commons" },
      { url: WC("CO2_extinguisher_arp.jpg"), caption: "CO₂ fire extinguisher — ideal for electrical fires and machinery spaces; removes oxygen from the fire triangle", credit: "Wikimedia Commons" },
    ],
    doc: "fire_drill_checklist",
  },

  "t-stab-6-5": {
    funFact: "The bower anchors on a large VLCC can weigh over 25 tonnes each — and the anchor chain is made of individual links weighing up to 180 kg each!",
    images: [
      { url: WC("Stockankare.svg"), caption: "Stock anchor (Admiralty pattern) — the oldest anchor design, with a stock perpendicular to the flukes that ensures one fluke always digs in. Rarely used on modern ships but still found on small craft and as bower anchors on some naval vessels. Very high holding power relative to weight", credit: "Wikimedia Commons" },
      { url: WC("Ship_anchor_stockless.jpg"), caption: "Stockless (patent) bower anchor — the most common type on merchant ships; flukes pivot to set in any seabed", credit: "Wikimedia Commons" },
      { url: WC("Floating_loose_mooring_catenary_plain.svg"), caption: "Anchor chain catenary — the natural curve of the anchor chain hanging between the ship's hawse pipe and the seabed. The catenary provides a shock-absorbing 'spring' effect. Best holding is achieved when the chain lies horizontally along the seabed at the anchor shank — hence the importance of letting out adequate scope (minimum 5× water depth)", credit: "Wikimedia Commons" },
      { url: WC("Anchor_chain_links.jpg"), caption: "Stud-link anchor chain — each shackle (shot/shot) is 27.5 metres; links have studs to prevent kinking and maintain strength", credit: "Wikimedia Commons" },
      { url: WC("Windlass_ship.jpg"), caption: "Vertical windlass on the forecastle — used for weighing anchor and securing mooring lines", credit: "Wikimedia Commons" },
    ],
  },

  // ── MORE METEOROLOGY ────────────────────────────────────────────────────────

  "t-nav-8-ror": {
    funFact: "The most common oral exam scenario involves a crossing situation in restricted visibility. Remember: Rule 15 (crossing) only applies when vessels are in sight of one another. Once visibility drops and vessels are only detected by radar, Rule 19 applies — and Rule 19 says NEVER alter course to port for a vessel forward of the beam!",
    images: [
      { url: WC("Propmec50.PNG"), caption: "ROR crossing scenario — lights showing port sidelight (red) and masthead light: vessel is crossing from your port side. Under Rule 15, YOU are the stand-on vessel. The other vessel must give way. But be prepared to act if she does not!", credit: "Wikimedia Commons" },
    ],
  },

  // ── MORE NAVIGATION ─────────────────────────────────────────────────────────

  "t-nav-7-1": {
    funFact: "The officer keeping the watch is directly responsible for the safe navigation of the ship and the safety of all persons on board. Under STCW Regulation VIII/1, the OOW may not be handed the watch unless they are fit for duty — and it is the duty of both the relieving and relieved officer to ensure this.",
    images: [
      { url: WC("Admiralty_chart.jpg"), caption: "Bridge watchkeeping — the OOW must maintain a proper lookout, ensure the ship follows the passage plan, and monitor the radar at all times. The chart is the primary reference for position monitoring", credit: "Wikimedia Commons" },
    ],
  },

  // ── MARITIME LAW ────────────────────────────────────────────────────────────

  "t-law-1-1": {
    funFact: "The ISM Code was made mandatory in 1998 after a series of preventable disasters including the Herald of Free Enterprise (1987, 193 dead) where the bow doors were left open. The code requires every ship to have a documented Safety Management System (SMS) and a designated person ashore (DPA).",
    images: [
      { url: WC("IMO_headquarters.jpg"), caption: "IMO Headquarters, Albert Embankment, London — the international body that creates the ISM, ISPS, SOLAS, MARPOL and STCW conventions", credit: "Wikimedia Commons" },
    ],
    doc: "solas_certificate",
  },

  "t-law-1-2": {
    funFact: "The ISPS Code was adopted in December 2002 — just 15 months after the 9/11 attacks. It created the MARSEC (Maritime Security) Level system and required all international ships and port facilities to have an approved security plan by 1 July 2004.",
    images: [
      { url: WC("Port_security_perimeter.jpg"), caption: "Port security fencing and access control — ISPS requires restricted access to port facilities with only authorised personnel permitted", credit: "Wikimedia Commons" },
    ],
  },

  "t-law-2-1": {
    funFact: "A Bill of Lading is both a receipt for goods, a document of title, and evidence of a contract of carriage — making it one of the most legally powerful documents in international trade. A single original Bill of Lading can be traded on commodity exchanges to transfer ownership of cargo worth millions of dollars.",
    images: [
      { url: WC("Container_terminal_aerial.jpg"), caption: "Container terminal — every box that passes through is tracked by a Bill of Lading and cargo manifest", credit: "Wikimedia Commons" },
    ],
    doc: "bill_of_lading",
  },

  "t-law-3-1": {
    funFact: "MARPOL 73/78 has prevented millions of tonnes of oil from being dumped into the sea. Before MARPOL, it was common practice for tankers to wash out their cargo tanks with seawater and pump the oil-water mixture overboard! The Exxon Valdez disaster (1989) accelerated the phase-out of single-hull tankers worldwide.",
    images: [
      { url: WC("Exxon_Valdez_oil_spill_birds.jpg"), caption: "Exxon Valdez oil spill (1989) — 37,000 tonnes of crude oil devastated Alaska's Prince William Sound, leading to major changes in tanker design regulations", credit: "US Fish & Wildlife Service / Wikimedia Commons" },
      { url: WC("Oily_water_separator.jpg"), caption: "Oily water separator (OWS) — mandatory on all ships; reduces oily bilge water to below 15 ppm before overboard discharge. 15 ppm alarm/stopping device also required", credit: "Wikimedia Commons" },
    ],
    doc: "oil_record_book",
  },

  "t-law-4-1": {
    funFact: "The STCW Convention was adopted in 1978 and completely revised in 1995 (the 'White List' was created — only countries on the list can issue CoC). The 2010 Manila Amendments overhauled training requirements, including mandatory rest hours of 10 hours per 24-hour period.",
    images: [
      { url: WC("STCW_certificates.jpg"), caption: "STCW Certificate of Competency (CoC) — a Mariner's most important document; allows them to serve as Officer of the Watch on international voyages", credit: "Wikimedia Commons" },
    ],
  },

  "t-law-5-1": {
    funFact: "Modern enclosed lifeboats (TEMPSC) are tested by dropping them from a height of 3 metres into the water with all persons aboard. Hydrostatic releases are designed to automatically release the liferaft when submerged to 2–4 metres depth — so if a ship sinks rapidly, the life raft will still surface!",
    images: [
      { url: WC("Enclosed_lifeboat.jpg"), caption: "Totally Enclosed Motor Propelled Survival Craft (TEMPSC) — SOLAS requires capacity for 100% of crew on each side", credit: "Wikimedia Commons" },
      { url: WC("EPIRB.jpg"), caption: "EPIRB (Emergency Position Indicating Radio Beacon) Category I — activates automatically on immersion, signals to COSPAS-SARSAT satellites, alerts Maritime Rescue Coordination Centre (MRCC)", credit: "Wikimedia Commons" },
      { url: WC("EPIRB1.png"), caption: "Close-up of EPIRB — shows the 406 MHz and 121.5 MHz antenna, strobe light, and water-activated mechanism. Register your EPIRB with the flag state authority so MRCC knows who you are!", credit: "Wikimedia Commons" },
      { url: WC("Life_raft_inflated.jpg"), caption: "Davit-launched liferaft — inflates automatically when painter line is pulled taut, or when hydrostatic release activates at 2–4 m depth", credit: "Wikimedia Commons" },
      { url: WC("Survival_suit_mg_6521.jpg"), caption: "Immersion suit (survival suit) — SOLAS requires donning in under 2 minutes; maintains body temperature for 6 hours in 0°C water", credit: "Wikimedia Commons" },
      { url: WC("Immersion_suit.jpg"), caption: "Donning an immersion suit — practice is essential. The suit protects against hypothermia, the primary killer in cold water survival situations", credit: "Wikimedia Commons" },
    ],
  },

  "t-law-5-2": {
    funFact: "Fixed CO₂ systems in engine rooms must be capable of delivering 85% of the gas into the protected space within 2 minutes. The master key must be kept in a glass-fronted box — the broken glass provides evidence that the system was intentionally activated.",
    images: [
      { url: WC("Fire_triangle.svg"), caption: "The Fire Triangle — the three elements of fire: Fuel, Oxygen, and Heat. Fixed CO₂ suppression systems work by flooding the engine room with CO₂, reducing oxygen below 15% so combustion cannot continue. The system must not be activated until all personnel have evacuated the space!", credit: "Wikimedia Commons" },
      { url: WC("CO2_firefighting_system.jpg"), caption: "Fixed CO₂ fire suppression system — high-pressure cylinders release CO₂ gas to flood the engine room and smother the fire by displacing oxygen", credit: "Wikimedia Commons" },
      { url: WC("Fire_detection_panel.jpg"), caption: "Fire detection and alarm panel — monitors smoke and heat detectors throughout the ship; audible alarm and zone indicator show fire location", credit: "Wikimedia Commons" },
      { url: WC("CO2_extinguisher_arp.jpg"), caption: "Portable CO₂ fire extinguisher — Class B and electrical fires; effective up to 1.5 metres distance", credit: "Wikimedia Commons" },
    ],
  },
};

// ─── Document Mockup Definitions ─────────────────────────────────────────────
// These are rendered as styled HTML panels that look like real maritime documents.

export const DOC_MOCKUPS = {

  oil_record_book: {
    title: "Oil Record Book — Part I (Machinery Space Operations)",
    subtitle: "MARPOL Annex I, Regulation 17 — All ships of 400 GT and above",
    color: "#D97706",
    icon: "📋",
    fields: [
      { label: "Ship Name", value: "MV NAVPREP MARINER" },
      { label: "IMO Number", value: "IMO 9876543" },
      { label: "Gross Tonnage", value: "45,700 GT" },
      { label: "Flag State", value: "INDIA" },
    ],
    rows: [
      { code: "(A)", operation: "Ballasting or cleaning of fuel oil tanks", value: "" },
      { code: "(C)", operation: "Discharge of dirty ballast or cleaning water from tank(s) referred to in (A)", value: "" },
      { code: "(D)", operation: "Collection and disposal of oil residues (sludge)", value: "10 m³ sludge incinerated / to shore reception facility" },
      { code: "(F)", operation: "Discharge of bilge water from machinery space", value: "Nil — through 15 ppm OWS, overboard" },
    ],
    certification: "I hereby certify that all entries in this book are correct.",
    footer: "This book shall be preserved for 3 years after last entry. (MARPOL Annex I, Reg. 17)",
  },

  bill_of_lading: {
    title: "Bill of Lading",
    subtitle: "Negotiable — Shipped on Board",
    color: "#1A5CB5",
    icon: "📄",
    fields: [
      { label: "Shipper", value: "NAVPREP TRADING CO. PTE. LTD., SINGAPORE 048624" },
      { label: "Consignee", value: "To Order" },
      { label: "Notify Party", value: "BOMBAY SHIPPING AGENCIES LTD., MUMBAI 400001" },
      { label: "Vessel", value: "MV NAVPREP MARINER  —  VOY. 045W" },
      { label: "Port of Loading", value: "SINGAPORE" },
      { label: "Port of Discharge", value: "NHAVA SHEVA (JNPT), INDIA" },
    ],
    rows: [
      { code: "CONT", operation: "Container No.", value: "CSNU 1234567  |  SEAL: ML-9981234" },
      { code: "DESC", operation: "Description of Goods", value: "SAID TO CONTAIN: 500 CARTONS ELECTRONIC COMPONENTS — SHIPPER'S LOAD, COUNT & SEAL" },
      { code: "GRWT", operation: "Gross Weight", value: "12,500 KG" },
      { code: "MEAS", operation: "Measurement", value: "22.5 CBM — 1 × 20' DRY CONTAINER" },
    ],
    certification: "IN WITNESS WHEREOF the carrier has signed 3 (three) original Bills of Lading of the same tenor and date, one of which being accomplished, the others to stand void.",
    footer: "Freight Prepaid  |  Clean on Board  |  Date Issued: 18 APR 2026",
  },

  dangerous_goods_manifest: {
    title: "Dangerous Goods Manifest",
    subtitle: "IMDG Code — Required for all voyages carrying Class I–IX cargo",
    color: "#C93030",
    icon: "⚠️",
    fields: [
      { label: "Vessel", value: "MV NAVPREP MARINER" },
      { label: "Voyage", value: "045W  |  SINGAPORE → MUMBAI" },
      { label: "Date", value: "18 APR 2026" },
    ],
    rows: [
      { code: "UN1203", operation: "Petrol (Motor spirit / Gasoline)", value: "Class 3 — PG II — Flash pt. –40°C — IBC Tank: T11-09 — 20,000 L" },
      { code: "UN1072", operation: "Oxygen, compressed", value: "Class 2.2 — Cylinders on Deck — 24 × 50L cylinders — Container CSNU1234" },
      { code: "UN3077", operation: "Environmentally hazardous substance, solid NOS (Zinc oxide)", value: "Class 9 — PG III — 2,500 kg — Stowed on deck" },
    ],
    certification: "I certify that the contents of this consignment are fully and accurately described above by proper shipping name, that they are classified, packaged, marked and labelled/placarded, and are in all respects in proper condition for transport by sea.",
    footer: "Master's signature required before departure. Copy retained on board for entire voyage.",
  },

  solas_certificate: {
    title: "SOLAS Safety Management Certificate (SMC)",
    subtitle: "ISM Code — International Safety Management Certificate",
    color: "#17935E",
    icon: "🏅",
    fields: [
      { label: "Ship Name", value: "MV NAVPREP MARINER" },
      { label: "IMO Number", value: "9876543" },
      { label: "Ship Type", value: "General Cargo Ship" },
      { label: "Flag Administration", value: "INDIA (Directorate General of Shipping)" },
      { label: "Issued By", value: "Indian Register of Shipping (IRS) on behalf of the Government of India" },
      { label: "Valid Until", value: "17 OCT 2030 (subject to annual audit)" },
    ],
    rows: [
      { code: "ISM", operation: "DOC (Document of Compliance) Number", value: "IRS-DOC-2025-IN-00456" },
      { code: "ISM", operation: "SMS Last Verified", value: "Annual Verification — 15 JAN 2026" },
      { code: "ISM", operation: "Next Intermediate Audit", value: "15 JAN 2027 (within 3 months either side of 2nd anniversary)" },
    ],
    certification: "This certifies that the Safety Management System of the ship has been audited and found to comply with the requirements of the ISM Code.",
    footer: "This certificate shall be valid for a period not exceeding 5 years. (ISM Code Regulation 13.7)",
  },

  fire_drill_checklist: {
    title: "Emergency Fire Drill Checklist",
    subtitle: "SOLAS Ch. III, Reg. 19 — Monthly drills required",
    color: "#DC2626",
    icon: "🔥",
    fields: [
      { label: "Date of Drill", value: "18 APR 2026  |  1430 HRS (LT)" },
      { label: "Vessel", value: "MV NAVPREP MARINER  —  Position: 12°N 074°E" },
      { label: "Drill Type", value: "FIRE IN ENGINE ROOM — FLOODING SCENARIO" },
      { label: "Muster Station", value: "All crew mustered at Boat Station No. 1 & 2" },
    ],
    rows: [
      { code: "✓", operation: "General alarm sounded and all hands mustered", value: "02 min 15 sec" },
      { code: "✓", operation: "Fire party equipped with BA sets, fire hoses rigged", value: "04 min 30 sec" },
      { code: "✓", operation: "Boundary cooling commenced — adjacent spaces inspected", value: "05 min 45 sec" },
      { code: "✓", operation: "CO₂ system checked — valves identified and locked off", value: "06 min 00 sec" },
      { code: "✓", operation: "Life-saving appliances checked — lifeboats swung out", value: "08 min 30 sec" },
      { code: "!", operation: "IMPROVEMENT NOTED: 3 crew unfamiliar with BA set fitting — remedial training planned", value: "Action: 25 APR 2026" },
    ],
    certification: "Drill conducted by: Chief Officer. Deficiencies noted and corrective actions assigned. Master's review completed.",
    footer: "Drill records kept for 2 years. Deficiencies and corrective actions entered in ORB / Deck Log Book.",
  },

  passage_plan: {
    title: "Passage Plan — Appraisal & Planning Record",
    subtitle: "SOLAS Ch. V, Reg. 34 — Required for every voyage",
    color: "#185FA5",
    icon: "🗺️",
    fields: [
      { label: "Vessel", value: "MV NAVPREP MARINER" },
      { label: "Voyage", value: "SINGAPORE → MUMBAI  |  VOY. 045W" },
      { label: "Departure Date", value: "20 APR 2026  |  0600 LT" },
      { label: "Distance", value: "2,382 NM (approx.)" },
    ],
    rows: [
      { code: "①", operation: "APPRAISAL — Charts, publications, NOTAMs, NAVTEX checked", value: "BA Charts: 4001, 71, 2058  |  NtM: Week 15/2026" },
      { code: "②", operation: "PLANNING — Track plotted, waypoints entered into ECDIS & GPS", value: "12 waypoints  |  XTL ±0.5 NM  |  UKC minimum 3.5 m" },
      { code: "③", operation: "EXECUTION — Master's standing orders reviewed, bridge team briefed", value: "Speed: 13.5 kn  |  ETA Mumbai: 28 APR 0400 LT" },
      { code: "④", operation: "MONITORING — Reporting points, watch handover notes prepared", value: "VTMS: Cochin, Mumbai  |  SSB: MF 2182 kHz" },
    ],
    certification: "Passage plan reviewed and approved by Master. To be reviewed if significant deviation occurs.",
    footer: "All four stages of passage planning (Appraisal → Planning → Execution → Monitoring) must be documented.",
  },
};
