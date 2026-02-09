import * as React from "react"
import { Box, Collapse, Tab, Tabs } from "@mui/material"

export function Inspector(props: {
  expanded: boolean
  tab: 0 | 1
  setTab: (t: 0 | 1) => void
  textTab: React.ReactNode
  bytesTab: React.ReactNode
}) {
  const { expanded, tab, setTab, textTab, bytesTab } = props

  return (
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

        {tab === 0 ? textTab : bytesTab}
      </Box>
    </Collapse>
  )
}
