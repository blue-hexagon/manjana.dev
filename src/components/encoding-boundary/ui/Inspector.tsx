import * as React from "react"
import { Box, Collapse, Tab, Tabs } from "@mui/material"
type InspectorTab = {
  label: string
  content: React.ReactNode
}
export function Inspector({
  expanded,
  tab,
  setTab,
  tabs,
}: {
  expanded: boolean
  tab: number
  setTab: (n: number) => void
  tabs: InspectorTab[]
}) {
  return (
    <Collapse in={expanded} >
      <Tabs centered value={tab} onChange={(_, v) => setTab(v)}>
        {tabs.map(t => (
          <Tab key={t.label} label={t.label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 1 }}>
        {tabs[tab]?.content}
      </Box>
    </Collapse>
  )
}
