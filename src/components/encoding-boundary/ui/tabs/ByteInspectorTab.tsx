import * as React from "react"
import { Box, Tab, Tabs } from "@mui/material"
import type { ByteView } from "../../types"

export function ByteInspectorTab(props: {
  byteView: ByteView
  setByteView: (v: ByteView) => void
  hexView: React.ReactNode
  rawView: React.ReactNode
  mapView: React.ReactNode
}) {
  const { byteView, setByteView, hexView, rawView, mapView } = props

  return (
    <Box sx={{ mt: 1 }}>
      <Tabs value={byteView} onChange={(_, v) => setByteView(v)} sx={{ mb: 1 }}>
        <Tab value="hex" label="Hex" />
        <Tab value="raw" label="Raw" />
        <Tab value="map" label="Map" />
      </Tabs>

      {byteView === "hex" ? hexView : byteView === "raw" ? rawView : mapView}
    </Box>
  )
}
