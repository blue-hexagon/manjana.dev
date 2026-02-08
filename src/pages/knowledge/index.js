import React, {useState, useMemo} from "react";
import Layout from "../../components/Layout";
import {TextField, Box, Chip, Stack, Typography} from "@mui/material";
import {useGlossaryIndex, matchEntry} from "../../components/mdxblog/GlossarySystem/useGlossaryIndex";
import {projectCard} from "../../components/mdxblog/GlossarySystem/projections";
import TermCard from "../../components/mdxblog/GlossarySystem/TermCard";

const MAX_RESULTS = 20;

export default function KnowledgeIndex() {
    const entries = useGlossaryIndex();
    const [query, setQuery] = useState(null);
    const [activeEntry, setActiveEntry] = useState(null);

    const results = useMemo(
        () => entries.filter((e) => matchEntry(e, query)),
        [entries, query]
    );

    const visibleResults = results.slice(0, MAX_RESULTS);

    const totalCount = entries.length;
    const matchCount = results.length;

    return (
        <>
            <Box sx={{maxWidth: 1100, mx: "auto", px: 3, py: 6}}>
                <Typography variant="h4" gutterBottom>
                    Knowledge Index
                </Typography>

                <TextField
                    fullWidth
                    placeholder="Search terms, acronyms, protocols, formats…"
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{mb: 4}}
                />
                <Typography
                    sx={{
                        mb: 2,
                        fontSize: "0.85rem",
                        opacity: 0.7,
                    }}
                >
                    {query
                        ? `Showing ${Math.min(matchCount, MAX_RESULTS)} of ${matchCount} matching terms (out of ${totalCount})`
                        : `Showing ${Math.min(totalCount, MAX_RESULTS)} of ${totalCount} terms — start typing to narrow`}
                </Typography>


                <Stack spacing={1}>
                    {visibleResults.map((entry) => (
                        <Box
                            key={entry._key}
                            onClick={() => setActiveEntry(entry)}
                            sx={{
                                p: 2,
                                border: "1px solid #1f1f1f",
                                borderRadius: 1,
                                cursor: "pointer",
                                "&:hover": {background: "#0b0b0b"},
                            }}
                        >
                            <Typography fontWeight={700}>
                                {entry.term}
                                {entry.scope && (
                                    <Chip
                                        size="small"
                                        label={entry.scope}
                                        sx={{ml: 1, fontSize: "0.7rem"}}
                                    />
                                )}
                            </Typography>

                            <Typography fontSize="0.9rem" opacity={0.8}>
                                {entry.definition}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
                {matchCount > MAX_RESULTS && (
                    <Typography
                        sx={{
                            mt: 2,
                            fontSize: "0.8rem",
                            opacity: 0.6,
                            fontStyle: "italic",
                        }}
                    >
                        Too many results — refine your search to see more specific terms.
                    </Typography>
                )}
                {/* Side drawer / modal */}
                {activeEntry && (
                    <TermCard
                        data={projectCard(activeEntry)}
                        onClose={() => setActiveEntry(null)}
                    />
                )}
            </Box>
        </>
    );
}
