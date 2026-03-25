import React, {useState} from "react";
import {Box, Collapse, IconButton, Typography} from "@mui/material";
import {alpha} from "@mui/material/styles";
import {KeyboardArrowDown, KeyboardArrowRight} from "@mui/icons-material";

const typeStyles = {
    debug: {accent: "rgb(255,153,0)", label: "DEBUG"},
    info: {accent: "#00ffcc", label: "INFO"},
    takeaway: {accent: "#00ffcc", label: "TAKEAWAY"},
    warning: {accent: "#ffcc00", label: "WARNING"},
    danger: {accent: "#ff4081", label: "SECURITY"},
    deep: {accent: "#7aa2ff", label: "DEEP DIVE"},
};

const StructuredNote = ({
    type = "info",
    title,
    children,
    collapsible = false,
    defaultExpanded = true,
}) => {
    const style = typeStyles[type] ?? typeStyles.info;
    const [open, setOpen] = useState(defaultExpanded);

    const toggle = () => {
        if (collapsible) setOpen(prev => !prev);
    };

    return (
        <Box
            sx={{
                position: "relative",
                mt: 4,
                mb: 4,
                pl: 3.2,
                pr: 2,
                my: 2,
            }}
        >
            {/* Spine */}
            <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    py: "12px",
                    bottom: 0,
                    width: "2px",
                    backgroundColor: style.accent,
                    opacity: 0.7,
                }}
            />

            {/* Header */}
            <Box
                onClick={toggle}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: collapsible ? "pointer" : "default",
                    userSelect: "none",
                    mb: 0.6,
                }}
            >
                {collapsible && (
                    <IconButton
                        size="small"
                        sx={{
                            color: style.accent,
                            p: 0.2,
                            marginInlineStart: "-.38rem"
                        }}
                    >
                        {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                    </IconButton>
                )}

                <Typography
                    component="div"
                    sx={{
                        fontFamily: `'Fira Code', monospace`,
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: style.accent,
                        lineHeight: 1,
                    }}
                >
                    {title ?? style.label}
                </Typography>
            </Box>

            {/* Content */}
            <Collapse in={collapsible ? open : true} timeout="auto" unmountOnExit={collapsible}>
                <Box
                    sx={{
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        color: alpha("#ffffff", 0.82),

                        // 🔥 FIXED TYPOGRAPHY SYSTEM
                        "& > *": {
                            marginTop: 0,
                        },

                        "& > * + *": {
                            marginTop: "0.75em",
                        },

                        // Paragraphs
                        "& p": {
                            margin: 0,
                        },

                        // Lists
                        "& ul, & ol": {
                            paddingLeft: "1.2em",
                            margin: 0,
                        },

                        "& li": {
                            margin: "0.2em 0",
                        },

                        // Code blocks
                        "& pre": {
                            margin: "0.8em 0",
                            padding: "0.8em",
                            borderRadius: "6px",
                            overflowX: "auto",
                        },

                        // Inline code
                        "& code": {
                            fontFamily: `'Fira Code', monospace`,
                            fontSize: "0.85em",
                        },

                        // Headings inside notes (rare but safe)
                        "& h1, & h2, & h3, & h4": {
                            margin: "0.8em 0 0.3em",
                        },
                    }}
                >
                    {children}
                </Box>
            </Collapse>
        </Box>
    );
};

export default StructuredNote;