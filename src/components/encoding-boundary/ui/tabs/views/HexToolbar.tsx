import * as React from "react"
import { Box, Button, ButtonGroup, Tooltip, Typography } from "@mui/material"
import type { ByteGroup, SelectionText } from "../../../types"

/**
 * Hex Inspector Toolbar
 * - Left: Interpretation controls (grouping + offsets) — quiet, persistent
 * - Center: Status/hint — only one at a time, never a CTA when selected
 * - Right: Extraction actions — visible always, enabled only with selection
 *
 * Faithful to the spec:
 * - Neutral by default, accent only indicates ACTIVE interpretation state
 * - No “on/off” text for offsets
 * - Copy actions are never hidden (capability visible), only disabled
 * - Clear is contextual, low emphasis, not grouped with copy
 * - No decorative fills; minimal, semantic styling
 */
export function HexToolbar(props: {
  group: ByteGroup
  setGroup: (g: ByteGroup) => void
  offsets: boolean
  setOffsets: (v: boolean) => void
  selectionText: SelectionText | null
  clearSelection: () => void
  copySelection: (mode: "hex" | "ascii" | "both") => void
}) {
  const {
    group,
    setGroup,
    offsets,
    setOffsets,
    selectionText,
    clearSelection,
    copySelection,
  } = props

  const hasSelection = Boolean(selectionText)

  // ---- Tokens (kept local for faithful, predictable UI) ----
  const ACCENT = "#00ffcc"

  const NEUTRAL = "rgba(255,255,255,0.60)"
  const NEUTRAL_STRONG = "rgba(255,255,255,0.78)"
  const NEUTRAL_DIM = "rgba(255,255,255,0.42)"

  const BORDER = "rgba(255,255,255,0.14)"
  const BORDER_HOVER = "rgba(255,255,255,0.22)"
  const BORDER_ACTIVE = "rgba(0,255,204,0.55)"

  const commonButtonSx = {
    fontSize: ".70rem",
    letterSpacing: "0.02em",
    textTransform: "none" as const,
    minHeight: 28,
    px: 1,
    color: NEUTRAL,
    borderColor: BORDER,
    "&:hover": {
      borderColor: BORDER_HOVER,
      backgroundColor: "rgba(255,255,255,0.03)", // subtle, not decorative
    },
    "&.Mui-disabled": {
      color: "rgba(255,255,255,0.25)",
      borderColor: "rgba(255,255,255,0.08)",
    },
  }

  const activeModeSx = {
    color: ACCENT,
    borderColor: BORDER_ACTIVE,
    "&:hover": {
      borderColor: "rgba(0,255,204,0.70)",
      backgroundColor: "rgba(255,255,255,0.03)", // keep hover language consistent
    },
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        pt: 0.75,
        // Keep it “quiet”: no background blocks, no dividers, no extra chrome
      }}
    >
      {/* ───────────────────────── Left: Interpretation ───────────────────────── */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
        {/* Byte grouping: mode selector, compact, low emphasis */}
        <ButtonGroup
          size="small"
          aria-label="Byte grouping"
          sx={{
            "& .MuiButton-root": commonButtonSx,
          }}
        >
          {[8, 12, 16].map(n => {
            const isActive = group === n
            return (
              <Button
                key={n}
                onClick={() => setGroup(n as ByteGroup)}
                aria-pressed={isActive}
                sx={isActive ? activeModeSx : undefined}
              >
                {n}
              </Button>
            )
          })}
        </ButtonGroup>

        {/* Offsets: toggle, no “on/off” text; state is implied */}
        <Tooltip title="Toggle byte offsets">
          <Button
            size="small"
            onClick={() => setOffsets(!offsets)}
            aria-pressed={offsets}
            sx={{
              ...commonButtonSx,
              // Offset toggle reads as an interpretation flag:
              ...(offsets ? activeModeSx : null),
              // Slightly narrower than copy buttons; no extra label noise
              px: 1.1,
            }}
          >
            offsets
          </Button>
        </Tooltip>
      </Box>

      {/* ───────────────────────── Center: Status / Hint ───────────────────────── */}
      <Box sx={{ flex: 1, minWidth: 0, textAlign: "center" }}>
        {!hasSelection ? (
          <Typography
            sx={{
              fontSize: ".70rem",
              color: NEUTRAL_DIM,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              userSelect: "none",
            }}
          >
            click to select · shift+click for range
          </Typography>
        ) : (
          <Typography
            sx={{
              fontSize: ".70rem",
              color: NEUTRAL,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              userSelect: "none",
            }}
          >
            {selectionText?.len ?? 0} bytes selected
          </Typography>
        )}
      </Box>

      {/* ───────────────────────── Right: Extraction ───────────────────────── */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        {/* Clear: contextual, low emphasis, separate from copy group */}
        {hasSelection && (
          <Tooltip title="Clear selection">
            <Button
              size="small"
              onClick={clearSelection}
              sx={{
                ...commonButtonSx,
                // “Corrective action”: de-emphasize it further.
                color: "rgba(255,255,255,0.50)",
                borderColor: "rgba(255,255,255,0.10)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.18)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  color: NEUTRAL_STRONG,
                },
              }}
            >
              clear
            </Button>
          </Tooltip>
        )}

        {/* Copy: grouped, deliberate; visible always; enabled only with selection */}
        <ButtonGroup
          size="small"
          aria-label="Copy selection"
          disabled={!hasSelection}
          sx={{
            "& .MuiButton-root": {
              ...commonButtonSx,
              // Actions should not use accent persistently; accent is for interpretation state.
              color: hasSelection ? NEUTRAL : "rgba(255,255,255,0.25)",
              "&:hover": {
                borderColor: BORDER_HOVER,
                backgroundColor: "rgba(255,255,255,0.03)",
                color: hasSelection ? NEUTRAL_STRONG : "rgba(255,255,255,0.25)",
              },
            },
          }}
        >
          <Button onClick={() => copySelection("hex")}>hex</Button>
          <Button onClick={() => copySelection("ascii")}>ascii</Button>
          <Button onClick={() => copySelection("both")}>both</Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}
