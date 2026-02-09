import * as React from "react"
import {
    Box,
    Typography,
    Tooltip,
    Divider,
    Collapse,
    Button,
    ButtonGroup,
    Chip,
    Tabs,
    Tab,
    MenuItem,
    Select,
    Snackbar,
} from "@mui/material"

/* =========================
   Types
========================= */

type ByteGroup = 8 | 12 | 16
type ByteView = "hex" | "raw" | "map"

export interface EncodingScenario {
    id: string
    label: string
    source: string
    sourceEncoding: string
    sourceText: string
    bytes: string
    target: string
    targetEncoding: string
    targetText: string
    description?: string
}

interface EncodingBoundaryProps {
    scenarios: EncodingScenario[]
    initialScenarioId?: string
}

/* =========================
   Helpers
========================= */

interface ParsedByte {
    value: string
    valid: boolean
}

function parseHexBytes(bytes: string): ParsedByte[] {
    return bytes
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(p => ({
            value: p.toUpperCase(),
            valid: /^[0-9A-F]{2}$/.test(p),
        }))
}

function isPrintableAsciiChar(ch: string) {
    // classic printable ASCII range
    return ch.length === 1 && ch >= " " && ch <= "~"
}

function hexToDec(hex2: string): number | null {
    if (!/^[0-9A-F]{2}$/.test(hex2)) return null
    return parseInt(hex2, 16)
}

async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch {
        try {
            const ta = document.createElement("textarea")
            ta.value = text
            ta.style.position = "fixed"
            ta.style.left = "-9999px"
            document.body.appendChild(ta)
            ta.focus()
            ta.select()
            const ok = document.execCommand("copy")
            document.body.removeChild(ta)
            return ok
        } catch {
            return false
        }
    }
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n))
}

function rangeInclusive(a: number, b: number) {
    const lo = Math.min(a, b)
    const hi = Math.max(a, b)
    return { lo, hi }
}

/* =========================
   Component
========================= */

