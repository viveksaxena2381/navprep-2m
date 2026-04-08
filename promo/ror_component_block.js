 const nightCards = ROR_NIGHT_CARDS;
 const dayCards = ROR_DAY_CARDS;

 const cards = setType === "night" ? nightCards : dayCards;
 const categories = ["All", ...new Set(cards.map(c => c.cat))];
 const filtered = catFilter === "All" ? cards : cards.filter(c => c.cat === catFilter);
 const current = filtered[cardIdx % filtered.length];

 const catColors = { Towing:"#1565C0", Fishing:"#2E7D32", NUC:"#C62828", RAM:"#6A1B9A", Sailing:"#00838F", Anchored:"#E65100", Aground:"#B71C1C", Mine:"#4A148C", CBD:"#EF6C00", Pilot:"#F9A825", ACV:"#0097A7", PD:"#1976D2", Pushing:"#455A64" };

 // ── Smart visual rendering — auto-derives light/shape diagrams from card data ──
 const renderVisual = () => {
  if (!current) return null;
  const isN = setType === "night";
  const sit = current.sit.toLowerCase();
  const cat = current.cat;
  const sig = isN ? (current.lights || "").toLowerCase() : (current.day || "").toLowerCase();

  // Determine view angle from situation text
  let vw = "e";
  if (sit.includes("starboard") || sit.includes("stbd")) vw = "s";
  else if (sit.includes("port")) vw = "p";
  else if (sit.includes("astern") || sit.includes("from behind") || sit.includes("from stern")) vw = "a";

  const W = 200, H = 155, hY = 128;
  const isWide = vw === "s" || vw === "p";
  const hullD = isWide
   ? `M22,${hY} C45,${hY+18} 155,${hY+18} 178,${hY}`
   : `M62,${hY} Q100,${hY+20} 138,${hY}`;
  const viewLabel = vw==="s"?"STARBOARD VIEW":vw==="p"?"PORT VIEW":vw==="e"?"END ON VIEW":"STERN VIEW";

  // Build lights for night cards
  let lights = [];
  let yard = null;
  let noMast = false;
  if (isN) {
   // Sidelights based on view
   const slY = 82;
   if (vw === "s") lights.push([55, slY, "g"]);
   else if (vw === "p") lights.push([55, slY, "r"]);
   else if (vw === "e") { lights.push([58, slY, "r"]); lights.push([142, slY, "g"]); }

   if (cat === "Towing") {
    const over200 = sit.includes("> 200") || sit.includes("exceeds 200") || sit.includes("exceed");
    const isRAM = sit.includes("ram") || sit.includes("restricted");
    if (over200) { lights.push([80,22,"w"],[80,38,"w"],[80,54,"w"]); }
    else { lights.push([80,30,"w"],[80,50,"w"]); }
    if (isRAM) { const baseY = over200 ? 62 : 62; lights.push([80,baseY,"r"],[80,baseY+14,"w"],[80,baseY+28,"r"]); }
    if (sit.includes("underway") && !sit.includes("anchor")) { lights.push([80,100,"y"]); lights.push([80,114,"w"]); }
   } else if (cat === "Fishing") {
    if (sit.includes("trawler") || sit.includes("trawling")) {
     lights.push([80,18,"g"],[80,38,"w"]); // green over white
     lights.push([95,58,"w"]); // masthead abaft
     if (sit.includes("shooting")) { lights.push([125,38,"w"],[125,55,"w"]); }
     else if (sit.includes("hauling")) { lights.push([125,38,"w"],[125,55,"r"]); }
     else if (sit.includes("obstruction") || sit.includes("fast")) { lights.push([125,38,"w"],[125,55,"w"]); }
    } else {
     lights.push([80,28,"r"],[80,48,"w"]); // red over white
     if (sit.includes("> 150")) lights.push([135,48,"w"]); // gear direction
    }
    if (sit.includes("underway") || sit.includes("making way")) lights.push([80,114,"w"]);
   } else if (cat === "NUC") {
    lights.push([80,28,"r"],[80,48,"r"]);
    if (sit.includes("making way") || sit.includes("underway")) lights.push([80,114,"w"]);
   } else if (cat === "RAM") {
    lights.push([80,20,"r"],[80,36,"w"],[80,52,"r"]);
    if (sit.includes("dredge") || sit.includes("dredger")) {
     lights.push([40,34,"r"],[40,50,"r"],[120,34,"g"],[120,50,"g"]);
     yard = [42,40,120];
     lights.push([80,68,"w"]);
    } else if (sit.includes("diving") || sit.includes("small")) {
     // small vessel — just R-W-R, no masthead
    } else {
     lights.push([80,68,"w"]);
    }
    if (sit.includes("anchor")) {
     lights.push([65,70,"w"],[125,90,"w"]);
    } else if (sit.includes("underway") || sit.includes("making way")) {
     lights.push([80,114,"w"]);
    }
   } else if (cat === "Mine") {
    lights.push([80,22,"g"],[52,38,"g"],[108,38,"g"]);
    yard = [38,52,108];
    lights.push([80,58,"w"]);
    if (sit.includes("anchor")) {
     lights.push([65,70,"w"],[125,90,"w"]);
     noMast = false;
    } else {
     lights.push([80,114,"w"]);
    }
   } else if (cat === "CBD") {
    lights.push([80,18,"r"],[80,34,"r"],[80,50,"r"]);
    lights.push([80,66,"w"]);
    if (sit.includes("underway")) lights.push([80,114,"w"]);
   } else if (cat === "Pilot") {
    lights.push([80,30,"w"],[80,50,"r"]);
    if (sit.includes("anchor")) {
     lights.push([65,70,"w"],[125,90,"w"]);
    } else {
     lights.push([80,114,"w"]);
    }
   } else if (cat === "Anchored") {
    if (sit.includes("mine")) {
     lights.push([80,22,"g"],[52,38,"g"],[108,38,"g"]);
     yard = [38,52,108];
     lights.push([65,60,"w"],[125,90,"w"]);
    } else if (sit.includes("pilot")) {
     lights.push([80,30,"w"],[80,50,"r"]);
     lights.push([65,70,"w"],[125,90,"w"]);
    } else {
     lights.push([65,30,"w"],[125,85,"w"]);
     noMast = true;
    }
   } else if (cat === "Aground") {
    lights.push([80,20,"r"],[80,38,"r"]);
    lights.push([65,55,"w"],[125,85,"w"]);
   } else if (cat === "Sailing") {
    lights.push([80,30,"w"],[80,55,"w"]); // mastheads (propelled by machinery)
    if (sit.includes("underway")) lights.push([80,114,"w"]);
   } else if (cat === "ACV") {
    lights.push([80,30,"w"]); // masthead
    if (vw !== "a") lights.push([80,114,"w"]);
   } else if (cat === "PD" || cat === "Pushing") {
    if (sit.includes("< 20") || sit.includes("less than 20") || sit.includes("less than 12") || sit.includes("less than 7")) {
     lights.push([80,40,"w"]); // single masthead
    } else if (sit.includes("probably 50") || sit.includes("or more")) {
     lights.push([80,30,"w"],[80,55,"w"]); // two mastheads
    } else {
     lights.push([80,40,"w"]); // single masthead for <50m
    }
    if (sit.includes("underway") && !sit.includes("anchor")) lights.push([80,114,"w"]);
   } else {
    // Default: single masthead + stern
    lights.push([80,40,"w"]);
    lights.push([80,114,"w"]);
   }

   // Pair trawling: add search light indication
   if (sit.includes("pair trawling")) {
    lights.push([145,68,"w"]); // search light toward other trawler
   }

   // All-round white for anchored/out of range
   if (sit.includes("all") && sit.includes("round") && sit.includes("light") && lights.length < 2) {
    lights.push([80,50,"w"]);
    noMast = true;
   }
  }

  // Build shapes for day cards
  let shapes = [];
  if (!isN) {
   if (sig.includes("three balls")) {
    shapes.push([80,25,"b"],[80,50,"b"],[80,75,"b"]);
   } else if (sig.includes("two balls")) {
    shapes.push([80,35,"b"],[80,65,"b"]);
   } else if (sig.includes("ball, diamond, ball") || sig.includes("ball diamond ball")) {
    shapes.push([80,25,"b"],[80,50,"d"],[80,75,"b"]);
   } else if (sig.includes("ball in fore") || sig.includes("a ball")) {
    shapes.push([80,50,"b"]);
   }

   if (sig.includes("two cones") || sig.includes("cones with apexes")) {
    shapes.push([80,35,"cd"],[80,62,"cu"]);
   }
   if (sig.includes("one cone") && sig.includes("apex upward")) {
    shapes.push([80,50,"cu"]);
   }
   if (sig.includes("cone apex upward") && sig.includes("direction")) {
    shapes.push([128,52,"cu"]);
   }

   if (sig.includes("cylinder")) {
    shapes.push([80,50,"cy"]);
   }

   if (sig.includes("diamond") && !sig.includes("ball, diamond") && !sig.includes("ball diamond")) {
    if (sig.includes("each") || sig.includes("both")) {
     shapes.push([70,40,"d"],[110,70,"d"]);
    } else if (sig.includes("two diamond") || sig.includes("additional diamond")) {
     shapes.push([70,40,"d"],[110,70,"d"]);
    } else if (sig.includes("diamond")) {
     shapes.push([80,50,"d"]);
    }
   }

   if (sig.includes("flag h")) {
    shapes.push([128,48,"fh"]);
   }
   if (sig.includes("flag z")) {
    shapes.push([128,48,"fz"]);
   }
   if (sig.includes("flag g")) {
    shapes.push([128,48,"fg"]);
   }
  }

  const hasContent = isN ? lights.length > 0 : shapes.length > 0;
  const LC = { w:"#FFFFFF", r:"#FF4040", g:"#40FF40", y:"#FFD700" };

  return (
   <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", maxWidth:320, display:"block", margin:"12px auto 8px", borderRadius:14, overflow:"hidden" }}>
    <defs>
     <linearGradient id="rorSea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={isN?"#060D18":"#87CEEB"} />
      <stop offset="82%" stopColor={isN?"#060D18":"#87CEEB"} />
      <stop offset="82%" stopColor={isN?"#040A12":"#2E86AB"} />
      <stop offset="100%" stopColor={isN?"#040A12":"#2E86AB"} />
     </linearGradient>
    </defs>
    <rect width={W} height={H} fill="url(#rorSea)" />
    {isN && [15,45,128,170,25,155,88,60].map((sx,i) => (
     <circle key={i} cx={sx} cy={[12,8,15,22,42,5,7,30][i]} r={[0.8,0.6,0.7,0.5,0.6,0.9,0.5,0.7][i]} fill="#FFF" opacity={[0.35,0.25,0.3,0.2,0.25,0.4,0.2,0.3][i]} />
    ))}
    <path d={hullD} fill={isN?"#0E1826":"#2C3E50"} stroke={isN?"#1A2838":"#1A252F"} strokeWidth={1.5} />
    {!noMast && <line x1={80} y1={8} x2={80} y2={hY} stroke={isN?"#223344":"#555"} strokeWidth={1.5} />}
    {yard && <line x1={yard[1]} y1={yard[0]} x2={yard[2]} y2={yard[0]} stroke={isN?"#223344":"#555"} strokeWidth={1.2} />}
    {isN && lights.map(([x,y,c],i) => (
     <g key={i}>
      <circle cx={x} cy={y} r={15} fill={LC[c]} opacity={0.07} />
      <circle cx={x} cy={y} r={10} fill={LC[c]} opacity={0.15} />
      <circle cx={x} cy={y} r={5.5} fill={LC[c]} opacity={0.85} />
      <circle cx={x} cy={y} r={2.2} fill="#FFF" opacity={0.6} />
     </g>
    ))}
    {!isN && shapes.map(([x,y,t],i) => {
     if (t==="b") return <circle key={i} cx={x} cy={y} r={9} fill="#222" stroke="#111" strokeWidth={1} />;
     if (t==="d") return <polygon key={i} points={`${x},${y-12} ${x+8},${y} ${x},${y+12} ${x-8},${y}`} fill="#222" stroke="#111" strokeWidth={1} />;
     if (t==="cu") return <polygon key={i} points={`${x},${y-10} ${x+9},${y+8} ${x-9},${y+8}`} fill="#222" stroke="#111" strokeWidth={1} />;
     if (t==="cd") return <polygon key={i} points={`${x-9},${y-8} ${x+9},${y-8} ${x},${y+10}`} fill="#222" stroke="#111" strokeWidth={1} />;
     if (t==="cy") return <rect key={i} x={x-7} y={y-12} width={14} height={24} fill="#222" stroke="#111" strokeWidth={1} rx={4} />;
     if (t==="fz") return <g key={i}><rect x={x-11} y={y-8} width={22} height={16} fill="#FFD700" stroke="#333" strokeWidth={0.8} rx={1} /><polygon points={`${x-11},${y-8} ${x+11},${y-8} ${x+11},${y+8}`} fill="#1565C0" opacity={0.5} /><text x={x} y={y+4} textAnchor="middle" fill="#111" fontSize={10} fontWeight={700}>Z</text></g>;
     if (t==="fg") return <g key={i}><rect x={x-11} y={y-8} width={22} height={16} fill="#1565C0" stroke="#333" strokeWidth={0.8} rx={1} />{[0,1,2].map(j=><rect key={j} x={x-11+j*7.33+3.67} y={y-8} width={3.67} height={16} fill="#FFD700" />)}<text x={x} y={y+4} textAnchor="middle" fill="#FFF" fontSize={10} fontWeight={700}>G</text></g>;
     if (t==="fh") return <g key={i}><rect x={x-11} y={y-8} width={22} height={16} fill="#FFF" stroke="#333" strokeWidth={0.8} rx={1} /><rect x={x-11} y={y-8} width={11} height={16} fill="#E53935" /><text x={x} y={y+4} textAnchor="middle" fill="#111" fontSize={10} fontWeight={700}>H</text></g>;
     return null;
    })}
    {!isN && !hasContent && <text x={100} y={65} textAnchor="middle" fill="#556" fontSize={12} fontStyle="italic" fontWeight={500}>No day signal</text>}
    <text x={100} y={H-3} textAnchor="middle" fill={isN?"#445566":"#556677"} fontSize={8.5} fontWeight={600} letterSpacing={1.5} fontFamily="'JetBrains Mono',monospace">{viewLabel}</text>
   </svg>
  );
 };

 if (!current) return null;