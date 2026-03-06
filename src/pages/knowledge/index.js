import React, {useState, useMemo, useEffect, useRef} from "react";
import {Box, Typography, TextField, Modal, IconButton, Chip, Switch} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useGlossaryIndex, matchEntry} from "../../components/mdxblog/GlossarySystem/useGlossaryIndex";
import {projectCard} from "../../components/mdxblog/GlossarySystem/projections";
import {rfcUrl} from "../../components/mdxblog/GlossarySystem/rfcUtils";
import {IoMdNuclear} from "react-icons/io";

function isTypingTarget(el) {
    if (!el) return false;
    const tag = (el.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return true;
    if (el.isContentEditable) return true;
    return false;
}

export default function KnowledgeIndex() {
    const entries = useGlossaryIndex();

    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [dense, setDense] = useState(false);

    const [palette, setPalette] = useState(false);
    const [paletteQuery, setPaletteQuery] = useState("");
    const [paletteIndex, setPaletteIndex] = useState(0);

    const paletteListRef = useRef(null);
    const paletteItemRefs = useRef([]);
    const listRef = useRef(null);
    const listItemRefs = useRef([]);

    const [includeDomains, setIncludeDomains] = useState([]);
    const [excludeDomains, setExcludeDomains] = useState([]);

    const searchRef = useRef(null);
    const paletteRef = useRef(null);

    const domainList = useMemo(() => {
        const set = new Set();
        entries.forEach(e => e.domain?.forEach(d => set.add(d)));
        return Array.from(set).sort();
    }, [entries]);

    const queryFiltered = useMemo(() => {
        if (!query) return entries;
        return entries.filter(e => matchEntry(e, query));
    }, [entries, query]);

    const filteredEntries = useMemo(() => {
        let list = queryFiltered;

        if (includeDomains.length) {
            list = list.filter(e =>
                e.domain?.some(d => includeDomains.includes(d))
            );
        }

        if (excludeDomains.length) {
            list = list.filter(e =>
                !e.domain?.some(d => excludeDomains.includes(d))
            );
        }

        return list;
    }, [queryFiltered, includeDomains, excludeDomains]);

    const results = filteredEntries;

    const active = results[activeIndex]
        ? projectCard(results[activeIndex])
        : null;

    const paletteResults = useMemo(() => {
        const q = paletteQuery.trim();
        if (!q) return entries.slice(0, 24);
        return entries.filter(e => matchEntry(e, q)).slice(0, 24);
    }, [entries, paletteQuery]);

    const domainTotals = useMemo(() => {
        const map = {};
        entries.forEach(e => {
            e.domain?.forEach(d => {
                map[d] = (map[d] || 0) + 1;
            });
        });
        return map;
    }, [entries]);

    const domainMatches = useMemo(() => {
        const map = {};
        queryFiltered.forEach(e => {
            e.domain?.forEach(d => {
                map[d] = (map[d] || 0) + 1;
            });
        });
        return map;
    }, [queryFiltered]);

    const relations = useMemo(() => {
        if (!active) return [];

        const term = active.header.term.toLowerCase();

        return entries
            .filter(e => e.term.toLowerCase() !== term)
            .filter(e => e.definition?.toLowerCase().includes(term))
            .slice(0, 8);
    }, [active, entries]);

    const toggleDomain = (domain, shiftKey = false) => {
        if (shiftKey) {
            setExcludeDomains(prev =>
                prev.includes(domain)
                    ? prev.filter(d => d !== domain)
                    : [...prev, domain]
            );

            setIncludeDomains(prev =>
                prev.filter(d => d !== domain)
            );
        } else {
            setIncludeDomains(prev =>
                prev.includes(domain)
                    ? prev.filter(d => d !== domain)
                    : [...prev, domain]
            );

            setExcludeDomains(prev =>
                prev.filter(d => d !== domain)
            );
        }
    };

    useEffect(() => {
        const handler = (e) => {
            const typing = isTypingTarget(e.target);

            if (e.key === "/" && !typing) {
                e.preventDefault();
                searchRef.current?.focus();
                return;
            }

            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setPalette(true);
                setPaletteQuery("");
                setPaletteIndex(0);
                return;
            }

            if (e.key === "Escape" && palette) {
                setPalette(false);
                return;
            }

            if (palette) {
                if (!paletteResults.length) return;

                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setPaletteIndex(i =>
                        Math.min(i + 1, paletteResults.length - 1)
                    );
                }

                if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setPaletteIndex(i =>
                        Math.max(i - 1, 0)
                    );
                }
                if (e.key === "Home") {
                    e.preventDefault();
                    setActiveIndex(0);
                }

                if (e.key === "End") {
                    e.preventDefault();
                    setActiveIndex(results.length - 1);
                }
                if (e.key === "PageDown") {
                    e.preventDefault();
                    setActiveIndex(i =>
                        Math.min(i + 10, results.length - 1)
                    );
                }

                if (e.key === "PageUp") {
                    e.preventDefault();
                    setActiveIndex(i =>
                        Math.max(i - 10, 0)
                    );
                }
                if (e.key === "Enter") {
                    e.preventDefault();
                    const entry = paletteResults[paletteIndex];
                    if (entry) {
                        setQuery(entry.term);
                        setActiveIndex(0);
                    }
                    setPalette(false);
                    searchRef.current?.focus();
                }

                return;
            }

            if (!results.length) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex(i =>
                    Math.min(i + 1, results.length - 1)
                );
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex(i =>
                    Math.max(i - 1, 0)
                );
            }

            if (e.key === "Enter") {
                const entry = results[activeIndex];
                if (entry) setQuery(entry.term);
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [palette, paletteResults, paletteIndex, results, activeIndex]);

    useEffect(() => {
        setActiveIndex(0);
    }, [query, includeDomains, excludeDomains]);

    useEffect(() => {
        if (palette) {
            setTimeout(() => paletteRef.current?.focus(), 10);
        }
    }, [palette]);

    useEffect(() => {

        const container = paletteListRef.current;
        const el = paletteItemRefs.current[paletteIndex];

        if (!container || !el) return;

        el.focus();

        el.scrollIntoView({
            block: "nearest",
            inline: "nearest"
        });

    }, [paletteIndex]);
    useEffect(() => {
        paletteItemRefs.current = [];
    }, [paletteResults]);
    useEffect(() => {
        listItemRefs.current = [];
    }, [results]);
    useEffect(() => {

        const container = listRef.current;
        const el = listItemRefs.current[activeIndex];

        if (!container || !el) return;

        el.focus();

        el.scrollIntoView({
            block: "nearest"
        });

    }, [activeIndex]);
    const inputSx = {
        "& .MuiInputBase-root": {
            fontFamily: "monospace",
            background: "#0b1117",
            border: "1px solid #1f2933"
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "0 !important"
        },
        "& .MuiInputBase-root.Mui-focused": {
            borderColor: "#58a6ff",
            boxShadow: "0 0 0 3px rgba(88,166,255,.12)"
        }
    };

    return (
        <Box sx={{mx: "auto", maxWidth: 1320, fontFamily: "monospace"}}>

            {/* Header */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Box>
                    <Typography sx={{color: "#8b949e", fontSize: "0.85rem"}}>
                        Search the knowledge base to discover protocols, formats, primitives and systems.
                    </Typography>
                    <Typography sx={{color: "#6b7785", fontSize: "0.72rem", mt: 0.4}}>
                        Click = include · Shift+Click = exclude
                    </Typography>
                </Box>

                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <Typography sx={{fontSize: "0.75rem", color: "#8b949e"}}>
                        Dense
                    </Typography>
                    <Switch
                        size="small"
                        checked={dense}
                        onChange={() => setDense(v => !v)}
                    />
                </Box>
            </Box>

            {/* Search */}

            <TextField
                fullWidth
                inputRef={searchRef}
                placeholder="/ focuses search, Cmd/Ctrl+K palette"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{mb: 2, ...inputSx}}
            />

            {/* Domain Filters */}

            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1, mb: 3}}>
                <Chip
                    key="clear-all"
                    label={
                        <IoMdNuclear
                            key="nuke-icon-clear"
                            style={{
                                color:
                                    includeDomains.length >= 1 ||
                                    excludeDomains.length >= 1 ||
                                    query.length >= 1
                                        ? "#ff2222"
                                        : "#fafafa",
                                fontSize: 16
                            }}
                        />
                    }
                    size="small"
                    onClick={() => {
                        setIncludeDomains([]);
                        setExcludeDomains([]);
                        setQuery("");
                    }}
                    sx={{
                        background: "#0d1a12",
                        border: "1px solid #1f2933",
                        cursor: "pointer",
                        transition: "all .12s ease",
                        "& .MuiChip-label": {
                            px: 1
                        },
                        "&:hover": {
                            borderColor: "#58a6ff",
                            color: "#ffffff"
                        }
                    }}
                />

                {domainList.map(domain => {
                    const included = includeDomains.includes(domain);
                    const excluded = excludeDomains.includes(domain);
                    const matchCount = domainMatches[domain] || 0;

                    return (
                        <Chip
                            key={domain}
                            label={`${domain} (${matchCount}/${domainTotals[domain] || 0})`}
                            size="small"
                            onClick={(e) => toggleDomain(domain, e.shiftKey)}
                            sx={{
                                background: included
                                    ? "#0d1a12"
                                    : excluded
                                        ? "#221012"
                                        : "#0b1117",

                                color: included
                                    ? "#c9f7d6"
                                    : excluded
                                        ? "#ff9b9b"
                                        : "#c9d1d9",

                                border: included
                                    ? "1px solid #00e676"
                                    : excluded
                                        ? "1px solid #ff4d4d"
                                        : "1px solid #1f2933",

                                cursor: "pointer",
                                transition: "all .12s ease",
                                opacity: matchCount > 0 ? "1" : "0.40",
                                "&:hover": {
                                    borderColor: "#58a6ff",
                                    background: "#0f1620",
                                    color: "#ffffff"
                                }
                            }}
                        />
                    );
                })}
            </Box>

            {/* Layout */}

            <Box sx={{display: "grid", gridTemplateColumns: "360px 1fr 260px", gap: 5}}>

                {/* List */}

                <Box
                    ref={listRef}
                    sx={{
                        borderRight: "1px solid #1f2933",
                        pr: 2,
                        maxHeight: "85vh",
                        overflowY: "auto"
                    }}
                >
                    {results.map((entry, i) => {
                        const selected = i === activeIndex;

                        return (
                            <Box
                                key={entry._key}
                                ref={el => listItemRefs.current[i] = el}
                                tabIndex={selected ? 0 : -1}
                                onClick={() => setActiveIndex(i)}
                                sx={{
                                    px: 2,
                                    py: dense ? 0.7 : 1.2,
                                    mb: 0.35,
                                    cursor: "pointer",
                                    borderLeft: selected
                                        ? "2px solid #00e676"
                                        : "2px solid transparent",
                                    background: selected
                                        ? "#0d1a12"
                                        : "transparent",
                                    transition: "background .12s",
                                    outline: "none",
                                    "&:hover": {background: "#0b1117"}
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: dense ? "0.8rem" : "0.9rem"
                                    }}
                                >
                                    {entry.term}&nbsp;
                                    <Typography
                                        component="span"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: dense ? "0.8rem" : "0.9rem",
                                            color: "#4d4d4d"
                                        }}
                                    />
                                    {entry.scope && `[${entry.scope}]`}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "0.75rem",
                                        color: "#8b949e",
                                        lineHeight: 1.4
                                    }}
                                >
                                    {entry.definition}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>

                {/* Inspector */}

                <Box
                    sx={{
                        position: "sticky",
                        top: 90,
                        maxHeight: "85vh",
                        overflowY: "auto"
                    }}
                >
                    {active && (
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 800,
                                    fontSize: "1.1rem",
                                    mb: 0.6
                                }}
                            >
                                {active.header.term}
                                {active.header.fullName && ` (${active.header.fullName})`}
                            </Typography>

                            {active.sections.map(section => {
                                const id = `${active.header.term}-${section.id}`;

                                return (
                                    <Box
                                        key={section.id}
                                        id={id}
                                        sx={{
                                            mb: 2,
                                            border: "1px solid #1f2933",
                                            background: "#0b1117"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                px: 2,
                                                py: 0.8,
                                                borderBottom: "1px solid #1f2933",
                                                display: "flex",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "0.72rem",
                                                    letterSpacing: 1,
                                                    color: "#58a6ff"
                                                }}
                                            >
                                                {section.title}
                                            </Typography>

                                            <Typography
                                                component="a"
                                                href={`#${id}`}
                                                sx={{
                                                    fontSize: "0.7rem",
                                                    color: "#8b949e",
                                                    textDecoration: "none"
                                                }}
                                            >
                                                #
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                px: 2,
                                                py: dense ? 0.9 : 1.3
                                            }}
                                        >
                                            {section.type === "text" && (
                                                <Typography
                                                    sx={{
                                                        fontSize: dense ? "0.83rem" : "0.92rem",
                                                        lineHeight: 1.65
                                                    }}
                                                >
                                                    {section.value}
                                                </Typography>
                                            )}

                                            {section.type === "list" && (
                                                <Box component="ul" sx={{pl: 2, m: 0}}>
                                                    {section.value.map((v, i) => (
                                                        <li key={i}>
                                                            <Typography
                                                                sx={{
                                                                    fontFamily: "monospace",
                                                                    textDecoration: "none",
                                                                    fontSize: dense ? "0.83rem" : "0.92rem",
                                                                    lineHeight: 1.65,
                                                                    display: "inline"
                                                                }}
                                                            >
                                                                {v}
                                                            </Typography>
                                                        </li>
                                                    ))}
                                                </Box>
                                            )}

                                            {section.type === "inline-list" && (
                                                <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
                                                    {section.value.map((v, i) => (
                                                        <Chip key={i} label={v} size="small"/>
                                                    ))}
                                                </Box>
                                            )}

                                            {section.type === "meta" && (
                                                <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
                                                    {section.value.kind && (
                                                        <Chip size="small" label={`kind: ${section.value.kind}`}/>
                                                    )}

                                                    {section.value.domain?.map((d) => {
                                                        const included = includeDomains.includes(d);
                                                        const excluded = excludeDomains.includes(d);

                                                        return (
                                                            <Chip
                                                                key={`domain-${d}`}
                                                                label={`#${d}`}
                                                                onClick={(e) => toggleDomain(d, e.shiftKey)}
                                                                size="small"
                                                                sx={{
                                                                    mb: 0.8,
                                                                    background: included
                                                                        ? "#0d1a12"
                                                                        : excluded
                                                                            ? "#221012"
                                                                            : "#0b1117",
                                                                    color: included
                                                                        ? "#c9f7d6"
                                                                        : excluded
                                                                            ? "#ff9b9b"
                                                                            : "#c9d1d9",
                                                                    border: included
                                                                        ? "1px solid #00e676"
                                                                        : excluded
                                                                            ? "1px solid #ff4d4d"
                                                                            : "1px solid #1f2933",
                                                                    fontFamily: "monospace",
                                                                    cursor: "pointer",
                                                                    "&:hover": {
                                                                        borderColor: "#58a6ff"
                                                                    }
                                                                }}
                                                            />
                                                        );
                                                    })}

                                                    {section.value.tags?.map((t) => (
                                                        <Chip key={`tag-${t}`} size="small" label={`${t}`}/>
                                                    ))}
                                                </Box>
                                            )}

                                            {section.type === "rfc-list" && (
                                                <Box component="ul" sx={{pl: 2, m: 0}}>
                                                    {section.value.map(rfc => (
                                                        <li key={rfc.id}>
                                                            <Typography
                                                                component="a"
                                                                href={rfcUrl(rfc.id)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                sx={{
                                                                    fontFamily: "monospace",
                                                                    color: "#58a6ff",
                                                                    textDecoration: "none",
                                                                    fontSize: dense ? "0.83rem" : "0.92rem",
                                                                    lineHeight: 1.65,
                                                                    display: "inline"
                                                                }}
                                                            >
                                                                {rfc.id}
                                                                <Typography
                                                                    component="span"
                                                                    sx={{
                                                                        fontSize: dense ? "0.83rem" : "0.92rem",
                                                                        lineHeight: 1.65
                                                                    }}
                                                                >
                                                                    : {rfc.title && rfc.title}
                                                                </Typography>
                                                            </Typography>
                                                        </li>
                                                    ))}
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    )}
                </Box>

                {/* Concept Graph */}

                <Box sx={{borderLeft: "1px solid #1f2933", pl: 2}}>
                    <Typography
                        sx={{
                            fontSize: "0.75rem",
                            letterSpacing: 1,
                            color: "#8b949e",
                            mb: 1
                        }}
                    >
                        CONCEPT GRAPH
                    </Typography>

                    {relations.map(r => (
                        <Chip
                            key={r._key}
                            label={r.term}
                            size="small"
                            onClick={() => {
                                setQuery(r.term);
                                setIncludeDomains([]);
                                setExcludeDomains([]);
                                setActiveIndex(0);
                            }}
                            sx={{
                                mb: 0.8,
                                background: "#0b1117",
                                border: "1px solid #1f2933",
                                fontFamily: "monospace",
                                cursor: "pointer",
                                "&:hover": {borderColor: "#58a6ff"}
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {/* Command Palette */}

            <Modal open={palette} onClose={() => setPalette(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "18%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 620,
                        background: "#0b1117",
                        border: "1px solid #1f2933",
                        boxShadow: "0 20px 80px rgba(0,0,0,.8)"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "1px solid #1f2933"
                        }}
                    >
                        <TextField
                            inputRef={paletteRef}
                            autoFocus
                            fullWidth
                            placeholder="Search knowledge..."
                            value={paletteQuery}
                            onChange={(e) => setPaletteQuery(e.target.value)}
                            sx={inputSx}
                        />

                        <IconButton onClick={() => setPalette(false)} size="small">
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </Box>

                    <Box ref={paletteListRef} sx={{maxHeight: 420, overflowY: "auto"}}>
                        {paletteResults.map((entry, i) => {
                            const selected = i === paletteIndex;

                            return (
                                <Box
                                    key={entry._key}
                                    ref={el => paletteItemRefs.current[i] = el}
                                    tabIndex={selected ? 0 : -1}
                                    onClick={() => {
                                        setQuery(entry.term);
                                        setPalette(false);
                                    }}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        cursor: "pointer",
                                        background: selected
                                            ? "#0d1a12"
                                            : "transparent",
                                        "&:hover": {background: "#0f1620"}
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "0.85rem",
                                            fontWeight: 700
                                        }}
                                    >
                                        {entry.term}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "0.72rem",
                                            color: "#8b949e"
                                        }}
                                    >
                                        {entry.definition}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}