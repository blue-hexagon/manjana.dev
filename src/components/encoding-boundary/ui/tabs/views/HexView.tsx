import * as React from "react"
import {Box} from "@mui/material"
import type {ByteGroup, HoveredMeta, ParsedByte, SelectionRange, SelectionText} from "../../../types"
import {ASCII_CELL_W, GAP_W, HEX_CELL_W} from "../../../constants"
import {HexToolbar} from "./HexToolbar"
import {HexStatusLine} from "./HexStatusLine"

export function HexView(props: {
    hex: ParsedByte[]
    targetText: string
    group: ByteGroup
    setGroup: (g: ByteGroup) => void
    offsets: boolean
    setOffsets: (v: boolean) => void

    hoveredIndex: number | null
    setHoveredIndex: (i: number | null) => void
    clampedHover: number | null

    selection: SelectionRange | null
    selectionText: SelectionText | null
    hoveredMeta: HoveredMeta | null

    selAnchor: number | null
    isSelected: (i: number) => boolean
    onByteClick: (i: number, ev: React.MouseEvent) => void
    clearSelection: () => void
    copySelection: (mode: "hex" | "ascii" | "both") => void
}) {
    const {
        hex,
        targetText,
        group,
        setGroup,
        offsets,
        setOffsets,
        setHoveredIndex,
        clampedHover,
        selection,
        selectionText,
        hoveredMeta,
        selAnchor,
        isSelected,
        onByteClick,
        clearSelection,
        copySelection,
    } = props

    return (
        <Box>
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
                <HexToolbar
                    group={group}
                    setGroup={setGroup}
                    offsets={offsets}
                    setOffsets={setOffsets}
                    selectionText={selectionText}
                    clearSelection={clearSelection}
                    copySelection={copySelection}
                />

                <HexStatusLine
                    hoveredMeta={hoveredMeta}
                    selection={selection}
                    selectionText={selectionText}
                />
            </Box>

            <Box
                sx={{
                    fontSize: ".78rem",
                    overflowX: "auto",
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    pb: 0.5,
                }}
            >
                {Array.from({length: Math.ceil(hex.length / group)}).map((_, row) => {
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
                                mx: 0.5,
                                minWidth: "fit-content",
                                "&:hover": {background: "rgba(255,255,255,0.03)"},
                            }}
                        >
                            {offsets && (
                                <Box
                                    sx={{
                                        opacity: 0.6,
                                        position: "sticky",
                                        left: 0,
                                        zIndex: 1,
                                        background: "#0b0b0b",
                                        pr: 1,
                                        pl: 0.75,
                                    }}
                                >
                                    0x{rowStart.toString(16).padStart(4, "0")}
                                </Box>
                            )}

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${group}, ${HEX_CELL_W})`,
                                    columnGap: GAP_W,
                                    "& > *:nth-of-type(4n)": {marginRight: "0.6ch"},
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
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            onClick={ev => onByteClick(index, ev)}
                                            sx={{
                                                textAlign: "center",
                                                padding: "2px 0",
                                                borderRadius: "3px",
                                                cursor: "default",
                                                userSelect: "none",
                                                width: "2.5ch",
                                                boxSizing: "content-box",
                                                background: selected
                                                    ? "rgba(255,64,129,0.18)"
                                                    : hovered
                                                        ? "rgba(0,255,204,0.15)"
                                                        : "transparent",
                                                outline: anchor ? "1px solid rgba(255,64,129,0.55)" : "none",
                                                color: b.valid ? "#fff" : "#ff6b6b",
                                            }}
                                        >
                                            {b.valid ? b.value : "??"}
                                        </Box>
                                    )
                                })}
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${group}, ${ASCII_CELL_W})`,
                                    columnGap: GAP_W,
                                    opacity: 0.75,
                                    "& > *:nth-of-type(4n)": {marginRight: "0.6ch"},
                                }}
                            >
                                {slice.map((_, i) => {
                                    const index = rowStart + i
                                    const ch = targetText[index] ?? ""
                                    const printable = ch && ch.length === 1 && ch >= " " && ch <= "~"
                                    const hovered = clampedHover === index
                                    const selected = isSelected(index)
                                    const anchor = selAnchor === index

                                    return (
                                        <Box
                                            key={index}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            onClick={ev => onByteClick(index, ev)}
                                            sx={{
                                                textAlign: "center",
                                                borderRadius: "3px",
                                                userSelect: "none",
                                                width: "1.25ch",
                                                boxSizing: "content-box",
                                                background: selected
                                                    ? "rgba(255,64,129,0.14)"
                                                    : hovered
                                                        ? "rgba(0,255,204,0.10)"
                                                        : "transparent",
                                                outline: anchor ? "1px solid rgba(255,64,129,0.45)" : "none",
                                            }}
                                        >
                                            {printable ? ch : "·"}
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}
