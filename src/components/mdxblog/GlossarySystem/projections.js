function normalizeExamples(entry) {
  if (!entry) return [];
  if (Array.isArray(entry.examples) && entry.examples.length) return entry.examples;
  if (typeof entry.example === "string" && entry.example.trim()) return [entry.example.trim()];
  return [];
}

export function projectHover(entry) {
  // Hover should never render empty / low-value info
  if (!entry?.term || !entry?.definition) return null;

  return {
    term: entry.term,
    fullName: entry.fullName ?? null,
    definition: entry.definition,
  };
}

export function projectCard(entry) {
  if (!entry?.term) return null;

  const examples = normalizeExamples(entry);

  return {
    header: {
      term: entry.term,
      fullName: entry.fullName ?? null,
      // Optional: show scope in header if present
      meta: entry.scope ? `Context: ${entry.scope}` : null,
    },

    sections: [
      entry.definition && {
        id: "definition",
        title: "What it is",
        type: "text",
        value: entry.definition,
      },

      entry.explanation && {
        id: "explanation",
        title: "Details",
        type: "text",
        value: entry.explanation,
      },

      examples.length && {
        id: "examples",
        title: examples.length > 1 ? "Examples" : "Example",
        type: "list",
        monospace: true,
        value: examples,
      },

      entry.whyItMatters && {
        id: "why",
        title: "Why it matters",
        type: "text",
        value: entry.whyItMatters,
      },

      entry.appearsIn?.length && {
        id: "appears",
        title: "Where you see it",
        type: "inline-list",
        value: entry.appearsIn,
      },
      entry.rfcs?.length && {
  id: "rfcs",
  title: "Relevant RFCs",
  type: "rfc-list",
  value: entry.rfcs,
},

    ].filter(Boolean),
  };
}

export const GLOSSARY_TABLE_COLUMNS = {
  quick: [
    { key: "term", label: "Term", render: (e) => e.term },
    { key: "definition", label: "Meaning", render: (e) => e.definition ?? "—" },
  ],

  full: [
    { key: "term", label: "Term", render: (e) => e.term },
    { key: "fullName", label: "Full name", render: (e) => e.fullName ?? "—" },
    { key: "definition", label: "What it is", render: (e) => e.definition ?? "—" },
    {
      key: "appearsIn",
      label: "Where you see it",
      render: (e) => (e.appearsIn?.length ? e.appearsIn.join(", ") : "—"),
    },
    {
      key: "whyItMatters",
      label: "Why it matters",
      render: (e) => e.whyItMatters ?? "—",
    },
  ],
};
