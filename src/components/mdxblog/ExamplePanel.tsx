import React, { ReactNode, useMemo, useState } from "react"
import { Box, Chip, Collapse, IconButton, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

type Density = "comfortable" | "compact"

interface ExamplePanelProps {
  title: string
  subtitle?: string
  defaultExpanded?: boolean
  density?: Density
  tags?: string[]
  children: ReactNode
}

/**
 * ExamplePanel
 * - Collapsible panel for "big chunks" (topology + config + walkthrough)
 * - Keeps MDX children untouched (Mermaid, code fences, notes, etc.)
 */
export default function ExamplePanel({
  title,
  subtitle,
  defaultExpanded = false,
  density = "comfortable",
  tags = [],
  children,
}: ExamplePanelProps) {
  const [open, setOpen] = useState(defaultExpanded)

  const pad = density === "compact" ? "1rem" : "1.25rem"
  const gap = density === "compact" ? 1 : 1.25

  const tagChips = useMemo(
    () =>
      tags.map((t) => (
        <Chip
          key={t}
          label={t}
          size="small"
          sx={{
            height: 22,
            fontSize: 11,
            opacity: 0.9,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
      )),
    [tags]
  )

  return (
    <Box
      sx={{
        my: 3,
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(14,17,23,0.75)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          px: pad,
          py: "0.9rem",
          borderBottom: open ? "1px solid rgba(255,255,255,0.06)" : "none",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
              {title}
            </Typography>
            {tagChips.length > 0 && (
              <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                {tagChips}
              </Box>
            )}
          </Box>

          {subtitle && (
            <Typography sx={{ mt: 0.5, fontSize: 13, opacity: 0.8 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <IconButton
          onClick={() => setOpen((v) => !v)}
          sx={{
            mt: "-2px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            "&:hover": { background: "rgba(255,255,255,0.07)" },
          }}
          aria-label={open ? "Collapse example" : "Expand example"}
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Body */}
      <Collapse in={open} timeout={180} unmountOnExit>
        <Box sx={{ px: pad, py: pad, display: "flex", flexDirection: "column", gap }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}