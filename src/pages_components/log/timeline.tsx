import React, {useMemo, useState} from "react"
import {Box, Typography, Chip, TextField} from "@mui/material"
import {Category, RESEARCH_LOG} from "../../content/log/record"

function parseTimestamp(ts: string): number {
    return new Date(ts.replace(" CET", "")).getTime()
}

const STATUS = {
    validated: "#3fb950",
    hypothesis: "#58a6ff",
    falsified: "#f85149",
}

export default function ResearchLog() {
    const [activeCategory, setActiveCategory] =
        useState<Category | "All">("All")
    const [activeIndex, setActiveIndex] = useState(0)
    const [query, setQuery] = useState("")

    const categories = useMemo(() => {
        const set = new Set<Category>()
        Object.values(RESEARCH_LOG).forEach((e) =>
            set.add(e.category)
        )
        return ["All", ...Array.from(set)] as (Category | "All")[]
    }, [])

    const entries = useMemo(() => {
        const base = Object.values(RESEARCH_LOG)
            .sort((a, b) =>
                parseTimestamp(b.timestamp) -
                parseTimestamp(a.timestamp)
            )
            .filter((e) =>
                activeCategory === "All"
                    ? true
                    : e.category === activeCategory
            )

        if (!query.trim()) return base

        const q = query.toLowerCase()

        return base.filter((e) =>
            [
                e.title,
                e.trigger,
                e.insight,
                e.model,
                e.prediction,
                ...(e.signals || []),
                ...(e.tags || []),
            ]
                .join(" ")
                .toLowerCase()
                .includes(q)
        )
    }, [activeCategory, query])

    const active =
        entries.length > 0
            ? entries[Math.min(activeIndex, entries.length - 1)]
            : null

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "360px 1fr",
                height: "100%",
                color: "#e6edf3",
                fontFamily: `"Fira Code", monospace`,
            }}
        >
            {/* LEFT PANEL */}
            <Box
                sx={{
                    borderRight: "1px solid #1f2937",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    overflowY: "auto",
                }}
            >
                {/* SEARCH */}
                <TextField
                    placeholder="search models..."
                    size="small"
                    fullWidth
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setActiveIndex(0)
                    }}
                    sx={{
                        mb: 2,
                        input: {fontSize: 12, color: "#e6edf3"},
                        "& .MuiOutlinedInput-root": {
                            background: "#0f141a",
                            "& fieldset": {borderColor: "#1f2937"},
                            "&:hover fieldset": {borderColor: "#30363d"},
                            "&.Mui-focused fieldset": {
                                borderColor: "#58a6ff",
                            },
                        },
                    }}
                />

                {/* FILTERS */}
                <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
                    {categories.map((cat) => (
                        <Chip
                            key={cat}
                            label={cat}
                            size="small"
                            onClick={() => {
                                setActiveCategory(cat)
                                setActiveIndex(0)
                            }}
                            sx={{
                                fontSize: 10,
                                background:
                                    activeCategory === cat
                                        ? "#161b22"
                                        : "transparent",
                                color:
                                    activeCategory === cat
                                        ? "#58a6ff"
                                        : "#8b949e",
                                border: "1px solid #1f2937",
                            }}
                        />
                    ))}
                </Box>

                {/* ENTRY LIST */}
                {entries.map((e, i) => (
                    <Box
                        key={e.id}
                        onClick={() => setActiveIndex(i)}
                        sx={{
                            px: 2,
                            py: 1.5,
                            cursor: "pointer",
                            borderLeft:
                                activeIndex === i
                                    ? `3px solid ${STATUS[e.status]}`
                                    : "3px solid transparent",
                            background:
                                activeIndex === i
                                    ? "#11161c"
                                    : "transparent",
                            "&:hover": {background: "#0f141a"},
                        }}
                    >
                        <Typography
                            sx={{fontSize: 11, color: STATUS[e.status]}}
                        >
                            {e.status.toUpperCase()}
                        </Typography>

                        <Typography sx={{fontSize: 13}}>
                            {e.title}
                        </Typography>

                        {e.insight && (
                            <Typography
                                sx={{fontSize: 11, color: "#3fb950"}}
                            >
                                {e.insight}
                            </Typography>
                        )}
                    </Box>
                ))}
            </Box>

            {/* RIGHT PANEL */}
            <Box
                sx={{
                    p: 5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    overflowY: "auto",
                }}
            >
                {!active ? (
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#6e7681",
                            fontSize: 13,
                        }}
                    >
                        No matching experiments
                    </Box>
                ) : (
                    <>
                        {/* HEADER */}
                        <Typography sx={{fontSize: 22, fontWeight: 600}}>
                            {active.title}
                        </Typography>

                        {active.trigger && (
                            <Typography sx={{fontSize: 13, color: "#e3b341"}}>
                                {active.trigger}
                            </Typography>
                        )}

                        {/* MODEL LAYER */}
                        <Group label="MODEL LAYER">
                            {active.model && (
                                <Flow label="MODEL" value={active.model}/>
                            )}
                            {active.prediction && (
                                <Flow label="PREDICTION" value={active.prediction}/>
                            )}
                            {active.test?.setup && (
                                <Flow label="SETUP" value={active.test.setup}/>
                            )}
                            {active.test?.command && (
                                <CodeBlock
                                    label="COMMAND"
                                    value={active.test.command}
                                />
                            )}
                        </Group>

                        {/* TRUTH LAYER */}
                        <Group label="TRUTH" highlight>
                            {active.result && (
                                <ResultBlock value={active.result}/>
                            )}

                            {active.signals?.length > 0 && (
                                <SignalStrip signals={active.signals}/>
                            )}

                            {active.conclusion && (
                                <Flow
                                    label="CONCLUSION"
                                    value={active.conclusion}
                                />
                            )}

                            {active.edgeCase && (
                                <Flow label="EDGE" value={active.edgeCase}/>
                            )}

                            {active.counterEvidence && (
                                <Flow
                                    label="COUNTER"
                                    value={active.counterEvidence}
                                />
                            )}

                            {active.confidence !== undefined && (
                                <Confidence
                                    value={active.confidence}
                                    status={active.status}
                                />
                            )}
                        </Group>

                        {/* ACTION LAYER */}
                        {active.nextSteps && (
                            <Group label="NEXT">
                                {active.nextSteps.goal && (
                                    <Typography sx={{fontSize: 13}}>
                                        {active.nextSteps.goal}
                                    </Typography>
                                )}

                                {active.nextSteps.steps?.map((s, i) => (
                                    <Typography key={i} sx={{fontSize: 12}}>
                                        ▸ {s}
                                    </Typography>
                                ))}
                            </Group>
                        )}

                        {active.reference && (
                            <Typography
                                sx={{fontSize: 11, color: "#6e7681"}}
                            >
                                {active.reference}
                            </Typography>
                        )}
                    </>
                )}
            </Box>
        </Box>
    )
}

