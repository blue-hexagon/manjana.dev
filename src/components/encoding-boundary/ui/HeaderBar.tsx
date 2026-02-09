import * as React from "react"
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material"
import type { EncodingScenario } from "../types"

export function HeaderBar(props: {
  differs: boolean
  scenarios: EncodingScenario[]
  scenarioId: string | undefined
  setScenarioId: (id: string) => void
  expanded: boolean
  toggleExpanded: () => void
  onDiffClick: () => void
}) {
  const {
    differs,
    scenarios,
    scenarioId,
    setScenarioId,
    expanded,
    toggleExpanded,
    onDiffClick,
  } = props

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {differs && (
          <Tooltip title="Source and target differ">
            <Chip
              size="small"
              label="diff"
              onClick={onDiffClick}
              sx={{
                cursor: "pointer",
                bgcolor: "rgba(255,64,129,.15)",
                color: "#ff7aa7",
                fontSize: "0.7rem",
              }}
            />
          </Tooltip>
        )}

        <Select
          size="small"
          value={scenarioId}
          onChange={e => setScenarioId(String(e.target.value))}
          sx={{ fontSize: "0.75rem", minWidth: 220 }}
        >
          {scenarios.map(s => (
            <MenuItem key={s.id} value={s.id}>
              {s.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Button size="small" onClick={toggleExpanded} sx={{ fontSize: "0.7rem" }}>
        {expanded ? "Exit inspector" : "Inspect encoding"}
      </Button>
    </Box>
  )
}
