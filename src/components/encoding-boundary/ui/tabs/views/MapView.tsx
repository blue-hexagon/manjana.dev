import * as React from "react"
import {Box, Typography, Chip, Tooltip} from "@mui/material"
import type {ParsedByte} from "../../../types"
import {decodeBytes, hexToBytes} from "../../../utils/bytes"

/* =========================================================
   Option B: Byte-anchored "drift" view (Normalization boundary)
   - Normalization is NOT an encoding.
   - We decode once, normalize string, then (optionally) re-encode to UTF-8
   - We render a mapping table per decoded character-span (token), not per byte.
   - This stays honest even when NFD expands bytes / changes boundaries.
========================================================= */

type NormForm = "NFC" | "NFD" | "NFKC" | "NFKD"

const GraphemeSegmenter =
    typeof Intl !== "undefined" && "Segmenter" in Intl
        ? new (Intl as any).Segmenter("en", {granularity: "grapheme"})
        : null

function buildGraphemeRowsFromText(text: string) {
    GraphemeSegmenter
    if (!GraphemeSegmenter) return []

    return Array.from(GraphemeSegmenter.segment(text)).map((s: any, i: number) => ({

        index: i,
        grapheme: s.segment,
        nfc: s.segment.normalize("NFC"),
        nfd: s.segment.normalize("NFD"),
    }))
}

function normalizeLabel(form: NormForm) {
    switch (form) {
        case "NFC":
            return "Unicode normalize(NFC)"
        case "NFD":
            return "Unicode normalize(NFD)"
        case "NFKC":
            return "Unicode normalize(NFKC)"
        case "NFKD":
            return "Unicode normalize(NFKD)"
    }
}

function parseNormForm(s: string): NormForm | null {
    const up = (s || "").toUpperCase()
    if (up.includes("NFC")) return "NFC"
    if (up.includes("NFD")) return "NFD"
    if (up.includes("NFKC")) return "NFKC"
    if (up.includes("NFKD")) return "NFKD"
    return null
}

function isUtf8Encoding(enc: string) {
    const e = (enc || "").toLowerCase().trim()
    return e === "utf-8" || e === "utf8"
}

function formatHexByte(b: number) {
    return b.toString(16).toUpperCase().padStart(2, "0")
}

function formatHexBytes(bytes: Uint8Array) {
    return Array.from(bytes).map(formatHexByte).join(" ")
}

function safeDecode(bytes: Uint8Array, encoding: string): string {
    try {
        return decodeBytes(bytes, encoding)
    } catch {
        // last-resort: UTF-8 replacement decoding
        try {
            return new TextDecoder("utf-8", {fatal: false}).decode(bytes)
        } catch {
            return ""
        }
    }
}

function utf8CharLen(bytes: Uint8Array, i: number) {
    const b0 = bytes[i]
    let len =
        b0 < 0x80
            ? 1
            : (b0 & 0xe0) === 0xc0
                ? 2
                : (b0 & 0xf0) === 0xe0
                    ? 3
                    : (b0 & 0xf8) === 0xf0
                        ? 4
                        : 1

    if (i + len > bytes.length) len = 1
    return len
}

function encodeUtf8(str: string): Uint8Array {
    return new TextEncoder().encode(str)
}

function isCombiningMark(codePoint: number) {
    // General combining diacritic blocks (not exhaustive, but good enough for UX labeling)
    return (
        (codePoint >= 0x0300 && codePoint <= 0x036f) ||
        (codePoint >= 0x1ab0 && codePoint <= 0x1aff) ||
        (codePoint >= 0x1dc0 && codePoint <= 0x1dff) ||
        (codePoint >= 0x20d0 && codePoint <= 0x20ff) ||
        (codePoint >= 0xfe20 && codePoint <= 0xfe2f)
    )
}

function classifyChar(s: string) {
    if (!s) return "empty"
    const cp = s.codePointAt(0) ?? 0
    if (s === "\uFFFD") return "replacement"
    if (isCombiningMark(cp)) return "combining"
    if (cp < 0x20 || cp === 0x7f) return "control"
    return "char"
}

type TokenRow = {
    srcStart: number
    srcEndExclusive: number
    srcBytes: Uint8Array
    srcChar: string
    srcCharKind: string

    // normalized output for the *same logical token*
    outChar: string
    outBytes: Uint8Array
    outCharKind: string

    // drift diagnostics
    byteDelta: number // outBytes.length - srcBytes.length
    changed: boolean // srcChar !== outChar
}

