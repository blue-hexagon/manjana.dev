import React, {useRef, useState} from "react";
import {Popover, Typography, Box} from "@mui/material";
import {glossary} from "./glossary";
import {useTermRegistry} from "./TermRegistry";
import {useEffect} from "react";

const Term = ({name}) => {
    const enterTimer = useRef();
    const leaveTimer = useRef();
    const registry = useTermRegistry();

    useEffect(() => {
        registry?.register(name);
    }, [name]);
    const entry = glossary[name];
    const [anchorPos, setAnchorPos] = useState(null);

    const [locked, setLocked] = useState(false);

    if (!entry) return name;

    const open = Boolean(anchorPos);


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
        setAnchorPos({
            top: e.clientY,
            left: e.clientX,
        });
    };

    const handleClose = () => {
        setLocked(false);
        setAnchorPos(null);
    };

    return (
        <>
            {/* ✅ INLINE element */}
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
                {/* underline ONLY this part */}
                <Box
                    component="span"
                    sx={{
                        borderBottom: "1px dotted #00FFCCB0",
                        "&:hover": {borderBottom: "1px dotted #00ffcc"},
                        color: "#00ffcc",
                    }}
                >
                    {entry.label}
                </Box>

                {/* icon is outside the underlined span */}
                <Box
                    component="sup"
                    sx={{
                        ml: 0.2,
                        color: "#ffffff",
                        borderBottom: "none",
                        textDecoration: "none",
                        fontSize: "0.7em",
                        opacity: 0.90,
                        verticalAlign: "text-top",
                        lineHeight: 0.8,
                    }}
                >
                    ⬧
                </Box>
            </Box>

            <Popover
                open={open}
                anchorReference="anchorPosition"
                anchorPosition={anchorPos}
                onClose={handleClose}
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
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
                    }
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
                        {entry.label}
                    </Typography>
                </Box>

                {/* Body */}
                <Box sx={{p: 2}}>

                    {/* Definition */}
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            mb: 0.5,
                        }}
                    >
                        Definition
                    </Typography>

                    <Typography sx={{fontSize: "0.95rem", opacity: 0.95}}>
                        {entry.define}
                    </Typography>

                    {/* Explanation */}
                    {entry.explain && (
                        <>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    mt: 1.5,
                                    mb: 0.5,
                                    opacity: 0.8,
                                }}
                            >
                                Details
                            </Typography>

                            <Typography sx={{fontSize: "0.92rem", opacity: 0.85}}>
                                {entry.explain}
                            </Typography>
                        </>
                    )}

                    {/* Example */}
                    {entry.example && (
                        <>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    mt: 1.5,
                                    mb: 0.5,
                                    opacity: 0.8,
                                }}
                            >
                                Example
                            </Typography>

                            <Box
                                sx={{
                                    p: 1.2,
                                    background: "#0b0b0b",
                                    border: "1px solid #1f1f1f",
                                    borderRadius: 1,
                                    fontFamily: "monospace",
                                    fontSize: "0.9rem",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {entry.example}
                            </Box>
                        </>
                    )}
                </Box>
            </Popover>

        </>
    );
};

export default Term;
