import React, { useState } from "react";
import { Popover, Typography } from "@mui/material";

const HoverNote = ({ term, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <Typography
        component="span"
        onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
        onMouseLeave={() => setAnchorEl(null)}
        sx={{
          color: "#00ffcc",
          borderBottom: "1px dotted #00ffcc",
          cursor: "help",
          fontFamily: `'Fira Code', monospace`,
        }}
      >
        {term}
      </Typography>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            p: 2,
            maxWidth: 320,
            background: "#121212",
            border: "1px solid #00ffcc",
            boxShadow: "0 0 18px rgba(0,255,204,0.35)",
          },
        }}
      >
        <Typography sx={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
          {children}
        </Typography>
      </Popover>
    </>
  );
};

export default HoverNote;