function buildUtf8TokensWithNormalization(
    srcBytes: Uint8Array,
    norm: NormForm
): TokenRow[] {
    // Decode per UTF-8 character span (byte-anchored)
    const td = new TextDecoder("utf-8", {fatal: true})
    const rows: TokenRow[] = []

    for (let i = 0; i < srcBytes.length;) {
        const len = utf8CharLen(srcBytes, i)
        const slice = srcBytes.slice(i, i + len)

        let srcChar = ""
        let srcCharKind = "char"
        try {
            srcChar = td.decode(slice)
        } catch {
            srcChar = "\uFFFD"
            srcCharKind = "replacement"
        }

        // Normalize per *token* (character); this is intentional:
        // it makes drift visible at boundaries even without normalizing the entire string.
        const outChar = (srcChar || "").normalize(norm)
        const outBytes = encodeUtf8(outChar)

        const outCharKind = classifyChar(outChar)
        const changed = srcChar !== outChar
        const byteDelta = outBytes.length - slice.length

        rows.push({
            srcStart: i,
            srcEndExclusive: i + len,
            srcBytes: slice,
            srcChar,
            srcCharKind,

            outChar,
            outBytes,
            outCharKind,

            byteDelta,
            changed,
        })

        i += len
    }

    return rows
}

function buildWrongDecodePerByte(bytes: Uint8Array, encoding: string) {
    // Byte-aware display for *encodings* (not normalization)
    const display = Array(bytes.length).fill("·")
    const lead = Array(bytes.length).fill(false)
    const leadChar = Array<string | null>(bytes.length).fill(null)

    const enc = (encoding || "").toLowerCase()
    const isUtf8 = enc === "utf-8" || enc === "utf8"

    if (!isUtf8) {
        for (let i = 0; i < bytes.length; i++) {
            try {
                const ch = decodeBytes(bytes.slice(i, i + 1), encoding)
                display[i] = ch || "·"
                lead[i] = true
                leadChar[i] = ch || null
            } catch {
                display[i] = "·"
                lead[i] = true
                leadChar[i] = null
            }
        }
        return {display, lead, leadChar}
    }

    // UTF-8 decoding per character span (fatal true to avoid hiding invalid sequences)
    const td = new TextDecoder("utf-8", {fatal: true})
    for (let i = 0; i < bytes.length;) {
        const len = utf8CharLen(bytes, i)
        const slice = bytes.slice(i, i + len)
        try {
            const ch = td.decode(slice)
            display[i] = ch
            lead[i] = true
            leadChar[i] = ch
            for (let k = 1; k < len; k++) {
                display[i + k] = "↳"
                lead[i + k] = false
                leadChar[i + k] = null
            }
        } catch {
            display[i] = "\uFFFD"
            lead[i] = true
            leadChar[i] = null
        }
        i += len
    }

    return {display, lead, leadChar}
}

