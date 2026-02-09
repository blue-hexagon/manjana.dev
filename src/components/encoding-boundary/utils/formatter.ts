export type FByteView = "hex" | "hex0x" | "binary" | "decimal"

type Formatter = {
    map: (b: number) => string
    joiner?: (i: number) => string
}

const FORMATTERS: Record<FByteView, Formatter> = {
    hex: {
        map: b => b.toString(16).padStart(2, "0").toUpperCase(),
        joiner: () => " ",
    },

    hex0x: {
        map: b => "0x" + b.toString(16).padStart(2, "0").toUpperCase(),
        joiner: () => " ",
    },

    binary: {
        map: b => b.toString(2).padStart(8, "0"),
        joiner: () => " ",
    },

    decimal: {
        map: b => b.toString(10), // ← NO padding, NO spaces
    },
}

export function formatBytes(bytes: Uint8Array, view: FByteView): string {
    const fmt = FORMATTERS[view]
    if (!fmt) return ""

    return Array.from(bytes)
        .map(b => fmt.map(b))
        .join(" ")
}
