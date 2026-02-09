import * as React from "react"
import { Box } from "@mui/material"
import type { HoveredMeta, SelectionRange, SelectionText } from "../../../types"

export function HexStatusLine(props: {
  hoveredMeta: HoveredMeta | null
  selection: SelectionRange | null
  selectionText: SelectionText | null
}) {
  const { hoveredMeta, selection, selectionText } = props

  return (
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
            <span>dec {hoveredMeta.byteDec != null ? hoveredMeta.byteDec : "—"}</span>
            <span>ascii {hoveredMeta.ascii}</span>
            {!hoveredMeta.valid && <span style={{ color: "#ff6b6b" }}>invalid</span>}
          </>
        ) : (
          <span>hover a byte for details</span>
        )}
      </Box>

      <Box sx={{ textAlign: "right", opacity: 0.8 }}>
        {selection && selectionText ? (
          <span>
            selection: {selectionText.len} bytes · [0x
            {selection.lo.toString(16).padStart(4, "0")}..0x
            {selection.hi.toString(16).padStart(4, "0")}]
          </span>
        ) : (
          <span />
        )}
      </Box>
    </Box>
  )
}
