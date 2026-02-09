import * as React from "react"
import { Box, Button, ButtonGroup, Tooltip, Typography } from "@mui/material"
import type { ByteGroup, SelectionText } from "../../../types"

export function HexToolbar(props: {
  group: ByteGroup
  setGroup: (g: ByteGroup) => void
  offsets: boolean
  setOffsets: (v: boolean) => void
  selectionText: SelectionText | null
  clearSelection: () => void
  copySelection: (mode: "hex" | "ascii" | "both") => void
}) {
  const { group, setGroup, offsets, setOffsets, selectionText, clearSelection, copySelection } = props

  return (
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
              sx={{ color: group === n ? "#00ffcc" : "#ccc" }}
            >
              {n}
            </Button>
          ))}
        </ButtonGroup>

        <Button size="small" onClick={() => setOffsets(!offsets)}>
          offsets {offsets ? "on" : "off"}
        </Button>

        {selectionText ? (
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
        <Button size="small" disabled={!selectionText} onClick={() => copySelection("hex")}>
          copy hex
        </Button>
        <Button size="small" disabled={!selectionText} onClick={() => copySelection("ascii")}>
          copy ascii
        </Button>
        <Button size="small" disabled={!selectionText} onClick={() => copySelection("both")}>
          copy both
        </Button>
      </Box>
    </Box>
  )
}
