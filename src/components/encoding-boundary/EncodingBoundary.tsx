import * as React from "react"
import { Box, Snackbar, Typography } from "@mui/material"

import type { ByteGroup, ByteView, EncodingBoundaryProps, HoveredMeta, SelectionText } from "./types"
import {parseHexBytes, hexToDec, isPrintableAsciiChar, hexToBytes} from "./utils/bytes"
import { copyToClipboard } from "./utils/clipboard"
import { useEncodingScenario } from "./hooks/useEncodingScenario"
import { useByteSelection } from "./hooks/useByteSelection"
import { useToast } from "./hooks/useToast"

import { BoundaryShell } from "./ui/BoundaryShell"
import { HeaderBar } from "./ui/HeaderBar"
import { Pipeline } from "./ui/Pipeline"
import { Inspector } from "./ui/Inspector"

import { TextDiffTab } from "./ui/tabs/TextDiffTab"
import { ByteInspectorTab } from "./ui/tabs/ByteInspectorTab"
import { HexView } from "./ui/tabs/views/HexView"
import { RawView } from "./ui/tabs/views/RawView"
import { MapView } from "./ui/tabs/views/MapView"

export default function EncodingBoundary({ scenarios, initialScenarioId }: EncodingBoundaryProps) {
  const { scenarioId, setScenarioId, scenario } = useEncodingScenario(scenarios, initialScenarioId)

  const [expanded, setExpanded] = React.useState(false)
  const [tab, setTab] = React.useState<0 | 1>(0)
  const [byteView, setByteView] = React.useState<ByteView>("hex")

  const [group, setGroup] = React.useState<ByteGroup>(16)
  const [offsets, setOffsets] = React.useState(true)

  const { toast, open: openToast, close: closeToast } = useToast()

  // If scenario missing
  if (!scenario) {
    return (
      <Box sx={{ p: 2, opacity: 0.6, fontFamily: "monospace" }}>
        No encoding scenario selected.
      </Box>
    )
  }

  const differs = scenario.sourceText !== scenario.targetText

  const hex = React.useMemo(() => parseHexBytes(scenario.bytes), [scenario.bytes])
  const invalidCount = React.useMemo(() => hex.filter(b => !b.valid).length, [hex])
  const byteCount = hex.length

  const selectionApi = useByteSelection(byteCount)

  // reset selection/hover when switching scenarios
  React.useEffect(() => {
    selectionApi.reset()
  }, [scenarioId]) // eslint-disable-line react-hooks/exhaustive-deps

  const hoveredMeta: HoveredMeta | null = React.useMemo(() => {
    const idx = selectionApi.clampedHover
    if (idx == null || byteCount === 0) return null
    const hb = hex[idx]
    const ascii = scenario.targetText[idx] ?? ""
    const dec = hb?.valid ? hexToDec(hb.value) : null
    return {
      index: idx,
      offsetHex: idx.toString(16).padStart(4, "0"),
      byteHex: hb?.valid ? hb.value : "??",
      byteDec: dec,
      ascii: ascii ? (isPrintableAsciiChar(ascii) ? ascii : "·") : "·",
      valid: hb?.valid ?? false,
    }
  }, [selectionApi.clampedHover, byteCount, hex, scenario.targetText])

  const selectionText: SelectionText | null = React.useMemo(() => {
    if (!selectionApi.selection) return null
    const { lo, hi } = selectionApi.selection
    const slice = hex.slice(lo, hi + 1)

    const hexStr = slice.map(b => (b.valid ? b.value : "??")).join(" ")
    const asciiStr = Array.from({ length: slice.length })
      .map((_, i) => {
        const ch = scenario.targetText[lo + i] ?? ""
        return ch && isPrintableAsciiChar(ch) ? ch : "·"
      })
      .join("")

    return { hexStr, asciiStr, len: slice.length }
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

      const ok = await copyToClipboard(payload)
      openToast(ok ? "Copied selection" : "Copy failed")
    },
    [selectionText, openToast]
  )

  return (
    <BoundaryShell>
      <HeaderBar
        differs={differs}
        scenarios={scenarios}
        scenarioId={scenarioId}
        setScenarioId={setScenarioId}
        expanded={expanded}
        toggleExpanded={() => setExpanded(v => !v)}
        onDiffClick={() => {
          setExpanded(true)
          setTab(0)
        }}
      />

      <Pipeline
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

      <Inspector
        expanded={expanded}
        tab={tab}
        setTab={setTab}
        textTab={<TextDiffTab sourceText={scenario.sourceText} targetText={scenario.targetText} />}
        bytesTab={
          <ByteInspectorTab
            byteView={byteView}
            setByteView={setByteView}
            hexView={
              <HexView
                hex={hex}
                targetText={scenario.targetText}
                group={group}
                setGroup={setGroup}
                offsets={offsets}
                setOffsets={setOffsets}
                hoveredIndex={selectionApi.hoveredByte}
                setHoveredIndex={selectionApi.setHoveredByte}
                clampedHover={selectionApi.clampedHover}
                selection={selectionApi.selection}
                selectionText={selectionText}
                hoveredMeta={hoveredMeta}
                selAnchor={selectionApi.selAnchor}
                isSelected={selectionApi.isSelected}
                onByteClick={selectionApi.onByteClick}
                clearSelection={selectionApi.clearSelection}
                copySelection={copySelection}
              />
            }
            rawView={<RawView bytes={hexToBytes(scenario.bytes)} srcEncoding={scenario.sourceEncoding} />}
            mapView={
              <MapView
                hex={hex}
                hexString={scenario.bytes}
                sourceEncoding={scenario.sourceEncoding}
                targetEncoding={scenario.targetEncoding}
                hoveredIndex={selectionApi.clampedHover}
                setHoveredIndex={selectionApi.setHoveredByte}
                onByteClick={selectionApi.onByteClick}
                isSelected={selectionApi.isSelected}
              />
            }
          />
        }
      />

      {scenario.description && (
        <Typography sx={{ mt: 2, fontSize: ".75rem", opacity: 0.6 }}>
          {scenario.description}
        </Typography>
      )}

      <Snackbar
        open={!!toast}
        autoHideDuration={1400}
        onClose={closeToast}
        message={toast ?? ""}
      />
    </BoundaryShell>
  )
}
