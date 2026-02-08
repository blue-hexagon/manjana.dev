import React from "react";
import {Dialog, Box, Typography} from "@mui/material";
import {rfcUrl} from "./rfcUtils";

export default function TermCard({data, onClose}) {
    if (!data) return null;

    return (
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <Box sx={{p: 3, background: "#121212"}}>
                {/* Header */}
                <Typography
                    sx={{
                        fontFamily: "monospace",
                        fontWeight: 800,
                        color: "#00ffcc",
                        mb: 0.5,
                    }}
                >
                    {data.header.term}
                    {data.header.fullName && ` (${data.header.fullName})`}
                </Typography>

                {data.header.meta && (
                    <Typography sx={{fontSize: "0.8rem", opacity: 0.7}}>
                        {data.header.meta}
                    </Typography>
                )}

                {/* Sections */}
                {data.sections.map((section) => (
                    <Box key={section.id} sx={{mt: 2}}>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                opacity: 0.85,
                                mb: 0.5,
                            }}
                        >
                            {section.title}
                        </Typography>

                        {section.type === "text" && (
                            <Typography sx={{fontSize: "0.9rem"}}>
                                {section.value}
                            </Typography>
                        )}

                        {section.type === "inline-list" && (
                            <Typography sx={{fontSize: "0.85rem", opacity: 0.8}}>
                                {section.value.join(", ")}
                            </Typography>
                        )}

                        {section.type === "list" && (
                            <Box
                                component="ul"
                                sx={{
                                    m: 0,
                                    pl: 2,
                                    fontFamily: section.monospace
                                        ? "monospace"
                                        : "inherit",
                                    fontSize: "0.85rem",
                                }}
                            >
                                {section.value.map((v, i) => (
                                    <li key={i}>{v}</li>
                                ))}
                            </Box>
                        )}
                        {section.type === "rfc-list" && (
  <Box component="ul" sx={{ pl: 2, fontSize: "0.85rem" }}>
    {section.value.map((rfc) => (
      <li key={rfc.id}>
        <a
          href={rfcUrl(rfc.id)}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#00ffcc" }}
        >
          {rfc.id}
        </a>
        {rfc.title && ` — ${rfc.title}`}
        {rfc.section && ` (${rfc.section})`}
        {rfc.relevance && (
          <Typography
            component="span"
            sx={{ display: "block", opacity: 0.7, fontSize: "0.8rem" }}
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
        </Dialog>
    );
}
