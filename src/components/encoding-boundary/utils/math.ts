export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function rangeInclusive(a: number, b: number) {
  const lo = Math.min(a, b)
  const hi = Math.max(a, b)
  return { lo, hi }
}