export default function EncodingBoundary({
    scenarios,
    initialScenarioId,
}: EncodingBoundaryProps) {
    const [scenarioId, setScenarioId] = React.useState<string | undefined>(
        initialScenarioId ?? scenarios[0]?.id
    )

    const scenario = React.useMemo(
        () => scenarios.find(s => s.id === scenarioId),
        [scenarios, scenarioId]
    )

    const [expanded, setExpanded] = React.useState(false)
    const [tab, setTab] = React.useState<0 | 1>(0)
    const [byteView, setByteView] = React.useState<ByteView>("hex")
    const [group, setGroup] = React.useState<ByteGroup>(16) // 16 feels “hex dump native”
    const [offsets, setOffsets] = React.useState(true) // offsets on by default for hex
    const [hoveredByte, setHoveredByte] = React.useState<number | null>(null)

    // selection: click / shift-click range
    const [selAnchor, setSelAnchor] = React.useState<number | null>(null)
    const [selFocus, setSelFocus] = React.useState<number | null>(null)

    const [toast, setToast] = React.useState<string | null>(null)

    // reset selection when switching scenarios
    React.useEffect(() => {
        setHoveredByte(null)
        setSelAnchor(null)
        setSelFocus(null)
    }, [scenarioId])

    if (!scenario) {
        return (
            <Box sx={{ p: 2, opacity: 0.6, fontFamily: "monospace" }}>
                No encoding scenario selected.
            </Box>
        )
    }

    const {
        source,
        sourceEncoding,
        sourceText,
        bytes,
        target,
        targetEncoding,
        targetText,
        description,
    } = scenario

    const differs = sourceText !== targetText
    const hex = React.useMemo(() => parseHexBytes(bytes), [bytes])
    const invalidCount = React.useMemo(() => hex.filter(b => !b.valid).length, [hex])

    const byteCount = hex.length
    const clampedHover = hoveredByte == null ? null : clamp(hoveredByte, 0, Math.max(0, byteCount - 1))

    const selection = React.useMemo(() => {
        if (selAnchor == null || selFocus == null) return null
        if (byteCount <= 0) return null
        const a = clamp(selAnchor, 0, byteCount - 1)
        const b = clamp(selFocus, 0, byteCount - 1)
        const { lo, hi } = rangeInclusive(a, b)
        return { lo, hi }
    }, [selAnchor, selFocus, byteCount])

    const hoveredMeta = React.useMemo(() => {
        if (clampedHover == null || byteCount === 0) return null
        const hb = hex[clampedHover]
        const ascii = targetText[clampedHover] ?? ""
        const dec = hb?.valid ? hexToDec(hb.value) : null
        return {
            index: clampedHover,
            offsetHex: clampedHover.toString(16).padStart(4, "0"),
            byteHex: hb?.valid ? hb.value : "??",
            byteDec: dec,
            ascii: ascii ? (isPrintableAsciiChar(ascii) ? ascii : "·") : "·",
            valid: hb?.valid ?? false,
        }
    }, [clampedHover, byteCount, hex, targetText])

    const selectionText = React.useMemo(() => {
        if (!selection) return null
        const slice = hex.slice(selection.lo, selection.hi + 1)

        const hexStr = slice.map(b => (b.valid ? b.value : "??")).join(" ")
        const asciiStr = Array.from({ length: slice.length }).map((_, i) => {
            const ch = targetText[selection.lo + i] ?? ""
            return ch && isPrintableAsciiChar(ch) ? ch : "·"
        }).join("")

        return { hexStr, asciiStr, len: slice.length }
    }, [selection, hex, targetText])

    const onByteClick = React.useCallback(
        (index: number, ev: React.MouseEvent) => {
            if (byteCount <= 0) return
            const idx = clamp(index, 0, byteCount - 1)

            // Shift+click extends selection
            if (ev.shiftKey && selAnchor != null) {
                setSelFocus(idx)
                return
            }

            // Normal click sets anchor+focus
            setSelAnchor(idx)
            setSelFocus(idx)
        },
        [byteCount, selAnchor]
    )

    const clearSelection = React.useCallback(() => {
        setSelAnchor(null)
        setSelFocus(null)
    }, [])

    const copySelection = React.useCallback(
        async (mode: "hex" | "ascii" | "both") => {
            if (!selectionText) return
            const payload =
                mode === "hex"
                    ? selectionText.hexStr
                    : mode === "ascii"
                        ? selectionText.asciiStr
                        : `HEX:\n${selectionText.hexStr}\n\nASCII:\n${selectionText.asciiStr}`

            const ok = await copyToClipboard(payload)
            setToast(ok ? "Copied selection" : "Copy failed")
        },
        [selectionText]
    )

    const isSelected = React.useCallback(
        (index: number) => {
            if (!selection) return false
            return index >= selection.lo && index <= selection.hi
        },
        [selection]
    )

    // sizing: fixed terminal-like cells, never stretch
    const HEX_CELL_W = "2.5ch"
    const ASCII_CELL_W = "1.2ch"
    const GAP_W = "0.5ch"

    return (
        <Box
            role="figure"
            sx={{
                my: 4,
                p: 3,
                borderRadius: 2,
                border: "1px solid #1f1f1f",
                background: "#0b0b0b",
                fontFamily: `'Fira Code', monospace`,
            }}
        >
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    {differs && (
                        <Tooltip title="Source and target differ">
                            <Chip
                                size="small"
                                label="diff"
                                onClick={() => {
                                    setExpanded(true)
                                    setTab(0)
                                }}
                                sx={{
                                    cursor: "pointer",
                                    bgcolor: "rgba(255,64,129,.15)",
                                    color: "#ff7aa7",
                                    fontSize: "0.7rem",
                                }}
                            />
                        </Tooltip>
                    )}

                    <Select
                        size="small"
                        value={scenarioId}
                        onChange={e => setScenarioId(e.target.value)}
                        sx={{ fontSize: "0.75rem", minWidth: 220 }}
                    >
                        {scenarios.map(s => (
                            <MenuItem key={s.id} value={s.id}>
                                {s.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                <Button
                    size="small"
                    onClick={() => setExpanded(v => !v)}
                    sx={{ fontSize: "0.7rem" }}
                >
                    {expanded ? "Exit inspector" : "Inspect encoding"}
                </Button>
            </Box>

            {/* Pipeline */}
            <Box sx={{ display: "grid", gap: 2 }}>
                {/* Source */}
                <Box>
                    <Typography sx={{ color: "#00ffcc", fontSize: ".8rem" }}>
                        {source} · {sourceEncoding}
                    </Typography>
                    <Typography sx={{ fontSize: "1.05rem" }}>{sourceText}</Typography>
                </Box>

                {/* Boundary */}
                <Divider sx={{ opacity: 0.2 }}>
                    <Typography
                        sx={{
                            mt: "3px",
                            fontSize: ".85rem",
                            opacity: 1,
                            letterSpacing: ".2em",
                        }}
                    >
                        ⇢ ENCODING BOUNDARY ⇢
                    </Typography>
                </Divider>

                {/* Bytes */}
                <Box
                    sx={{
                        textAlign: "center",
                        cursor: "pointer",
                        opacity: 0.85,
                        transition: "opacity .15s",
                        "&:hover": { opacity: 1 },
                    }}
                    onClick={() => {
                        setExpanded(true)
                        setTab(1)
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: ".8rem",
                            letterSpacing: ".15em",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                        title={bytes}
                    >
                        {bytes}
                    </Typography>
                    <Typography sx={{ fontSize: ".65rem", opacity: 0.5 }}>
                        byte stream · click to inspect
                        {invalidCount > 0 && ` · ${invalidCount} invalid`}
                        {byteCount > 0 && ` · ${byteCount} bytes`}
                    </Typography>
                </Box>

                {/* Target */}
                <Box sx={{ textAlign: "right" }}>
                    <Typography sx={{ color: "#ff4081", fontSize: ".8rem" }}>
                        {target} · {targetEncoding}
                    </Typography>
                    <Typography sx={{ fontSize: "1.05rem" }}>{targetText}</Typography>
                </Box>
            </Box>

            {/* Inspector */}
            <Collapse in={expanded}>
                <Box
                    sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.02)",
                        borderRadius: 1,
                    }}
                >
                    <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
                        <Tab label="Before / After" />
                        <Tab label="Byte Transformed" />
                    </Tabs>

                    {/* Text tab */}
                    {tab === 0 && (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 2,
                                mt: 1,
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontSize: ".7rem", opacity: 0.6, mb: 0.5, ml:0.8 }}>
                                    sourceText
                                </Typography>
                                <Box
                                    component="pre"
                                    sx={{
                                        m: 0,
                                        p: 1,
                                        borderRadius: 0,
                                        background: "rgba(50,50,50,0.25)",
                                        overflowX: "auto",
                                    }}
                                >
                                    {sourceText}
                                </Box>
                            </Box>

                            <Box>
                                <Typography sx={{ fontSize: ".7rem", opacity: 0.6, mb: 0.5, ml:0.8 }}>
                                    targetText
                                </Typography>
                                <Box
                                    component="pre"
                                    sx={{
                                        m: 0,
                                        p: 1,
                                        borderRadius: 0,
                                        background: "rgba(50,50,50,0.25)",
                                        overflowX: "auto",
                                    }}
                                >
                                    {targetText}
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {/* Bytes tab */}
                    {tab === 1 && (
                        <Box sx={{ mt: 1 }}>
                            <Tabs value={byteView} onChange={(_, v) => setByteView(v)} sx={{ mb: 1 }}>
                                <Tab value="hex" label="Hex" />
                                <Tab value="raw" label="Raw" />
                                <Tab value="map" label="Map" />
                            </Tabs>

                            {/* =========================
                                HEX VIEW — upgraded UX
                            ========================= */}
                            {byteView === "hex" && (
                                <Box>
                                    {/* Sticky toolbar + status line */}
                                    <Box
                                        sx={{
                                            position: "sticky",
                                            top: 0,
                                            zIndex: 2,
                                            backdropFilter: "blur(8px)",
                                            background: "rgba(11,11,11,0.85)",
                                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                                            pb: 1,
                                            mb: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: 1,
                                                pt: 0.5,
                                            }}
                                        >
                                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                                <ButtonGroup size="small">
                                                    {[8, 12, 16].map(n => (
                                                        <Button
                                                            key={n}
                                                            onClick={() => setGroup(n as ByteGroup)}
                                                            sx={{
                                                                color: group === n ? "#00ffcc" : "#ccc",
                                                            }}
                                                        >
                                                            {n}
                                                        </Button>
                                                    ))}
                                                </ButtonGroup>

                                                <Button size="small" onClick={() => setOffsets(o => !o)}>
                                                    offsets {offsets ? "on" : "off"}
                                                </Button>

                                                {selection && selectionText ? (
                                                    <Tooltip title="Clear selection">
                                                        <Button size="small" onClick={clearSelection}>
                                                            clear
                                                        </Button>
                                                    </Tooltip>
                                                ) : (
                                                    <Typography sx={{ fontSize: ".7rem", opacity: 0.5 }}>
                                                        click to select · shift+click for range
                                                    </Typography>
                                                )}
                                            </Box>

                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <Button
                                                    size="small"
                                                    disabled={!selectionText}
                                                    onClick={() => copySelection("hex")}
                                                >
                                                    copy hex
                                                </Button>
                                                <Button
                                                    size="small"
                                                    disabled={!selectionText}
                                                    onClick={() => copySelection("ascii")}
                                                >
                                                    copy ascii
                                                </Button>
                                                <Button
                                                    size="small"
                                                    disabled={!selectionText}
                                                    onClick={() => copySelection("both")}
                                                >
                                                    copy both
                                                </Button>
                                            </Box>
                                        </Box>

                                        {/* Status line */}
                                        <Box
                                            sx={{
                                                mt: 1,
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: 2,
                                                fontSize: ".7rem",
                                                opacity: 0.75,
                                            }}
                                        >
                                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                                {hoveredMeta ? (
                                                    <>
                                                        <span>offset 0x{hoveredMeta.offsetHex}</span>
                                                        <span>hex {hoveredMeta.byteHex}</span>
                                                        <span>
                                                            dec{" "}
                                                            {hoveredMeta.byteDec != null
                                                                ? hoveredMeta.byteDec
                                                                : "—"}
                                                        </span>
                                                        <span>ascii {hoveredMeta.ascii}</span>
                                                        {!hoveredMeta.valid && (
                                                            <span style={{ color: "#ff6b6b" }}>invalid</span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span>hover a byte for details</span>
                                                )}
                                            </Box>

                                            <Box sx={{ textAlign: "right", opacity: 0.8 }}>
                                                {selectionText ? (
                                                    <span>
                                                        selection: {selectionText.len} bytes · [0x
                                                        {selection!.lo.toString(16).padStart(4, "0")}..0x
                                                        {selection!.hi.toString(16).padStart(4, "0")}]
                                                    </span>
                                                ) : (
                                                    <span />
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* Hex grid (terminal-stable, never stretches) */}
                                    <Box
                                        sx={{
                                            fontSize: ".78rem",
                                            overflowX: "auto",
                                            maxWidth: "100%",
                                            whiteSpace: "nowrap",
                                            pb: 0.5,
                                        }}
                                    >
                                        {Array.from({ length: Math.ceil(hex.length / group) }).map(
                                            (_, row) => {
                                                const rowStart = row * group
                                                const slice = hex.slice(rowStart, rowStart + group)

                                                return (
                                                    <Box
                                                        key={row}
                                                        sx={{
                                                            display: "grid",
                                                            gridTemplateColumns: offsets ? "76px auto auto" : "auto auto",
                                                            gap: 2,
                                                            alignItems: "center",
                                                            py: 0.25,
                                                            minWidth: "fit-content",
                                                            "&:hover": {
                                                                background: "rgba(255,255,255,0.03)",
                                                            },
                                                        }}
                                                    >
                                                        {/* Offset (sticky-ish column feel) */}
                                                        {offsets && (
                                                            <Box
                                                                sx={{
                                                                    opacity: 0.6,
                                                                    position: "sticky",
                                                                    left: 0,
                                                                    zIndex: 1,
                                                                    background: "#0b0b0b",
                                                                    pr: 1,
                                                                }}
                                                            >
                                                                {rowStart.toString(16).padStart(4, "0")}
                                                            </Box>
                                                        )}

                                                        {/* HEX cells */}
                                                        <Box
                                                            sx={{
                                                                display: "grid",
                                                                gridTemplateColumns: `repeat(${group}, ${HEX_CELL_W})`,
                                                                columnGap: GAP_W,
                                                                // subtle grouping: add breathing room every 4 bytes
                                                                "& > *:nth-of-type(4n)": {
                                                                    marginRight: "0.6ch",
                                                                },
                                                            }}
                                                        >
                                                            {slice.map((b, i) => {
                                                                const index = rowStart + i
                                                                const hovered = clampedHover === index
                                                                const selected = isSelected(index)
                                                                const anchor = selAnchor === index

                                                                return (
                                                                    <Box
                                                                        key={index}
                                                                        onMouseEnter={() => setHoveredByte(index)}
                                                                        onMouseLeave={() => setHoveredByte(null)}
                                                                        onClick={ev => onByteClick(index, ev)}
                                                                        sx={{
                                                                            textAlign: "center",
                                                                            padding: "2px 0",
                                                                            borderRadius: "3px",
                                                                            cursor: "default",
                                                                            userSelect: "none",
                                                                            background: selected
                                                                                ? "rgba(255,64,129,0.18)"
                                                                                : hovered
                                                                                    ? "rgba(0,255,204,0.15)"
                                                                                    : "transparent",
                                                                            outline: anchor ? "1px solid rgba(255,64,129,0.55)" : "none",
                                                                            color: b.valid ? "#fff" : "#ff6b6b",
                                                                            transition: "background .12s, outline .12s",
                                                                        }}
                                                                    >
                                                                        {b.valid ? b.value : "??"}
                                                                    </Box>
                                                                )
                                                            })}
                                                        </Box>

                                                        {/* ASCII gutter */}
                                                        <Box
                                                            sx={{
                                                                display: "grid",
                                                                gridTemplateColumns: `repeat(${group}, ${ASCII_CELL_W})`,
                                                                columnGap: GAP_W,
                                                                opacity: 0.75,
                                                                "& > *:nth-of-type(4n)": {
                                                                    marginRight: "0.6ch",
                                                                },
                                                            }}
                                                        >
                                                            {slice.map((_, i) => {
                                                                const index = rowStart + i
                                                                const ch = targetText[index] ?? ""
                                                                const printable = ch && isPrintableAsciiChar(ch)
                                                                const hovered = clampedHover === index
                                                                const selected = isSelected(index)
                                                                const anchor = selAnchor === index

                                                                return (
                                                                    <Box
                                                                        key={index}
                                                                        onMouseEnter={() => setHoveredByte(index)}
                                                                        onMouseLeave={() => setHoveredByte(null)}
                                                                        onClick={ev => onByteClick(index, ev)}
                                                                        sx={{
                                                                            textAlign: "center",
                                                                            borderRadius: "3px",
                                                                            userSelect: "none",
                                                                            background: selected
                                                                                ? "rgba(255,64,129,0.14)"
                                                                                : hovered
                                                                                    ? "rgba(0,255,204,0.10)"
                                                                                    : "transparent",
                                                                            outline: anchor ? "1px solid rgba(255,64,129,0.45)" : "none",
                                                                            transition: "background .12s, outline .12s",
                                                                        }}
                                                                    >
                                                                        {printable ? ch : "·"}
                                                                    </Box>
                                                                )
                                                            })}
                                                        </Box>
                                                    </Box>
                                                )
                                            }
                                        )}
                                    </Box>
                                </Box>
                            )}

                            {/* RAW VIEW */}
                            {byteView === "raw" && (
                                <Box
                                    component="pre"
                                    sx={{
                                        m: 0,
                                        p: 1,
                                        borderRadius: 1,
                                        background: "rgba(0,0,0,0.25)",
                                        overflowX: "auto",
                                        fontSize: ".78rem",
                                    }}
                                >
                                    {bytes}
                                </Box>
                            )}

                            {/* MAP VIEW */}
                            {byteView === "map" && (
                                <>
                                    <Typography sx={{ fontSize: ".65rem", opacity: 0.6, mb: 1 }}>
                                        Byte-to-character mapping is approximate for multibyte encodings
                                    </Typography>

                                    <Box sx={{ fontSize: ".78rem" }}>
                                        {hex.map((b, i) => {
                                            const hovered = clampedHover === i
                                            const selected = isSelected(i)

                                            return (
                                                <Box
                                                    key={i}
                                                    onMouseEnter={() => setHoveredByte(i)}
                                                    onMouseLeave={() => setHoveredByte(null)}
                                                    onClick={ev => onByteClick(i, ev)}
                                                    sx={{
                                                        display: "grid",
                                                        gridTemplateColumns: "70px 70px 1fr",
                                                        gap: 1,
                                                        py: 0.2,
                                                        px: 0.5,
                                                        borderRadius: 1,
                                                        background: selected
                                                            ? "rgba(255,64,129,0.14)"
                                                            : hovered
                                                                ? "rgba(0,255,204,0.08)"
                                                                : "transparent",
                                                        opacity: b.valid ? 0.9 : 0.5,
                                                        transition: "background .12s",
                                                        userSelect: "none",
                                                    }}
                                                >
                                                    <span>{i.toString(16).padStart(4, "0")}</span>
                                                    <span style={{ color: b.valid ? "#fff" : "#ff6b6b" }}>
                                                        {b.valid ? b.value : "??"}
                                                    </span>
                                                    <span>{targetText[i] ?? "·"}</span>
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            </Collapse>

            {description && (
                <Typography sx={{ mt: 2, fontSize: ".75rem", opacity: 0.6 }}>
                    {description}
                </Typography>
            )}

            <Snackbar
                open={!!toast}
                autoHideDuration={1400}
                onClose={() => setToast(null)}
                message={toast ?? ""}
            />
        </Box>
    )
}
