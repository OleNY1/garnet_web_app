import type { FeatureDiagram } from "../data/diseaseFeatureVisuals";

const ink = "#234851";
const tissue = "#e6b4a6";
const cortex = "#f4d2c6";
const medulla = "#bc7569";
const accent = "#007a80";
const highlight = "#8bd8cf";
const pale = "#d8efea";
const gold = "#f3ce79";

const kidneyOutline = "M158 27C106 16 75 50 72 91c-4 49 23 69 52 66 23-3 26-21 20-39-5-17-1-26 15-35 22-13 26-44-1-56Z";
const kidneyInner = "M150 43c-32-7-60 18-61 49-2 27 11 46 30 47 12 1 16-5 12-16-8-23 1-39 20-52 10-7 14-23-1-28Z";
const liverOutline = "M49 77c7-33 46-50 93-42 40 6 67 9 111 7 21-1 25 10 8 22-25 18-53 24-79 38-39 20-77 44-111 37-22-4-29-26-22-62Z";
const podocyte = "M62 103c-15-13-6-33 9-37 6-18 21-23 38-17 18-8 35 4 36 16 20 2 27 19 16 31l-6 24-13 3-2-18-13 5-3 17h-12l-3-18-13 1-5 17-12-4 3-20Z";

function Highlight({ x, y, r = 7 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill={highlight} stroke={accent} strokeWidth="2" />;
}

function Callout({ from, to }: { from: [number, number]; to: [number, number] }) {
  return <g fill="none" stroke={accent} strokeWidth="1.5">
    <path d={`M${from.join(" ")}L${to.join(" ")}`} strokeDasharray="4 4" />
    <circle cx={from[0]} cy={from[1]} r="5" />
  </g>;
}

function Kidney({ finding }: { finding: "dysplasia" | "ducts" | "calcium" | "cortex" | "junction" | "pelvis" }) {
  const points = finding === "cortex"
    ? [[120, 40], [93, 57], [83, 86], [87, 113], [105, 140]]
    : [[117, 52], [103, 72], [99, 94], [104, 113], [120, 132]];
  return <g transform="translate(36 0)">
    <path d="M155 88c18 2 33 8 36 24 2 9 0 23 6 42" fill="none" stroke={medulla} strokeWidth="7" strokeLinecap="round" />
    <path d={kidneyOutline} fill={cortex} stroke={ink} strokeWidth="2.4" />
    <path d={kidneyInner} fill={tissue} stroke={medulla} strokeWidth="1.5" />
    {finding === "dysplasia" ? <g>
      <path d="M147 44c-14-1-21 3-26 16s-18 4-23 18 6 21 0 31c-5 12 6 23 19 19 3-12 11-14 11-23-2-15 8-18 18-31 8-10 9-18 1-30Z" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="5 4" />
      <Highlight x={101} y={70} r={9} /><Highlight x={114} y={110} r={12} /><Highlight x={141} y={57} r={6} />
    </g> : <g fill={medulla} opacity=".62">
      <path d="m109 58 40 22-48-6Z M93 89l44 4-43 13Z M98 113l38-11-25 25Z M114 133l26-22-13 26Z" />
    </g>}
    {finding === "ducts" && <g stroke={accent} strokeWidth="5" strokeLinecap="round">
      <path d="m113 53 28 25m-41-13 37 18m-44-4 40 10m-43 4 40 2m-39 11 39-6m-35 19 36-15m-27 27 30-22m-18 29 22-23" />
    </g>}
    {(finding === "cortex" || finding === "junction") && points.map(([x, y], i) => <Highlight key={y} x={x} y={y} r={i % 2 ? 5 : 7} />)}
    {finding === "calcium" && <g fill="#fff2b6" stroke="#8f622e" strokeWidth="1">
      {[[117,68],[125,73],[111,71],[109,94],[117,97],[103,98],[114,116],[121,112],[117,121],[125,128]].map(([x,y]) => <circle key={`${x},${y}`} cx={x} cy={y} r="2.9" />)}
    </g>}
    {finding === "pelvis" && <path d="M151 83c-5-11-22-20-29-15-5 4 3 12 12 17-13-6-30-6-32 0-2 8 18 10 27 10-15 1-24 10-20 16 5 6 20 0 29-5-12 11-16 22-9 24 7 2 18-10 26-23 12-11 25-6 33 5 0-15-12-29-37-29Z" fill={highlight} stroke={accent} strokeWidth="2.4" />}
  </g>;
}

function Nephron({ distal }: { distal: boolean }) {
  const ascendingLimb = "M151 141V93";
  const distalTubule = "M151 93V74c0-17 24-16 24-2s24 12 24-1 22-13 22 0";
  return <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M41 47h238M41 95h238M41 145h238" stroke="#c5dddd" strokeDasharray="3 7" />
    <circle cx="70" cy="62" r="23" fill={cortex} stroke={ink} strokeWidth="2" />
    <path d="M55 61c0-16 25-16 24 0-1 11-18 14-18 1 0-7 9-8 12-1m-18 0-17-9m39 15 18 4" stroke={medulla} strokeWidth="3" />
    <path d="M93 60c0-16 18-17 18-4s15 16 15 4 16-13 16 0c0 8-23 7-23 26v55a16 16 0 0 0 32 0" stroke={ink} strokeWidth="5" />
    <path d={ascendingLimb} stroke={distal ? ink : accent} strokeWidth={distal ? 5 : 9} />
    <path d={distalTubule} stroke={distal ? accent : ink} strokeWidth={distal ? 9 : 5} />
    <path d="M221 71c0 8 14 12 29 12m0-36v111" stroke={ink} strokeWidth="5" />
    <Callout from={distal ? [191, 81] : [151, 116]} to={distal ? [199, 27] : [190, 130]} />
  </g>;
}

function Cochlea({ crossSection }: { crossSection: boolean }) {
  return <g stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M67 62c-20-19-12-34 1-33 15 1 21 14 21 36-1 9 3 20 16 22m-19-27c-12-10-15-18-9-23 9-7 20-1 25 10 8 16-1 26 5 40m-12-35c0-16 17-25 27-15 11 11-3 28-12 51" fill="none" />
    <path d="M103 83c-19-2-28 9-23 21 6 16 25 12 37 1l13-7 17 9 12-15c-12-14-31-18-56-9Z" fill={cortex} />
    <path d="M211 90c27-1 33 5 48 16m-49-9c26 0 32 5 46 15m-45-7c20 2 27 7 43 14" fill="none" stroke={medulla} />
    <path d="M139 111c-5-30 25-52 52-41 24 9 28 36 10 49-12 9-31 4-34-11-3-11 8-19 16-13 5 4 2 11-4 11" fill="none" stroke={accent} strokeWidth={crossSection ? 8 : 13} />
    {crossSection && <path d="M139 111c-5-30 25-52 52-41 24 9 28 36 10 49-12 9-31 4-34-11-3-11 8-19 16-13" fill="none" stroke={highlight} strokeWidth="3" />}
  </g>;
}

function Drawing({ diagram }: { diagram: FeatureDiagram }) {
  switch (diagram) {
    case "collecting-ducts": return <Kidney finding="ducts" />;
    case "kidney-dysplasia": return <Kidney finding="dysplasia" />;
    case "nephrocalcinosis": return <Kidney finding="calcium" />;
    case "cortical-cysts": return <Kidney finding="cortex" />;
    case "junction-cysts": return <Kidney finding="junction" />;
    case "hydronephrosis": return <Kidney finding="pelvis" />;
    case "loop-of-henle": return <Nephron distal={false} />;
    case "distal-tubule": return <Nephron distal />;
    case "cochlea": return <Cochlea crossSection={false} />;
    case "cochlea-cross-section": return <Cochlea crossSection />;
    case "liver-cysts": return <g>
      <path d={liverOutline} fill={tissue} stroke={ink} strokeWidth="2.4" />
      <path d="M159 44c-6 14-9 29-4 49" fill="none" stroke={medulla} strokeWidth="3" />
      {[[85,73,9],[119,66,14],[102,107,17],[139,96,9],[198,67,10],[226,61,6]].map(([x,y,r]) => <Highlight key={x} x={x} y={y} r={r} />)}
    </g>;
    case "liver-fibrosis": return <g>
      <path d={liverOutline} transform="translate(2 23) scale(.71)" fill={tissue} stroke={ink} strokeWidth="3" />
      <Callout from={[101,81]} to={[178,82]} />
      <circle cx="226" cy="86" r="46" fill="#fff4ef" stroke={ink} strokeWidth="2.4" />
      <path d="M199 100c-14-22-3-40 13-42 15-6 26 9 36 17 16 13 10 29-4 31-15 2-29 13-45-6Z" fill={highlight} stroke={accent} strokeWidth="2" />
      <circle cx="214" cy="82" r="9" fill={pale} stroke={ink} strokeWidth="2" />
      <circle cx="237" cy="92" r="8" fill={gold} stroke={ink} strokeWidth="2" />
    </g>;
    case "kidney-hypoplasia": return <g>
      <path d={kidneyOutline} transform="translate(-7 0)" fill="none" stroke={ink} strokeWidth="2" strokeDasharray="5 5" />
      <path d={kidneyOutline} transform="translate(26 32) scale(.65)" fill={tissue} stroke={accent} strokeWidth="3.5" />
      <path d={kidneyOutline} transform="translate(312 0) scale(-1 1)" fill={cortex} stroke={ink} strokeWidth="2.4" />
    </g>;
    case "basement-membrane": return <g fill="none" strokeLinejoin="round" strokeLinecap="round">
      <path d="M43 54h234M43 70h234" stroke={ink} strokeWidth="3.2" />
      <path d="M43 116h43q16-7 29-5 18 2 29-5 10-8 25 0t29 2q12-7 23-3t22 8l34 3M43 126l43 1q19 4 31 5t26 10q13 10 28 2t29-4q17 4 29-4t48-8" stroke={accent} strokeWidth="3.2" />
      <path d="M96 124q16-13 35-4t31 11q11 0 21-8t33-5m-96 9q12 0 19 7t27 3 24-8 30 0m-75-15q11-4 19 1t25 0" stroke={accent} strokeWidth="2.1" />
    </g>;
    case "zebra-bodies": return <g>
      <path d={podocyte} fill={tissue} stroke={ink} strokeWidth="2.4" />
      <ellipse cx="107" cy="76" rx="17" ry="13" fill={cortex} stroke={medulla} strokeWidth="1.8" />
      <Callout from={[137,87]} to={[179,85]} />
      <circle cx="226" cy="84" r="46" fill={pale} stroke={ink} strokeWidth="2.4" />
      {[23,17,11,5].map(r => <ellipse key={r} cx="224" cy="83" rx={r} ry={r*.69} transform="rotate(-25 224 83)" fill="none" stroke={accent} strokeWidth="3" />)}
    </g>;
    case "rickets": return <g fill="none" strokeLinecap="round">
      <path d="M105 47c-13 28-17 58 8 93m102-93c13 28 17 58-8 93" stroke={ink} strokeWidth="16" />
      <path d="M105 47c-13 28-17 58 8 93m102-93c13 28 17 58-8 93" stroke={cortex} strokeWidth="12" />
      <path d="M124 49c-13 28-18 60 3 85m69-85c13 28 18 60-3 85" stroke={ink} strokeWidth="6" />
      <path d="M124 49c-13 28-18 60 3 85m69-85c13 28 18 60-3 85" stroke={cortex} strokeWidth="3.2" />
      <path d="M64 94h25m142 0h25" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
    </g>;
    case "cartilage-calcification": return <g strokeLinejoin="round">
      <path d="M130 25h55c-4 25-2 38 8 54 7 10 1 17-10 18-10 0-16-9-25-9s-18 8-29 6c-13-1-14-9-7-21 9-16 9-34 8-48Zm-9 132c6-14 7-27 0-41-4-8 1-12 10-13l54 1c9 0 14 5 10 12-8 12-7 27-1 41Z" fill={cortex} stroke={ink} strokeWidth="2.4" />
      <path d="M117 95c11 8 22 7 35 2l-4 7-30 1Zm81-1c-11 9-23 10-36 4l5 7 30 1Z" fill={highlight} stroke={accent} strokeWidth="2" />
      <path d="m126 99 5 2 5-2m37 3 5-2 6 1 6-2" fill="none" stroke="#8f622e" strokeWidth="2.4" />
      <Callout from={[184,99]} to={[232,85]} />
    </g>;
    case "pancreas-hypoplasia": return <g strokeLinejoin="round">
      <path d="M79 75c23-12 43-21 72-13 22 6 42 2 66-7 18-7 32-6 45-1-4 13-25 21-42 25-39 9-64 26-97 30-16 3-16 21-38 19-30-1-38-34-6-53Z" fill="none" stroke={accent} strokeWidth="2.4" strokeDasharray="6 5" />
      <path d="M79 75c13-7 28-11 43-12 4 13-1 32-14 43-10 8-8 23-23 22-30-1-38-34-6-53Z" fill={gold} stroke={ink} strokeWidth="2.4" />
      <path d="M84 84c-12 11-11 22-2 30m9-35c9 7 13 16 8 25" fill="none" stroke="#a76e38" strokeWidth="2.1" />
    </g>;
    case "retinal-degeneration": return <g strokeLinejoin="round">
      <path d="M211 82c20 8 34 14 49 12l1 17c-17 0-34-6-52-13" fill={cortex} stroke={ink} strokeWidth="2.4" />
      <path d="M68 91c0-31 29-57 68-57 40 0 74 22 81 51 9 34-32 62-76 62-41 0-73-24-73-56Z" fill="#fff7ef" stroke={ink} strokeWidth="2.4" />
      <ellipse cx="94" cy="90" rx="11" ry="27" fill={pale} stroke={ink} strokeWidth="2" />
      <path d="M155 46c31 4 53 23 54 45 0 24-22 40-52 45" fill="none" stroke={accent} strokeWidth="5" />
      <path d="m193 59 5 5m7 9 4 6m-2 26-3 6m-10 10-6 5" stroke={ink} strokeWidth="3" />
    </g>;
    case "optic-disc": return <g>
      <circle cx="160" cy="90" r="60" fill={tissue} stroke={ink} strokeWidth="2.4" />
      <path d="M137 72c11-12 33-13 47 1s12 36-6 45c-13 7-31 5-44-10-8-11-6-26 3-36Z" fill="#fff0bf" stroke={medulla} strokeWidth="2" />
      <ellipse cx="160" cy="91" rx="17" ry="22" fill={pale} stroke={accent} strokeWidth="2" />
      <path d="M135 75c-8-18-14-12-20-21m63 13c7-13 13-14 16-19m-8 62c11 8 16 8 25 10m-72-8c-13 18-17 12-23 21m66-53c11-9 16-10 30-9" fill="none" stroke="#934a4b" strokeWidth="3" strokeLinecap="round" />
    </g>;
    case "glomerular-scarring": return <g stroke={ink} strokeWidth="2.4">
      <path d="M86 59c-31 54 7 93 62 93 41 0 77-24 76-63-2-37-33-58-68-58-23 0-46 10-55 30l-27-10Z" fill="#fff7ef" />
      <path d="M104 78c7-25 36-22 32-3-2 14-28 15-23 36 4 16 33 20 35-3 2-16-17-25-3-44 15-19 43-2 30 14-10 13-28 3-26 19 4 17 34 15 35-3 2-23 27-13 25 4" fill="none" stroke={medulla} strokeWidth="6" strokeLinecap="round" />
      <path d="M172 109c16 8 32 3 41-17 3 24-16 40-36 43-7 1-14-8-5-26Z" fill={highlight} stroke={accent} />
      <Callout from={[197,117]} to={[250,131]} />
    </g>;
  }
}

export function DiseaseFeatureDiagram({ diagram, alt }: { diagram: FeatureDiagram; alt: string }) {
  return <svg viewBox="0 0 320 180" role="img" aria-label={alt} className="h-full w-full">
    <ellipse cx="160" cy="91" rx="125" ry="70" fill="#f5fbfa" />
    <Drawing diagram={diagram} />
  </svg>;
}
