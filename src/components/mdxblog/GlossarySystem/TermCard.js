import React from "react";
import { Box, Typography, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { rfcUrl } from "./rfcUtils";

export default function TermCard({ data, onClose }) {

    if (!data) return null;

    const { header, sections } = data;

    return (
        <Slide direction="left" in mountOnEnter unmountOnExit>

            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    height: "100vh",
                    width: 420,
                    backgroundColor: "background.paper",
                    borderLeft: "1px solid",
                    borderColor: "divider",
                    overflowY: "auto",
                    zIndex: 1400,
                    p: 3
                }}
            >

                {/* Header */}

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>

                    <Typography
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            fontSize: "1rem"
                        }}
                    >
                        {header.term}
                        {header.fullName && ` (${header.fullName})`}
                    </Typography>

                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>

                </Box>

                {header.meta && (
                    <Typography
                        sx={{
                            fontSize: "0.8rem",
                            color: "text.secondary",
                            mb: 3
                        }}
                    >
                        {header.meta}
                    </Typography>
                )}

                {/* Sections */}

                {sections.map((section) => (

                    <Box key={section.id} sx={{ mb: 3 }}>

                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "0.85rem",
                                color: "text.secondary",
                                mb: 0.4
                            }}
                        >
                            {section.title}
                        </Typography>

                        {section.type === "text" && (
                            <Typography sx={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                                {section.value}
                            </Typography>
                        )}

                        {section.type === "inline-list" && (
                            <Typography sx={{ fontSize: "0.9rem", color: "text.secondary" }}>
                                {section.value.join(", ")}
                            </Typography>
                        )}

                        {section.type === "list" && (
                            <Box
                                component="ul"
                                sx={{
                                    m: 0,
                                    pl: 2,
                                    fontSize: "0.9rem",
                                    lineHeight: 1.6,
                                    fontFamily: section.monospace
                                        ? "monospace"
                                        : "inherit"
                                }}
                            >
                                {section.value.map((v, i) => (
                                    <li key={i}>{v}</li>
                                ))}
                            </Box>
                        )}

                        {section.type === "rfc-list" && (
                            <Box component="ul" sx={{ m: 0, pl: 2, fontSize: "0.9rem" }}>
                                {section.value.map((rfc) => (
                                    <li key={rfc.id}>
                                        <Typography
                                            component="a"
                                            href={rfcUrl(rfc.id)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                fontFamily: "monospace",
                                                color: "primary.main",
                                                textDecoration: "none",
                                                "&:hover": { textDecoration: "underline" }
                                            }}
                                        >
                                            {rfc.id}
                                        </Typography>
                                        {rfc.title && ` — ${rfc.title}`}
                                        {rfc.section && ` (${rfc.section})`}
                                        {rfc.relevance && (
                                            <Typography
                                                sx={{
                                                    fontSize: "0.8rem",
                                                    color: "text.secondary"
                                                }}
                                            >
                                                {rfc.relevance}
                                            </Typography>
                                        )}
                                    </li>
                                ))}
                            </Box>
                        )}

                    </Box>

                ))}

            </Box>

        </Slide>
    );
}