function BytePills(props: {
    bytes: Uint8Array
    onClick?: (byteIndexWithinRow: number, ev: React.MouseEvent) => void
    muted?: boolean
    title?: string
}) {
    const {bytes, onClick, muted, title} = props

    return (
        <Box
            title={title}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                alignItems: "center",
                opacity: muted ? 0.7 : 1,
            }}
        >
            {Array.from(bytes).map((b, idx) => (
                <Box
                    key={idx}
                    onClick={onClick ? (ev) => onClick(idx, ev) : undefined}
                    sx={{
                        fontFamily: `'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
                        fontSize: ".78rem",
                        px: 0.65,
                        py: 0.2,
                        borderRadius: 1,
                        cursor: onClick ? "pointer" : "default",
                        userSelect: "none",
                        border: "1px solid rgba(255,255,255,0.10)",
                        background: "rgba(255,255,255,0.04)",
                        "&:hover": onClick
                            ? {
                                background: "rgba(0,255,204,0.12)",
                                borderColor: "rgba(0,255,204,0.25)",
                            }
                            : undefined,
                    }}
                >
                    {formatHexByte(b)}
                </Box>
            ))}
            {bytes.length === 0 ? <span style={{opacity: 0.6}}>∅</span> : null}
        </Box>
    )
}

function DriftChip(props: { delta: number; changed: boolean }) {
    const {delta, changed} = props
    const label =
        delta === 0 ? (changed ? "mutated" : "same") : delta > 0 ? `+${delta} bytes` : `${delta} bytes`

    const tone =
        delta === 0
            ? changed
                ? "rgba(255,204,0,0.22)"
                : "rgba(255,255,255,0.10)"
            : delta > 0
                ? "rgba(255,64,129,0.22)"
                : "rgba(122,162,255,0.22)"

    const border =
        delta === 0
            ? changed
                ? "rgba(255,204,0,0.35)"
                : "rgba(255,255,255,0.16)"
            : delta > 0
                ? "rgba(255,64,129,0.35)"
                : "rgba(122,162,255,0.35)"

    return (
        <Chip
            size="small"
            label={label}
            sx={{
                height: 20,
                fontSize: ".68rem",
                borderRadius: 1.2,
                background: tone,
                border: `1px solid ${border}`,
                color: "#fff",
                ml: 1,
            }}
        />
    )
}

/* =========================================================
   Component
========================================================= */

export function MapView(props: {
    hex: ParsedByte[]
    hexString: string
    sourceEncoding: string
    targetEncoding: string
    hoveredIndex: number | null
    setHoveredIndex: (i: number | null) => void
    onByteClick: (i: number, ev: React.MouseEvent) => void
    isSelected: (i: number) => boolean
}) {
    const {
        hex,
        hexString,
        sourceEncoding,
        targetEncoding,
        hoveredIndex,
        setHoveredIndex,
        onByteClick,
        isSelected,
    } = props

    const bytes = React.useMemo(() => hexToBytes(hexString), [hexString])

    const norm = React.useMemo(() => parseNormForm(targetEncoding), [targetEncoding])

    const canDoDrift =
        norm != null && isUtf8Encoding(sourceEncoding) // keep it honest; normalization requires decoded Unicode

    const decodedText = React.useMemo(() => safeDecode(bytes, sourceEncoding), [bytes, sourceEncoding])
    const [lens, setLens] = React.useState<"bytes" | "graphemes">("bytes")
    const graphemeRows = React.useMemo(() => {
        if (lens !== "graphemes") return null
        return buildGraphemeRowsFromText(decodedText)
    }, [lens, decodedText])
    const normalizedText = React.useMemo(() => {
        if (!norm) return decodedText
        try {
            return decodedText.normalize(norm)
        } catch {
            return decodedText
        }
    }, [decodedText, norm])

    const driftRows = React.useMemo(() => {
        if (!canDoDrift || !norm) return null
        return buildUtf8TokensWithNormalization(bytes, norm)
    }, [bytes, canDoDrift, norm])

    const wrongDecode = React.useMemo(() => {
        if (canDoDrift) return null
        return buildWrongDecodePerByte(bytes, targetEncoding)
    }, [bytes, targetEncoding, canDoDrift])

    // Hover UX: if hovering a byte, find the drift row containing it
    const hoveredRowIndex = React.useMemo(() => {
        if (!driftRows || hoveredIndex == null) return null
        for (let r = 0; r < driftRows.length; r++) {
            const row = driftRows[r]
            if (hoveredIndex >= row.srcStart && hoveredIndex < row.srcEndExclusive) return r
        }
        return null
    }, [driftRows, hoveredIndex])

    return (
        <>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 1}}>

                <Box sx={{display: "flex", gap: 1, alignItems: "center", mt: 2, mb: 0.7}}>
                    <Typography sx={{fontSize: ".65rem", opacity: 0.7}}>
                        View:
                    </Typography>

                    <Chip
                        size="small"
                        clickable
                        label="Bytes"
                        onClick={() => setLens("bytes")}
                        sx={{
                            opacity: lens === "bytes" ? 1 : 0.4,
                            border: lens === "bytes" ? "1px solid #00ffcc" : undefined,
                        }}
                    />

                    <Chip
                        size="small"
                        clickable
                        label="Graphemes"
                        onClick={() => setLens("graphemes")}
                        sx={{
                            opacity: lens === "graphemes" ? 1 : 0.4,
                            border: lens === "graphemes" ? "1px solid #00ffcc" : undefined,
                        }}
                    />
                </Box>
                <Box>
                    {canDoDrift ? (
                        <Chip
                            size="small"
                            label={normalizeLabel(norm!)}
                            sx={{
                                height: 22,
                                fontSize: ".70rem",
                                borderRadius: 1.2,
                                background: "rgba(122,162,255,0.12)",
                                border: "1px solid rgba(122,162,255,0.25)",
                                color: "#fff",
                                flex: "0 0 auto",
                            }}
                        />
                    ) : null}
                </Box>
            </Box>
            <Typography sx={{fontSize: ".65rem", opacity: 0.7, mb: 2}}>
                {canDoDrift ? (
                    <>
                        <strong>Normalization boundary:</strong> bytes → decode({sourceEncoding}) →
                        normalize({norm})
                        → UTF-8 bytes.
                        Alignment is intentionally broken when normalization expands / mutates code
                        points.
                    </>
                ) : (
                    <>
                        Same byte stream interpreted
                        using <strong>{sourceEncoding}</strong> vs <strong>{targetEncoding}</strong>.
                    </>
                )}
            </Typography>

            {/* ====== Option A ====== */}
            {lens === "graphemes" && graphemeRows && (
                <Box sx={{fontSize: ".8rem"}}>
                    {graphemeRows.map(row => (
                        <Box
                            key={row.index}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "40px 1fr 1fr",
                                gap: 2,
                                py: 0.5,
                                px: 1,
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <span>{row.index}</span>

                            <span>
          {row.grapheme === " " ? "␠" : row.grapheme}
        </span>

                            <span
                                style={{
                                    color: row.nfc !== row.nfd ? "#ffcc00" : undefined,
                                }}
                            >
          {row.nfd === " " ? "␠" : row.nfd}
        </span>
                        </Box>
                    ))}
                </Box>
            )}

            {/* ====== Drift View (Option B) ====== */}
            {lens === "bytes" && (
                <>
                    {canDoDrift && driftRows ? (
                        <Box sx={{fontSize: ".78rem"}}>
                            {/* Header */}

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "92px 1.25fr 84px 1.25fr",
                                    gap: 1.25,
                                    px: 0.75,
                                    py: 0.6,
                                    borderRadius: 1,
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    background: "rgba(255,255,255,0.03)",
                                    mb: 0.75,
                                }}
                            >

                                <Box sx={{opacity: 0.75}}>Src offset</Box>
                                <Box sx={{opacity: 0.75}}>Source (decoded)</Box>
                                <Box sx={{opacity: 0.75}}>Drift</Box>
                                <Box sx={{opacity: 0.75}}>After normalization</Box>
                            </Box>

                            {/* Rows */}
                            {driftRows.map((row, rIdx) => {
                                const isRowHovered = hoveredRowIndex === rIdx
                                const rowSelected = (() => {
                                    // treat row selected if any contained byte is selected
                                    for (let i = row.srcStart; i < row.srcEndExclusive; i++) {
                                        if (isSelected(i)) return true
                                    }
                                    return false
                                })()

                                const warn =
                                    row.changed || row.byteDelta !== 0 || row.srcCharKind === "replacement" || row.outCharKind === "replacement"

                                return (
                                    <Box
                                        key={`${row.srcStart}-${rIdx}`}
                                        onMouseEnter={() => setHoveredIndex(row.srcStart)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: "92px 1.25fr 84px 1.25fr",
                                            gap: 1.25,
                                            px: 0.75,
                                            py: 0.55,
                                            borderRadius: 1,
                                            background: rowSelected
                                                ? "rgba(255,64,129,0.14)"
                                                : isRowHovered
                                                    ? "rgba(0,255,204,0.08)"
                                                    : "transparent",
                                            transition: "background .12s",
                                            border: warn ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
                                        }}
                                    >
                                        {/* Src offset range */}
                                        <Box
                                            sx={{
                                                fontFamily: `'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
                                                opacity: 0.9,
                                            }}
                                        >
                                            {row.srcStart.toString(16).padStart(4, "0")}
                                            <span style={{opacity: 0.55}}>..</span>
                                            {(row.srcEndExclusive - 1).toString(16).padStart(4, "0")}
                                        </Box>

                                        {/* Source */}
                                        <Box sx={{display: "flex", alignItems: "center", gap: 1, minWidth: 0}}>
                                            <Tooltip
                                                arrow
                                                title={
                                                    <Box sx={{fontSize: ".72rem"}}>
                                                        <div>
                                                            <strong>Source
                                                                char</strong>: {row.srcChar === " " ? "␠" : row.srcChar || "∅"}
                                                        </div>
                                                        <div
                                                            style={{opacity: 0.8}}>Bytes: {formatHexBytes(row.srcBytes)}</div>
                                                    </Box>
                                                }
                                            >
                                                <Box
                                                    sx={{
                                                        minWidth: 26,
                                                        textAlign: "center",
                                                        fontSize: "1.05rem",
                                                        lineHeight: 1,
                                                        opacity: row.srcCharKind === "combining" ? 0.85 : 1,
                                                    }}
                                                >
                                                    {row.srcChar === " " ? "␠" : row.srcChar || "∅"}
                                                </Box>
                                            </Tooltip>

                                            <Box sx={{minWidth: 0, flex: 1}}>
                                                <BytePills
                                                    bytes={row.srcBytes}
                                                    onClick={(within, ev) => {
                                                        const byteIndex = row.srcStart + within
                                                        onByteClick(byteIndex, ev)
                                                    }}
                                                    title="Click a byte to inspect"
                                                />
                                            </Box>
                                        </Box>

                                        {/* Drift */}
                                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <DriftChip delta={row.byteDelta} changed={row.changed}/>
                                        </Box>

                                        {/* After normalization */}
                                        <Box sx={{display: "flex", alignItems: "center", gap: 1, minWidth: 0}}>
                                            <Tooltip
                                                arrow
                                                title={
                                                    <Box sx={{fontSize: ".72rem"}}>
                                                        <div>
                                                            <strong>Output</strong>: {row.outChar === " " ? "␠" : row.outChar || "∅"}
                                                        </div>
                                                        <div style={{opacity: 0.8}}>UTF-8
                                                            bytes: {formatHexBytes(row.outBytes)}</div>
                                                    </Box>
                                                }
                                            >
                                                <Box
                                                    sx={{
                                                        minWidth: 26,
                                                        textAlign: "center",
                                                        fontSize: "1.05rem",
                                                        lineHeight: 1,
                                                        opacity: row.outCharKind === "combining" ? 0.85 : 1,
                                                        color:
                                                            row.outCharKind === "replacement"
                                                                ? "#ff7aa7"
                                                                : row.byteDelta !== 0 || row.changed
                                                                    ? "#ffcc00"
                                                                    : undefined,
                                                    }}
                                                >
                                                    {row.outChar === " " ? "␠" : row.outChar || "∅"}
                                                </Box>
                                            </Tooltip>

                                            <Box sx={{minWidth: 0, flex: 1}}>
                                                <BytePills
                                                    bytes={row.outBytes}
                                                    muted={row.outBytes.length !== row.srcBytes.length}
                                                    title="Output bytes are after normalization (UTF-8 re-encoded)"
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })}

                            {/* Footer summary */}
                            <Box sx={{mt: 1.1, opacity: 0.7, fontSize: ".70rem"}}>
                                Source decoded text: <span style={{opacity: 0.9}}>{decodedText || "∅"}</span>
                                <br/>
                                Normalized text: <span style={{opacity: 0.9}}>{normalizedText || "∅"}</span>
                            </Box>
                        </Box>
                    ) : null}
                </>
            )}

            {/* ====== Fallback: classic "wrong decode" per-byte view ====== */}
            {!canDoDrift && wrongDecode ? (
                <Box sx={{fontSize: ".78rem"}}>
                    {hex.map((b, i) => {
                        const hovered = hoveredIndex === i
                        const selected = isSelected(i)

                        const diverges =
                            wrongDecode.lead[i] &&
                            (safeDecode(bytes, sourceEncoding).normalize("NFC")[i] ?? "") !== (wrongDecode.leadChar[i] ?? "")

                        return (
                            <Box
                                key={i}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={(ev) => onByteClick(i, ev)}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "70px 60px 60px 1fr",
                                    gap: 1,
                                    py: 0.25,
                                    px: 0.5,
                                    borderRadius: 1,
                                    background: selected
                                        ? "rgba(255,64,129,0.14)"
                                        : hovered
                                            ? "rgba(0,255,204,0.08)"
                                            : "transparent",
                                    opacity: b.valid ? 0.95 : 0.55,
                                    transition: "background .12s",
                                    userSelect: "none",
                                }}
                            >
                                <span>{i.toString(16).padStart(4, "0")}</span>

                                <span style={{color: b.valid ? "#fff" : "#ff6b6b"}}>{b.valid ? b.value : "??"}</span>

                                <span style={{opacity: 1}}>{/* source: show raw ASCII-ish via UTF-8 byte-span */}</span>

                                <span
                                    style={{
                                        color: diverges ? "#ff7aa7" : undefined,
                                        opacity: wrongDecode.lead[i] ? 1 : 0.35,
                                        fontStyle: wrongDecode.lead[i] ? "normal" : "italic",
                                    }}
                                >
                  {wrongDecode.display[i]}
                </span>
                            </Box>
                        )
                    })}
                </Box>
            ) : null}

            {/* Safety note when user chooses a normalization target but source is non-UTF8 */}
            {norm && !canDoDrift ? (
                <Box sx={{mt: 1, opacity: 0.7, fontSize: ".70rem"}}>
                    ⚠️ Normalization is applied to decoded Unicode text. Enable drift view by
                    using <strong>UTF-8</strong> as the
                    source encoding (or implement an explicit decode → normalize → encode pipeline for the chosen
                    source).
                </Box>
            ) : null}
        </>
    )
}
