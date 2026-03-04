import React from "react";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

/**
 * BlockQuote
 * - Editorial / systems-manuscript vibe
 * - Quiet, structural, and typographically strong
 * - No glow, no gradients, no gimmicks
 *
 * Props:
 *  - children: quote content
 *  - cite?: optional citation/source (string)
 *  - emphasis?: "none" | "soft" | "strong" (default: "soft")
 */
export default function BlockQuote({
  children,
  cite,
  emphasis = "soft",
}: {
  children: React.ReactNode;
  cite?: string;
  emphasis?: "none" | "soft" | "strong";
}) {
  const spineOpacity =
    emphasis === "none" ? 0.25 : emphasis === "soft" ? 0.55 : 0.85;

  return (
    <Box
      component="blockquote"
      sx={{
        position: "relative",
        my: 4,
        pl: 4,
        pr: 2,
        py: 1.25,
        mx: 0,

        // Structural spine (quiet, editorial)
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 8,
          bottom: 8,
          width: "2px",
          borderRadius: "2px",
          backgroundColor: alpha("#ffffff", spineOpacity),
        },

        // No box chrome — integrates into manuscript layout
      }}
    >
      <Typography
        component="div"
        sx={{
          color: alpha("#ffffff", 0.84),
          fontSize: "1.02rem",
          lineHeight: 1.75,

          // Quote voice: readable, slightly distinct but not decorative
          fontStyle: "italic",
          fontWeight: 500,

          // Improve rhythm for multi-paragraph quotes
          "& > p": { margin: 0 },
          "& > p + p": { marginTop: 1.25 },

          // Inline code inside quotes should stay crisp
          "& code": {
            fontFamily: `'Fira Code', monospace`,
            fontStyle: "normal",
            fontSize: "0.92em",
            padding: "0.05em 0.3em",
            borderRadius: "6px",
            backgroundColor: alpha("#ffffff", 0.06),
            border: `1px solid ${alpha("#ffffff", 0.08)}`,
          },
        }}
      >
        {children}
      </Typography>

      {cite ? (
        <Typography
          component="cite"
          sx={{
            display: "block",
            mt: 1.25,
            color: alpha("#ffffff", 0.55),
            fontFamily: `'Fira Code', monospace`,
            fontStyle: "normal",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          — {cite}
        </Typography>
      ) : null}
    </Box>
  );
}