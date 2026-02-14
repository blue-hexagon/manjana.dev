import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    themeVariables: {
        background: "#0E1117",

        primaryColor: "#161B22",
        primaryBorderColor: "#4F6BFF",
        primaryTextColor: "#E6EDF3",

        secondaryColor: "#161B22",
        secondaryBorderColor: "#FF4D8D",

        tertiaryColor: "#141A22",

        lineColor: "#4F6BFF",
        textColor: "#E6EDF3",

        fontFamily: "Fira Code, monospace",
    },

    themeCSS: `
          .flowchart,
          .statediagram {
            display: flex;
            justify-content: center;
          }
          .node rect,
          .node circle,
          .node ellipse,
          .node polygon {
            stroke-width: 1.4px;
            fill: #141A22 !important;
            stroke: #4F6BFF !important;
            stroke-width: 1px;
            rx: 8px;
            ry: 8px;
            filter: drop-shadow(0 2px 8px rgba(79,107,255,0.15));
          }
        .statediagram-note text {
          fill: #E6EDF3 !important;
          font-family: Fira Code, monospace;
          font-size: 0.8rem;
          font-weight: 400;
        }
        .note {
             opacity: 0.95;
            }

          .edgePath path {
            stroke-width: 1.3px;
          }

          .cluster rect {
            fill: #141A22 !important;
            stroke: #FF4D8D !important;
            stroke-width: 1px;
          }

          .edgeLabel {
            background-color: #0E1117;
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