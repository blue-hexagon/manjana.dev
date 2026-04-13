import React, {useMemo, useState} from "react"
import {Box, Typography, Chip, TextField} from "@mui/material"
import {Category, KNOWLEDGE_BASE, EntryType} from "../../content/log/record"
import CodeBlock from "../blog/CodeBlock"

const slugify = require("slugify")

function parseTimestamp(ts: string): number {
    return new Date(ts.replace(" CET", "")).getTime()
}

const TYPE_COLOR: Record<EntryType, string> = {
    pattern: "#3fb950",
    pitfall: "#f85149",
    diagnostic: "#58a6ff",
    trick: "#e3b341",
    "mental-model": "#8b5cf6",
}

export default function KnowledgeLog() {
    const [activeCategory, setActiveCategory] =
        useState<Category | "All">("All")

    const [activeIndex, setActiveIndex] = useState(0)
    const [query, setQuery] = useState("")

    const categories = useMemo(() => {
        const set = new Set<Category>()

        Object.values(KNOWLEDGE_BASE).forEach((e) =>
            set.add(e.category)
        )

        return ["All", ...Array.from(set)] as (Category | "All")[]
    }, [])

    const entries = useMemo(() => {
        const base = Object.values(KNOWLEDGE_BASE)
            .sort(
                (a, b) =>
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
                e.summary,
                e.explanation,
                e.notes,
                ...(e.codeBlocks?.map((b) => b.code) || []),
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
                <TextField
                    placeholder="search knowledge..."
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
                                    ? `3px solid ${TYPE_COLOR[e.type]}`
                                    : "3px solid transparent",
                            background:
                                activeIndex === i
                                    ? "#11161c"
                                    : "transparent",
                            "&:hover": {background: "#0f141a"},
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 11,
                                color: TYPE_COLOR[e.type],
                            }}
                        >
                            {e.type.toUpperCase()}
                        </Typography>

                        <Typography sx={{fontSize: 13}}>
                            {e.title}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 11,
                                color: "#8b949e",
                            }}
                        >
                            {e.summary}
                        </Typography>
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
                        No matching entry
                    </Box>
                ) : (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "baseline",
                            }}
                        >
                            <Typography
                                sx={{fontSize: 22, fontWeight: 600}}
                            >
                                {active.title}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 11,
                                    color: TYPE_COLOR[active.type],
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                }}
                            >
                                {active.type}
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                fontSize: 14,
                                color: "#8b949e",
                            }}
                        >
                            {active.summary}
                        </Typography>

                        {/* MULTI CODE BLOCKS (preferred) */}

                        {active.codeBlocks?.map((block, i) => (
                            <Group
                                key={slugify(block.label, {
                                    lower: true,
                                    strict: true,
                                }) ?? i}
                                label={
                                    block.label ??
                                    `SNIPPET ${i + 1}`
                                }
                            >
                                <CodeElement
                                    lang={block.language}
                                    value={block.code}
                                    id={slugify(block.label, {
                                        lower: true,
                                        strict: true,
                                    })}
                                />

                                {block.note && (
                                    <Typography
                                        sx={{
                                            fontSize: 12,
                                            color: "#8b949e",
                                        }}
                                    >
                                        {block.note}
                                    </Typography>
                                )}
                            </Group>
                        ))}

                        {active.explanation && (
                            <Group label="EXPLANATION">
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {active.explanation}
                                </Typography>
                            </Group>
                        )}

                        {active.notes && (
                            <Group label="NOTES">
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {active.notes}
                                </Typography>
                            </Group>
                        )}

                        {active.gotchas && (
                            <Group label="GOTCHAS">
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {active.gotchas}
                                </Typography>
                            </Group>
                        )}

                        {active.tags && (
                            <Box sx={{display: "flex", gap: 1}}>
                                {active.tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            fontSize: 10,
                                            background: "#0b0f14",
                                            border:
                                                "1px solid #1f2937",
                                            color: "#8b949e",
                                        }}
                                    />
                                ))}
                            </Box>
                        )}

                        {active.reference && (
                            <Typography
                                sx={{
                                    fontSize: 11,
                                    color: "#6e7681",
                                    whiteSpace: "pre-line",
                                }}
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

function Group({label, children}) {
    return (
        <Box
            sx={{
                px: 3,
                py: 2,
                background: "#0f141a",
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
                    color: "#58a6ff",
                }}
            >
                {label}
            </Typography>

            {children}
        </Box>
    )
}

function CodeElement({lang, value, id}) {
    const normalized = value.replace(/^\n+/, "") // 🔥 correct fix

    return (
        <CodeBlock
            language={lang}
            showLineNumbers={true}
            blockId={id}
            script={normalized}
        />
    )
}