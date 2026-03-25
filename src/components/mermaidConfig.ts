import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",

    themeVariables: {
        background: "#0B0F14",

        primaryColor: "#121821",
        primaryBorderColor: "#4F6BFF",
        primaryTextColor: "#E6EDF3",

        secondaryColor: "#161B22",
        secondaryBorderColor: "#FF4D8D",

        tertiaryColor: "#0E141B",

        lineColor: "#4F6BFF",
        textColor: "#E6EDF3",

        fontFamily: "Fira Code, JetBrains Mono, monospace",
    },
    packet: {
        showBits: false,
        bitsPerRow: 32,
        bitWidth: 24,
        paddingX: 8,
        paddingY: 8,
    },
themeCSS: `

/* ==================================================
   GLOBAL LAYOUT
================================================== */

.mermaid {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
}

.mermaid svg {
    background-image:
        linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 24px 24px;
    border-radius: 10px;
    shape-rendering: geometricPrecision;
}

.mermaid text {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    letter-spacing: 0.3px;
}

/* ==================================================
   PACKET DIAGRAM
================================================== */

.packetBlock {
    fill: #121821 !important;
    stroke: #2F3E55 !important;
    stroke-width: 1px;
    rx: 4px;
    ry: 4px;
    transition: all 120ms ease;
}

.packetLabel {
    font-family: "Fira Code", "JetBrains Mono", monospace !important;
    font-size: 11px !important;
    font-weight: 500;
    fill: #DCE3EA !important;
    letter-spacing: 0.2px;
}

/* --------------------------------------------------
   PER-FIELD BIT OFFSETS (inside block)
-------------------------------------------------- */

.packetByte {
    font-family: "Fira Code", "JetBrains Mono", monospace;
    font-size: 8px !important;
    font-weight: 500;
    fill: rgba(156, 170, 186, 0.78) !important;
    opacity: 1;
    dominant-baseline: hanging;
    pointer-events: none;
    letter-spacing: 0.15px;
    font-variant-numeric: tabular-nums;
}

/* Start/end labels now live inside each block */
.packetByte.start {
    text-anchor: start;
}

.packetByte.end {
    text-anchor: end;
}

/* --------------------------------------------------
   HOVER / INSPECTION
-------------------------------------------------- */

.packetBlock:hover {
    stroke: #4F6BFF !important;
    stroke-width: 1.4px;
    fill: #162033 !important;
    filter: drop-shadow(0 0 6px rgba(79,107,255,0.25));
}

.packetBlock:hover + .packetLabel,
.packetLabel:hover {
    fill: #FFFFFF !important;
}

/* Note:
   Sibling-based hover styling for .packetByte is unreliable here,
   because injected labels may not sit immediately after the hovered rect.
   Keep packetByte subtle by default unless you later group per-field elements.
*/

/* --------------------------------------------------
   RULER — SUBTLE INSTRUMENTATION
-------------------------------------------------- */

.packetRuler {
    opacity: 0.82;
}

.packetTickMinor {
    stroke: rgba(79,107,255,0.18);
    stroke-width: 1;
}

.packetTickMajor {
    stroke: rgba(79,107,255,0.35);
    stroke-width: 1.1;
}

.packetRulerLabel {
    fill: rgba(230,237,243,0.5);
    font-family: "Fira Code", "JetBrains Mono", monospace;
    font-size: 6px !important;
    font-weight: 500;
    letter-spacing: 0.15px;
    font-variant-numeric: tabular-nums;
}

/* This may or may not match depending on final SVG order,
   but it's harmless to keep as a progressive enhancement. */
.packetBlock:hover ~ .packetRuler .packetTickMajor {
    stroke: rgba(79,107,255,0.6);
}
.packetRowHighlight rect.packetBlock {
    fill: #1a2440 !important;
    stroke: #4F6BFF !important;
    stroke-width: 1.6px;
    filter: drop-shadow(0 0 10px rgba(79,107,255,0.35));
}

.packetRowHighlight .packetLabel {
    fill: #ffffff !important;
}

.packetRowHighlight .packetByte {
    fill: #cfe1ff !important;
}
/* ==================================================
   FLOWCHART / STATE DIAGRAM
================================================== */

.flowchart,
.statediagram {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
}

.nodeLabel p,
.nodeLabel {
    line-height: 2;
    white-space: nowrap;
}

.node rect,
.node circle,
.node ellipse,
.node polygon {
    fill: #141A22 !important;
    stroke: #4F6BFF !important;
    stroke-width: 1px;
    rx: 8px;
    ry: 8px;
    filter: drop-shadow(0 2px 8px rgba(79,107,255,0.15));
}

.statediagram-note text {
    fill: #E6EDF3 !important;
    font-family: "Fira Code", "JetBrains Mono", monospace;
    font-size: 0.8rem;
    font-weight: 400;
}

.note {
    opacity: 0.95;
}

.edgePath path {
    stroke-width: 1.3px;
    stroke: #4F6BFF !important;
}

.cluster rect {
    fill: #141A22 !important;
    stroke: #FF4D8D !important;
    stroke-width: 1px;
}

.edgeLabel {
    background-color: #0B0F14;
    color: #E6EDF3;
    font-size: 0.85rem;
}

.label {
    font-weight: 500;
}

.failure > rect {
    stroke: #FFC857 !important;
}

`,
});

export default mermaid;