import React from "react";
import { Box, Typography } from "@mui/material";

const typeStyles = {
  info: {
    accent: "#00ffcc",
    label: "INFO",
  },
  warning: {
    accent: "#ffcc00",
    label: "WATCH OUT",
  },
  danger: {
    accent: "#ff4081",
    label: "SECURITY",
  },
  deep: {
    accent: "#7aa2ff",
    label: "DEEP DIVE",
  },
};

const StructuredNote = ({ type = "info", title, children }) => {
  const style = typeStyles[type] ?? typeStyles.info;

  return (
    <Box
      sx={{
        position: "relative",
        my: 3,
        px: 2.5,
        py: 2,
        background:
          "linear-gradient(180deg, #121212 0%, #0e0e0e 100%)",
        borderLeft: `3px solid ${style.accent}`,
        borderRadius: "6px",
        boxShadow: "inset 0 0 0 1px #1f1f1f",
      }}
    >
      {/* Label */}
      <Typography
        sx={{
          fontFamily: `'Fira Code', monospace`,
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: style.accent,
          opacity: 0.9,
          mb: 1,
        }}
      >
        {title ?? style.label}
      </Typography>

      {/* Content */}
      <Typography
        sx={{
          color: "#d6d6d6",
          fontSize: "0.95rem",
          lineHeight: 1.65,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default StructuredNote;
