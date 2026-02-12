import * as React from "react"
import {Box, Snackbar, Typography} from "@mui/material"

import type {
    ByteGroup,
    EncodingBoundaryProps,
    HoveredMeta,
    SelectionText,
} from "./types"
import {parseHexBytes, hexToDec, isPrintableAsciiChar, hexToBytes} from "./utils/bytes"
import {copyToClipboard} from "./utils/clipboard"
import {nextScenario, useEncodingScenario} from "./hooks/useEncodingScenario"
import {useByteSelection} from "./hooks/useByteSelection"
import {useToast} from "./hooks/useToast"

import {BoundaryShell} from "./ui/BoundaryShell"
import {HeaderBar} from "./ui/HeaderBar"
import {Pipeline} from "./ui/Pipeline"
import {Inspector} from "./ui/Inspector"

import {TextDiffTab} from "./ui/tabs/TextDiffTab"
import {HexView} from "./ui/tabs/views/HexView"
import {RawView} from "./ui/tabs/views/RawView"
import {MapView} from "./ui/tabs/views/MapView"

export default function EncodingBoundary({scenarios, initialScenarioId}: EncodingBoundaryProps) {
    const {scenarioId, setScenarioId, scenario} = useEncodingScenario(scenarios, initialScenarioId)

    const nextScenarioId = React.useMemo(
        () => (scenarioId ? nextScenario(scenarios, scenarioId) : undefined),
        [scenarios, scenarioId]
    )

    const goToNextScenario = React.useCallback(() => {
        if (nextScenarioId) setScenarioId(nextScenarioId)
    }, [nextScenarioId, setScenarioId])

    const [expanded, setExpanded] = React.useState(false)
    const [pipeLineExpanded, setPipeLineExpanded] = React.useState(false)

    const [fullscreen, setFullscreen] = React.useState(false)

    const toggleInspector = React.useCallback(() => {
        setExpanded(v => !v)
    }, [])

    const [tab, setTab] = React.useState<number>(0)
    const [group, setGroup] = React.useState<ByteGroup>(16)
    const [offsets, setOffsets] = React.useState(true)

    const {toast, open: openToast, close: closeToast} = useToast()

    if (!scenario) {
        return (
            <Box sx={{p: 2, opacity: 0.6, fontFamily: "monospace"}}>
                No encoding scenario selected.
            </Box>
        )
    }

    const differs = true

    const hex = React.useMemo(() => parseHexBytes(scenario.bytes), [scenario.bytes])
    const invalidCount = React.useMemo(() => hex.filter(b => !b.valid).length, [hex])
    const byteCount = hex.length

    const selectionApi = useByteSelection(byteCount)

    React.useEffect(() => {
        selectionApi.reset()
    }, [scenarioId]) // eslint-disable-line react-hooks/exhaustive-deps
    const toggleFullscreen = () => {
        setFullscreen(v => !v)
    }
    const togglePipeLineExpanded = () => {
        setPipeLineExpanded(v => !v)
    }
    const hoveredMeta: HoveredMeta | null = React.useMemo(() => {
        const idx = selectionApi.clampedHover
        if (idx == null) return null
        const hb = hex[idx]
        const ascii = scenario.targetText[idx] ?? ""
        return {
            index: idx,
            offsetHex: idx.toString(16).padStart(4, "0"),
            byteHex: hb?.valid ? hb.value : "??",
            byteDec: hb?.valid ? hexToDec(hb.value) : null,
            ascii: ascii && isPrintableAsciiChar(ascii) ? ascii : "·",
            valid: hb?.valid ?? false,
        }
    }, [selectionApi.clampedHover, hex, scenario.targetText])

    const selectionText: SelectionText | null = React.useMemo(() => {
        if (!selectionApi.selection) return null
        const {lo, hi} = selectionApi.selection
        const slice = hex.slice(lo, hi + 1)

        return {
            len: slice.length,
            hexStr: slice.map(b => (b.valid ? b.value : "??")).join(" "),
            asciiStr: slice
                .map((_, i) => {
                    const ch = scenario.targetText[lo + i] ?? ""
                    return ch && isPrintableAsciiChar(ch) ? ch : "·"
                })
                .join(""),
        }
    }, [selectionApi.selection, hex, scenario.targetText])

    const copySelection = React.useCallback(
        async (mode: "hex" | "ascii" | "both") => {
            if (!selectionText) return
            const payload =
                mode === "hex"
                    ? selectionText.hexStr
                    : mode === "ascii"
                        ? selectionText.asciiStr
                        : `HEX:\n${selectionText.hexStr}\n\nASCII:\n${selectionText.asciiStr}`

            openToast((await copyToClipboard(payload)) ? "Copied selection" : "Copy failed")
        },
        [selectionText, openToast]
    )

    return (
        <Box
            sx={{
                position: fullscreen ? "fixed" : "relative",
                inset: fullscreen ? 0 : "auto",
                borderRadius: fullscreen ? 0 : 2,
                zIndex: fullscreen ? 1300 : "auto",
                background: "#0b0b0b",
                flex: 1,

                // 👇 THIS is the font scale
                zoom: fullscreen ? 1.15 : 1,

                // Ensure it behaves like a real app surface
                display: "flex",
                flexDirection: "column",
                overflow: fullscreen ? "hidden" : "visible",
                transition: "font-size 220ms ease, background 220ms ease"

            }}
        >
            <BoundaryShell>
                <>
                    <HeaderBar
                        differs={differs}
                        scenarios={scenarios}
                        scenarioId={scenarioId}
                        setScenarioId={setScenarioId}
                        onNextScenario={goToNextScenario}
                        expanded={expanded}
                        toggleExpanded={toggleInspector}
                        onDiffClick={() => {
                            setExpanded(true)
                            setTab(0)
                        }}
                        fullscreen={fullscreen}
                        onToggleFullscreen={toggleFullscreen}
                        togglePipeLineExpanded={togglePipeLineExpanded}
                        pipeLineExpanded={pipeLineExpanded}
                    />

                    {scenario.description && (
                        <Box
                            sx={{
                                mt: 1,
                                px: 2.5,
                                py: 2,
                                borderRadius: 1.5,
                                mb: 4,
                                border: "1px solid rgba(255,64,129,0.25)",
                                background:
                                    "linear-gradient(180deg, rgba(255,64,129,0.08), rgba(255,64,129,0.03))",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.12em",
                                    color: "#ff4081",
                                    mb: 0.75,
                                }}
                            >
                                FAILURE MODE
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "0.9rem",
                                    color: "rgba(255,255,255,0.6)",
                                }}
                            >
                                {scenario.description}
                            </Typography>
                        </Box>
                    )}

                    <Pipeline
                        isExpanded={pipeLineExpanded}
                        source={scenario.source}
                        sourceEncoding={scenario.sourceEncoding}
                        sourceText={scenario.sourceText}
                        bytes={scenario.bytes}
                        invalidCount={invalidCount}
                        byteCount={byteCount}
                        target={scenario.target}
                        targetEncoding={scenario.targetEncoding}
                        targetText={scenario.targetText}
                        onBytesClick={() => {
                            setExpanded(true)
                            setTab(1)
                        }}
                    />
                </>

                <Inspector
                    expanded={expanded}
                    tab={tab}
                    setTab={setTab}
                    tabs={[
                        {
                            label: "Before / After",
                            content: <TextDiffTab sourceText={scenario.sourceText} targetText={scenario.targetText}/>
                        },
                        {
                            label: "Map",
                            content: <MapView hex={hex} hexString={scenario.bytes}
                                              sourceEncoding={scenario.sourceEncoding}
                                              targetEncoding={scenario.targetEncoding}
                                              hoveredIndex={selectionApi.clampedHover}
                                              setHoveredIndex={selectionApi.setHoveredByte}
                                              onByteClick={selectionApi.onByteClick}
                                              isSelected={selectionApi.isSelected}/>
                        },
                        {
                            label: "ASCII Analyzer",
                            content: <HexView hex={hex} targetText={scenario.targetText} group={group}
                                              setGroup={setGroup} offsets={offsets} setOffsets={setOffsets}
                                              hoveredIndex={selectionApi.hoveredByte}
                                              setHoveredIndex={selectionApi.setHoveredByte}
                                              clampedHover={selectionApi.clampedHover}
                                              selection={selectionApi.selection} selectionText={selectionText}
                                              hoveredMeta={hoveredMeta} selAnchor={selectionApi.selAnchor}
                                              isSelected={selectionApi.isSelected}
                                              onByteClick={selectionApi.onByteClick}
                                              clearSelection={selectionApi.clearSelection}
                                              copySelection={copySelection}/>
                        },
                        {
                            label: "Transform",
                            content: <RawView bytes={hexToBytes(scenario.bytes)} srcEncoding={scenario.sourceEncoding}/>
                        },
                    ]}
                />

                <Snackbar open={!!toast} autoHideDuration={1400} onClose={closeToast} message={toast ?? ""}/>
            </BoundaryShell>
        </Box>
    )
}
