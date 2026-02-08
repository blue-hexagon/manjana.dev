import React from "react";
import { Box, Typography } from "@mui/material";

const typeStyles = {
  info: {
    border: "#00ffcc",
    glow: "rgba(0,255,204,0.35)",
    label: "INFO",
  },
  warning: {
    border: "#ffcc00",
    glow: "rgba(255,204,0,0.35)",
    label: "WATCH OUT",
  },
  danger: {
    border: "#ff4081",
    glow: "rgba(255,64,129,0.35)",
    label: "SECURITY",
  },
  deep: {
    border: "#7aa2ff",
    glow: "rgba(122,162,255,0.35)",
    label: "DEEP DIVE",
  },
};

const StructuredNote = ({ type = "info", title, children }) => {
  const style = typeStyles[type] ?? typeStyles.info;

  return (
    <Box
      sx={{
        borderLeft: `4px solid ${style.border}`,
        backgroundColor: "#141414",
        padding: 2,
        marginY: 3,
        borderRadius: 2,
        boxShadow: `0 0 18px ${style.glow}`,
      }}
    >
      <Typography
        sx={{
          fontFamily: `'Fira Code', monospace`,
          fontSize: "0.85rem",
          fontWeight: 700,
          color: style.border,
          mb: 1,
        }}
      >
        {title || style.label}
      </Typography>

      <Typography
        sx={{
          color: "#e0e0e0",
          lineHeight: 1.6,
          fontSize: "1rem",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default StructuredNote;
