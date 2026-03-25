import React from "react";
import { Box } from "@mui/material";

type Variant = "default" | "note" | "warn" | "insight";

const variantStyles: Record<Variant, any> = {
    default: {
        color: "rgba(140, 160, 180, 0.65)",
        accent: "rgba(0, 255, 200, 0.15)",
    },
    note: {
        color: "rgba(120, 180, 255, 0.7)",
        accent: "rgba(120, 180, 255, 0.2)",
    },
    warn: {
        color: "rgba(255, 180, 120, 0.75)",
        accent: "rgba(255, 140, 80, 0.2)",
    },
    insight: {
        color: "rgba(180, 255, 200, 0.75)",
        accent: "rgba(0, 255, 180, 0.2)",
    },
};

interface ShadowCommentProps {
    text?: string;                // 🔥 controlled input
    children?: React.ReactNode;   // fallback
    inline?: boolean;
    variant?: Variant;
}

const ShadowComment = ({
    text,
    children,
    inline = false,
    variant = "default",
}: ShadowCommentProps) => {
    const v = variantStyles[variant];

    const lines = text
        ? text.split("\n")
        : [children]; // no parsing if JSX

    return (
        <Box
            component={inline ? "span" : "div"}
            sx={{
                all: "unset",
                display: inline ? "inline-flex" : "flex",
                flexDirection: "column",

                fontFamily: `'Fira Code', monospace`,
                fontSize: "0.88rem",
                lineHeight: 1.6,
                fontWeight: 400,
                letterSpacing: "0.2px",

                color: v.color,
                opacity: 0.9,

                margin: inline ? 0 : "12px 0",
                paddingLeft: inline ? 0 : "12px",
                boxSizing: "border-box",

                ...(inline
                    ? { verticalAlign: "baseline" }
                    : {
                          borderLeft: `2px solid ${v.accent}`,
                      }),
            }}
        >
            {lines.map((line, i) => (
                <Box
                    key={i}
                    sx={{
                        display: "flex",
                        gap: "8px",
                    }}
                >
                    {/* gutter */}
                    <Box
                        sx={{
                            minWidth: "20px",
                            textAlign: "right",
                            color: "rgba(255,255,255,0.25)",
                            userSelect: "none",
                        }}
                    >
                        //
                    </Box>

                    {/* content */}
                    <Box
                        sx={{
                            fontFamily: `'Fira Code', monospace`,
                            fontSize: "1rem",
                            lineHeight: 1.6,
                            fontStyle: "italic",
                            color: v.color,
                            textShadow: `0 0 6px ${v.accent}`,
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {line || "\u00A0"}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ShadowComment;