/* ---------- COMPONENTS ---------- */

function Group({label, children, highlight = false}) {
    return (
        <Box
            sx={{
                px: 3,
                py: 2,
                background: highlight ? "#0f1a12" : "#0f141a",
                border: "1px solid #1f2937",
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
            }}
        >
            <Typography
                sx={{
                    fontSize: 11,
                    letterSpacing: 1.2,
                    color: highlight ? "#3fb950" : "#58a6ff",
                }}
            >
                {label}
            </Typography>

            {children}
        </Box>
    )
}

function Flow({label, value}) {
    return (
        <Typography sx={{fontSize: 13}}>
            <span style={{color: "#58a6ff"}}>{label}:</span>{" "}
            {value}
        </Typography>
    )
}

function CodeBlock({label, value}) {
    return (
        <Box>
            <Typography sx={{fontSize: 11, color: "#8b5cf6"}}>
                {label}
            </Typography>
            <Box
                sx={{
                    mt: 0.5,
                    px: 2,
                    py: 1.5,
                    background: "#0b0f14",
                    border: "1px solid #1f2937",
                    fontSize: 12,
                    whiteSpace: "pre-wrap",
                }}
            >
                {value}
            </Box>
        </Box>
    )
}

function ResultBlock({value}) {
    return (
        <Box
            sx={{
                px: 2,
                py: 1.5,
                borderLeft: "4px solid #3fb950",
                background: "rgba(63,185,80,0.08)",
                boxShadow:
                    "inset 0 0 0 1px rgba(63,185,80,0.15)",
            }}
        >
            <Typography sx={{fontSize: 11, color: "#3fb950"}}>
                RESULT
            </Typography>
            <Typography sx={{fontSize: 14, color: "#3fb950"}}>
                {value}
            </Typography>
        </Box>
    )
}

function SignalStrip({signals}) {
    return (
        <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
            {signals.map((s) => (
                <Box
                    key={s}
                    sx={{
                        px: 1.5,
                        py: 0.5,
                        fontSize: 11,
                        background: "#0b0f14",
                        border: "1px solid #1f2937",
                        borderRadius: 1,
                        color: "#8b949e",
                    }}
                >
                    {s}
                </Box>
            ))}
        </Box>
    )
}

function Confidence({value, status}) {
    return (
        <Box>
            <Typography sx={{fontSize: 11, color: "#6e7681"}}>
                CONFIDENCE
            </Typography>

            <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                <Box sx={{flex: 1, height: 6, background: "#161b22"}}>
                    <Box
                        sx={{
                            width: `${value * 100}%`,
                            height: "100%",
                            background: STATUS[status],
                        }}
                    />
                </Box>

                <Typography sx={{fontSize: 12}}>
                    {(value * 100).toFixed(0)}%
                </Typography>
            </Box>
        </Box>
    )
}