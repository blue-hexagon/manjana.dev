import * as React from "react"
import { Box, Typography } from "@mui/material"
import type { ParsedByte } from "../../../types"
import {
  decodeBytes,
  hexToBytes,
  isPrintableAsciiChar,
} from "../../../utils/bytes"

/* ----------------------------------------
   Helpers
----------------------------------------- */

// Build per-byte display for a given encoding.
// UTF-8:
//   - lead byte → decoded character
//   - continuation bytes → ↳
// Single-byte encodings:
//   - every byte → decoded character
function buildByteDisplay(
  bytes: Uint8Array,
  encoding: string
): {
  display: string[]
  lead: boolean[]
  leadChar: (string | null)[]
} {
  const enc = (encoding || "").toLowerCase()
  const isUtf8 = enc === "utf-8" || enc === "utf8"

  const display = Array(bytes.length).fill("·")
  const lead = Array(bytes.length).fill(false)
  const leadChar = Array<(string | null)>(bytes.length).fill(null)

  // -------- Single-byte encodings --------
  if (!isUtf8) {
    let decoded = ""
    try {
      decoded = decodeBytes(bytes, encoding)
    } catch {
      return { display, lead, leadChar }
    }

    for (let i = 0; i < bytes.length; i++) {
      const ch = decoded[i] ?? ""
      const out = ch && isPrintableAsciiChar(ch) ? ch : "·"
      display[i] = out
      lead[i] = true
      leadChar[i] = ch || null
    }

    return { display, lead, leadChar }
  }

  // -------- UTF-8 (byte-span aware) --------
  const td = new TextDecoder("utf-8", { fatal: false })

  for (let i = 0; i < bytes.length; ) {
    const b0 = bytes[i]

    let len =
      b0 < 0x80 ? 1 :
      (b0 & 0xe0) === 0xc0 ? 2 :
      (b0 & 0xf0) === 0xe0 ? 3 :
      (b0 & 0xf8) === 0xf0 ? 4 :
      1

    if (i + len > bytes.length) len = 1

    const slice = bytes.slice(i, i + len)
    const ch = td.decode(slice)
    const out = ch && isPrintableAsciiChar(ch) ? ch : "·"

    // lead byte
    display[i] = out
    lead[i] = true
    leadChar[i] = ch || null

    // continuation bytes
    for (let k = 1; k < len; k++) {
      display[i + k] = "↳"
      lead[i + k] = false
      leadChar[i + k] = null
    }

    i += len
  }

  return { display, lead, leadChar }
}

/* ----------------------------------------
   Component
----------------------------------------- */

export function MapView(props: {
  hex: ParsedByte[]
  hexString: string
  sourceEncoding: string
  targetEncoding: string
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
  onByteClick: (i: number, ev: React.MouseEvent) => void
  isSelected: (i: number) => boolean
}) {
  const {
    hex,
    hexString,
    sourceEncoding,
    targetEncoding,
    hoveredIndex,
    setHoveredIndex,
    onByteClick,
    isSelected,
  } = props

  const bytes = React.useMemo(
    () => hexToBytes(hexString),
    [hexString]
  )

  // First column: decoded (correct)
  const decodedCol = React.useMemo(
    () => buildByteDisplay(bytes, sourceEncoding),
    [bytes, sourceEncoding]
  )

  // Second column: encoded / wrong interpretation
  const wrongCol = React.useMemo(
    () => buildByteDisplay(bytes, targetEncoding),
    [bytes, targetEncoding]
  )

  return (
    <>
      <Typography sx={{ fontSize: ".65rem", opacity: 0.6, mb: 1 }}>
        Same byte stream interpreted using two different encodings
      </Typography>

      <Box sx={{ fontSize: ".78rem" }}>
        {hex.map((b, i) => {
          const hovered = hoveredIndex === i
          const selected = isSelected(i)

          // Divergence only makes sense on lead bytes
          const diverges =
            decodedCol.lead[i] &&
            (decodedCol.leadChar[i] ?? "") !==
              (wrongCol.leadChar[i] ?? "")

          return (
            <Box
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={ev => onByteClick(i, ev)}
              sx={{
                display: "grid",
                gridTemplateColumns: "70px 60px 1fr 1fr",
                gap: 1,
                py: 0.25,
                px: 0.5,
                borderRadius: 1,
                background: selected
                  ? "rgba(255,64,129,0.14)"
                  : hovered
                    ? "rgba(0,255,204,0.08)"
                    : "transparent",
                opacity: b.valid ? 0.95 : 0.55,
                transition: "background .12s",
                userSelect: "none",
              }}
            >
              {/* Offset */}
              <span>{i.toString(16).padStart(4, "0")}</span>

              {/* Raw byte */}
              <span style={{ color: b.valid ? "#fff" : "#ff6b6b" }}>
                {b.valid ? b.value : "??"}
              </span>

              {/* Decoded (correct encoding) */}
              <span
                style={{
                  opacity: decodedCol.lead[i] ? 1 : 0.35,
                  fontStyle: decodedCol.lead[i] ? "normal" : "italic",
                }}
              >
                {decodedCol.display[i]}
              </span>

              {/* Encoded (wrong encoding) */}
              <span
                style={{
                  color: diverges ? "#ff7aa7" : undefined,
                  opacity: wrongCol.lead[i] ? 1 : 0.35,
                  fontStyle: wrongCol.lead[i] ? "normal" : "italic",
                }}
              >
                {wrongCol.display[i]}
              </span>
            </Box>
          )
        })}
      </Box>
    </>
  )
}
