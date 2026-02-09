import type { ParsedByte } from "../types"

export function parseHexBytes(bytes: string): ParsedByte[] {
  return bytes
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(p => ({
      value: p.toUpperCase(),
      valid: /^[0-9A-F]{2}$/.test(p),
    }))
}

export function isPrintableAsciiChar(ch: string) {
  return ch.length === 1 && ch >= " " && ch <= "~"
}

export function hexToDec(hex2: string): number | null {
  if (!/^[0-9A-F]{2}$/.test(hex2)) return null
  return parseInt(hex2, 16)
}

export function hexToBytes(hex: string): Uint8Array {
  const clean = hex.trim().split(/\s+/)
  return new Uint8Array(
    clean.map(b => parseInt(b, 16))
  )
}
export function decodeBytes(bytes: Uint8Array, encoding: string): string {
  try {
    return new TextDecoder(encoding.split(" ")[0], { fatal: false }).decode(bytes)
  } catch {
    return "�"
  }
}

export function isUtf8Continuation(byte: number) {
  return (byte & 0b1100_0000) === 0b1000_0000
}
export function isCombiningChar(ch: string) {
  if (!ch) return false
  const code = ch.codePointAt(0)!
  return code >= 0x0300 && code <= 0x036F
}
