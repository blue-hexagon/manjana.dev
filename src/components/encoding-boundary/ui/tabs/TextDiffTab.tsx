import * as React from "react"
import { Box, Typography } from "@mui/material"

export function TextDiffTab(props: { sourceText: string; targetText: string }) {
  const { sourceText, targetText } = props

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2,
        mt: 1,
      }}
    >
      <Box>
        <Typography sx={{ fontSize: ".7rem", opacity: 0.6, mb: 0.5, ml: 0.8 }}>
          Good Encoding
        </Typography>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 1,
            borderRadius: 0,
            background: "rgba(50,50,50,0.25)",
            overflowX: "auto",
          }}
        >
          {sourceText}
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontSize: ".7rem", opacity: 0.6, mb: 0.5, ml: 0.8 }}>
          Bad Encoding
        </Typography>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 1,
            borderRadius: 0,
            background: "rgba(50,50,50,0.25)",
            overflowX: "auto",
          }}
        >
          {targetText == "" ? "<None>" : targetText}
        </Box>
      </Box>
    </Box>
  )
}
