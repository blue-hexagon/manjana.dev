export type ByteGroup = 8 | 12 | 16
export type ByteView = "hex" | "raw" | "map"

export interface EncodingScenario {
  id: string
  label: string
  source: string
  sourceEncoding: string
  sourceText: string
  bytes: string
  target: string
  targetEncoding: string
  targetText: string
  description?: string
}

export interface EncodingBoundaryProps {
  scenarios: EncodingScenario[]
  initialScenarioId?: string
}

export interface ParsedByte {
  value: string
  valid: boolean
}

export interface HoveredMeta {
  index: number
  offsetHex: string
  byteHex: string
  byteDec: number | null
  ascii: string
  valid: boolean
}

export interface SelectionRange {
  lo: number
  hi: number
}

export interface SelectionText {
  hexStr: string
  asciiStr: string
  len: number
}
