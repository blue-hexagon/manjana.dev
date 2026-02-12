import * as React from "react"
import { Box } from "@mui/material"

export function BoundaryShell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      role="figure"
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0, // important for nested scrolling
        p: 3,
        borderRadius: 2,
        border: "1px solid #1f1f1f",
        background: "#0b0b0b",
        fontFamily: `'Fira Code', monospace`,
      }}
    >
      {children}
    </Box>
  )
}
