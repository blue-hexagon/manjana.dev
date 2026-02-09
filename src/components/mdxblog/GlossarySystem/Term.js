import React, {useRef, useState, useEffect} from "react";
import {Popover, Typography, Box} from "@mui/material";
import {projectHover, projectCard} from "./projections";
import {useTermRegistry} from "./TermRegistry";
import {resolveGlossaryEntry} from "./resolveGlossaryEntry";
import {useGlossaryPrefix} from "./GlossaryContext";

const Term = ({name, prefix, ending}) => {

    // -----------------------------
    // Hooks (MUST be unconditional)
    // -----------------------------
    const enterTimer = useRef();
    const leaveTimer = useRef();

    const [anchorPos, setAnchorPos] = useState(null);
    const [locked, setLocked] = useState(false);

    const registry = useTermRegistry();
    const defaultPrefix = useGlossaryPrefix();

    // -----------------------------
    // Resolve entry AFTER hooks
    // -----------------------------
    const resolved = resolveGlossaryEntry(
        name,
        prefix ?? defaultPrefix
    );
    const resolvedKey = resolved?.key ?? null;
    const entry = resolved?.entry ?? null;

    // -----------------------------
    // Register resolved key
    // -----------------------------
    useEffect(() => {
        if (registry && resolvedKey) {
            registry.register(resolvedKey);
        }
    }, [registry, resolvedKey]);

    // -----------------------------
    // Projection layer
    // -----------------------------
    const hoverData = entry ? projectHover(entry) : null;
    const cardData = entry ? projectCard(entry) : null;

    // -----------------------------
    // If no usable glossary entry
    // -----------------------------
    if (!entry || !hoverData || !cardData) {
        return entry?.term ?? name;
    }

    const open = Boolean(anchorPos);

    // -----------------------------
    // Event handlers
    // -----------------------------
    const handleEnter = (e) => {
        clearTimeout(leaveTimer.current);
        enterTimer.current = setTimeout(() => {
            if (!locked) {
                setAnchorPos({top: e.clientY, left: e.clientX});
            }
        }, 120);
    };

    const handleLeave = () => {
        clearTimeout(enterTimer.current);
        leaveTimer.current = setTimeout(() => {
            if (!locked) setAnchorPos(null);
        }, 120);
    };

    const handleClick = (e) => {
        setLocked(true);
        setAnchorPos({top: e.clientY, left: e.clientX});
    };

    const handleClose = () => {
        setLocked(false);
        setAnchorPos(null);
    };

    // -----------------------------
    // Render
    // -----------------------------
    return (
        <>
            {/* Inline term */}
            <Box
                component="span"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onClick={handleClick}
                sx={{
                    cursor: "help",
                    color: "#00ffcc",
                    fontFamily: `'Fira Code', monospace`,
                    userSelect: "none",
                }}
            >
                <Box
                    component="span"
                    sx={{
                        borderBottom: "1px dotted #00FFCCB0",
                        "&:hover": {borderBottom: "1px dotted #00ffcc"},
                    }}
                >
                    {hoverData.term}{ending ?? ending}
                </Box>

                <Box
                    component="sup"
                    sx={{
                        ml: 0.2,
                        color: "#ffffff",
                        fontSize: "0.7em",
                        opacity: 0.9,
                        verticalAlign: "text-top",
                        lineHeight: 0.8,
                    }}
                >
                    ⬧
                </Box>
            </Box>

            {/* Card popover */}
            <Popover
                open={open}
                anchorReference="anchorPosition"
                anchorPosition={anchorPos}
                onClose={handleClose}
                sx={{pointerEvents: locked ? "auto" : "none"}}
                disableRestoreFocus
                disableAutoFocus
                disableEnforceFocus
                PaperProps={{
                    sx: {
                        width: 380,
                        background: "#121212",
                        border: "1px solid #00ffcc",
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: "0 0 24px rgba(0,255,204,0.35)",
                    },
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        background: "linear-gradient(90deg,#003b33,#001a17)",
                        borderBottom: "1px solid #00ffcc",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: 1,
                            color: "#00ffcc",
                        }}
                    >
                        {cardData.header.term}
                        {cardData.header.fullName &&
                            ` (${cardData.header.fullName})`}
                    </Typography>

                    {cardData.header.meta && (
                        <Typography sx={{fontSize: "0.82rem", opacity: 0.75}}>
                            {cardData.header.meta}
                        </Typography>
                    )}
                </Box>

                {/* Body */}
                <Box sx={{p: 2}}>
                    {cardData.sections.map((section) => (
                        <Box key={section.id} sx={{mt: 1.5}}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "0.9rem",
                                    mb: 0.5,
                                    opacity: 0.85,
                                }}
                            >
                                {section.title}
                            </Typography>

                            {section.type === "text" && (
                                <Typography sx={{fontSize: "0.92rem", opacity: 0.9}}>
                                    {section.value}
                                </Typography>
                            )}

                            {section.type === "inline-list" && (
                                <Typography sx={{fontSize: "0.9rem", opacity: 0.85}}>
                                    {section.value.join(", ")}
                                </Typography>
                            )}

                            {section.type === "list" && (
                                <Box
                                    sx={{
                                        p: 1.2,
                                        background: "#0b0b0b",
                                        border: "1px solid #1f1f1f",
                                        borderRadius: 1,
                                    }}
                                >
                                    <Box
                                        component="ul"
                                        sx={{
                                            m: 0,
                                            pl: 2,
                                            fontFamily: section.monospace
                                                ? "monospace"
                                                : "inherit",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        {section.value.map((v, i) => (
                                            <Box component="li" key={i} sx={{mb: 0.5}}>
                                                {v}
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            </Popover>
        </>
    );
};

export default Term;
