import * as React from "react"
import { Box } from "@mui/material"
import type { HoveredMeta, SelectionRange, SelectionText } from "../../../types"

export function HexStatusLine(props: {
  hoveredMeta: HoveredMeta | null
  selection: SelectionRange | null
  selectionText: SelectionText | null
}) {
  const { hoveredMeta, selection, selectionText } = props

  const mono = {
    fontFamily: `'Fira Code', monospace`,
    fontSize: ".7rem",
    lineHeight: 1.4,
  }

  const NEUTRAL = "rgba(255,255,255,0.70)"
  const NEUTRAL_DIM = "rgba(255,255,255,0.45)"
  const INVALID = "#ff6b6b"

  const columns = "12ch 6ch 5ch 4ch 8ch"

  return (
    <Box sx={{ mt: 1, userSelect: "none" }}>
      {/* ───────────────────────── Label row (static) ───────────────────────── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: columns,
          columnGap: "1.5ch",
          color: NEUTRAL_DIM,
          mb: 0.25,
          ...mono,
        }}
      >
        <span>offset</span>
        <span>hex</span>
        <span>dec</span>
        <span>ascii</span>
        <span />
      </Box>

      {/* ───────────────────────── Value row (dynamic) ───────────────────────── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: columns,
          columnGap: "1.5ch",
          color: NEUTRAL,
          minHeight: "1.2em",
          ...mono,
        }}
      >
        <span>
          {hoveredMeta ? `0x${hoveredMeta.offsetHex}` : "—"}
        </span>

        <span>
          {hoveredMeta ? hoveredMeta.byteHex : "—"}
        </span>

        <span>
          {hoveredMeta && hoveredMeta.byteDec != null
            ? hoveredMeta.byteDec
            : "—"}
        </span>

        <span>
          {hoveredMeta ? hoveredMeta.ascii : "—"}
        </span>

        <span
          style={{
            color:
              hoveredMeta && !hoveredMeta.valid ? INVALID : "transparent",
          }}
        >
          invalid
        </span>
      </Box>

      {/* ───────────────────────── Selection summary (separate, fixed) ───────────────────────── */}
      <Box
        sx={{
          mt: 0.25,
          textAlign: "right",
          minWidth: "32ch",
          color: NEUTRAL,
          ...mono,
        }}
      >
        {selection && selectionText ? (
          <span>
            {selectionText.len} bytes · [0x
            {selection.lo.toString(16).padStart(4, "0")}..0x
            {selection.hi.toString(16).padStart(4, "0")}]
          </span>
        ) : (
          <span style={{ color: "transparent" }}>—</span>
        )}
      </Box>
    </Box>
  )
}
