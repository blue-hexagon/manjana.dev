import * as React from "react"
import type { SelectionRange } from "../types"
import { clamp, rangeInclusive } from "../utils/math"

export function useByteSelection(byteCount: number) {
  const [hoveredByte, setHoveredByte] = React.useState<number | null>(null)
  const [selAnchor, setSelAnchor] = React.useState<number | null>(null)
  const [selFocus, setSelFocus] = React.useState<number | null>(null)

  const clampedHover = React.useMemo(() => {
    if (hoveredByte == null) return null
    return clamp(hoveredByte, 0, Math.max(0, byteCount - 1))
  }, [hoveredByte, byteCount])

  const selection: SelectionRange | null = React.useMemo(() => {
    if (selAnchor == null || selFocus == null) return null
    if (byteCount <= 0) return null
    const a = clamp(selAnchor, 0, byteCount - 1)
    const b = clamp(selFocus, 0, byteCount - 1)
    const { lo, hi } = rangeInclusive(a, b)
    return { lo, hi }
  }, [selAnchor, selFocus, byteCount])

  const isSelected = React.useCallback(
    (index: number) => {
      if (!selection) return false
      return index >= selection.lo && index <= selection.hi
    },
    [selection]
  )

  const onByteClick = React.useCallback(
    (index: number, ev: React.MouseEvent) => {
      if (byteCount <= 0) return
      const idx = clamp(index, 0, byteCount - 1)

      if (ev.shiftKey && selAnchor != null) {
        setSelFocus(idx)
        return
      }

      setSelAnchor(idx)
      setSelFocus(idx)
    },
    [byteCount, selAnchor]
  )

  const clearSelection = React.useCallback(() => {
    setSelAnchor(null)
    setSelFocus(null)
  }, [])

  const reset = React.useCallback(() => {
    setHoveredByte(null)
    setSelAnchor(null)
    setSelFocus(null)
  }, [])

  return {
    hoveredByte,
    setHoveredByte,
    clampedHover,
    selAnchor,
    selection,
    isSelected,
    onByteClick,
    clearSelection,
    reset,
  }
}
