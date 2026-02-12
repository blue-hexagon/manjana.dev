import * as React from "react"
import { Box, Divider, Typography } from "@mui/material"

export function Pipeline(props: {
  isExpanded: boolean
  source: string
  sourceEncoding: string
  sourceText: string
  target: string
  targetEncoding: string
  targetText: string
  bytes: string
  invalidCount: number
  byteCount: number
  onBytesClick: () => void
}) {
  const { source, sourceEncoding, sourceText, target, targetEncoding, targetText, bytes, invalidCount, byteCount, onBytesClick, isExpanded } = props
  if (isExpanded == false) return null
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Box>
        <Typography sx={{ color: "#00ffcc", fontSize: ".8rem" }}>
          {source} · {sourceEncoding}
        </Typography>
        <Typography sx={{ fontSize: "1.05rem" }}>{sourceText}</Typography>
      </Box>

      <Divider sx={{ opacity: 0.2 }}>
        <Typography
          sx={{
            mt: "3px",
            fontSize: ".85rem",
            opacity: 1,
            letterSpacing: ".2em",
          }}
        >
          ⇢ ENCODING BOUNDARY ⇢
        </Typography>
      </Divider>

      <Box
        sx={{
          textAlign: "center",
          cursor: "pointer",
          opacity: 0.85,
          transition: "opacity .15s",
          "&:hover": { opacity: 1 },
        }}
        onClick={onBytesClick}
      >
        <Typography
          sx={{
            fontSize: ".8rem",
            letterSpacing: ".15em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={bytes}
        >
          {bytes}
        </Typography>
        <Typography sx={{ fontSize: ".65rem", opacity: 0.5 }}>
          byte stream · click to inspect
          {invalidCount > 0 && ` · ${invalidCount} invalid`}
          {byteCount > 0 && ` · ${byteCount} bytes`}
        </Typography>
      </Box>

      <Box sx={{ textAlign: "right" }}>
        <Typography sx={{ color: "rgba(255,64,129,0.8)", fontSize: ".8rem" }}>
          {target} · {targetEncoding}
        </Typography>
        <Typography sx={{ fontSize: "1.05rem" }}>{targetText}</Typography>
      </Box>
    </Box>
  )
}
