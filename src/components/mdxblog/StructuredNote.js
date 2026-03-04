import React from "react";
import {Box, Typography} from "@mui/material";
import {alpha} from "@mui/material/styles";

const typeStyles = {
    debug: {accent: "rgb(255,153,0)", label: "DEBUG"},
    info: {accent: "#00ffcc", label: "INFO"},
    takeaway: {accent: "#00ffcc", label: "TAKEAWAY"},
    warning: {accent: "#ffcc00", label: "WARNING"},
    danger: {accent: "#ff4081", label: "SECURITY"},
    deep: {accent: "#7aa2ff", label: "DEEP DIVE"},
};

const StructuredNote = ({type = "info", title, children}) => {
    const style = typeStyles[type] ?? typeStyles.info;

    return (
        <Box
            sx={{
                position: "relative",
                mt: 5,
                mb: 4,
                pl: 4,
                pr: 3,
                pt: 2.5,
                pb: 0,
            }}
        >
            {/* Vertical Spine */}
            <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    top: 8,
                    bottom: 0,
                    width: "2px",
                    backgroundColor: style.accent,
                    opacity: 0.8,
                }}
            />

            {/* Label */}
            <Typography
                sx={{
                    fontFamily: `'Fira Code', monospace`,
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: style.accent,
                    mb: 0,
                }}
            >
                {title ?? style.label}
            </Typography>

            {/* Content */}
            <Typography
                sx={{
                    fontSize: "0.96rem",
                    lineHeight: 1.8,
                    color: alpha("#ffffff", 0.82),
                    transform: "translateY(-2px)",
                    fontFeatureSettings: "'ss01' on",
                    pb: 0.1
                }}
            >{children}
            </Typography>
        </Box>
    );
};

export default StructuredNote;