interface IntlSegmenter {
  segment(input: string): Iterable<{ segment: string }>
}

interface Intl {
  Segmenter: {
    new (
      locales?: string | string[],
      options?: { granularity: "grapheme" | "word" | "sentence" }
    ): IntlSegmenter
  }
}