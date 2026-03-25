function normalizeExamples(entry) {
    if (!entry) return [];
    if (Array.isArray(entry.examples) && entry.examples.length) return entry.examples;
    if (typeof entry.example === "string" && entry.example.trim()) return [entry.example.trim()];
    return [];
}

function normalizeArray(v) {
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
}

export function projectHover(entry) {
    if (!entry?.term || !entry?.definition) return null;

    return {
        term: entry.term,
        fullName: entry.fullName ?? null,
        definition: entry.definition
    };
}

export function projectCard(entry) {
    if (!entry?.term) return null;

    const examples = normalizeExamples(entry);

    const sections = [];

    /* definition */

    if (entry.definition) {
        sections.push({
            id: "definition",
            title: "What it is",
            type: "text",
            value: entry.definition
        });
    }

    /* explanation */

    if (entry.explanation) {
        sections.push({
            id: "explanation",
            title: "How it works / How it's used",
            type: "text",
            value: entry.explanation
        });
    }

    /* examples */

    if (examples.length) {
        sections.push({
            id: "examples",
            title: examples.length > 1 ? "Examples" : "Example",
            type: "list",
            monospace: true,
            value: examples
        });
    }

    /* range (unicode etc) */

    if (entry.range) {
        sections.push({
            id: "range",
            title: "Range",
            type: "range",
            value: entry.range
        });
    }

    /* why it matters */

    if (entry.whyItMatters) {
        sections.push({
            id: "why",
            title: "Why it matters",
            type: "text",
            value: entry.whyItMatters
        });
    }

    /* appears in */

    const appears = normalizeArray(entry.appearsIn);

    if (appears.length) {
        sections.push({
            id: "appears",
            title: "Where you see it",
            type: "inline-list",
            value: appears
        });
    }

    /* RFC references */

    if (entry.rfcs?.length) {
        sections.push({
            id: "rfcs",
            title: "Relevant RFCs",
            type: "rfc-list",
            value: entry.rfcs
        });
    }

    /* classification */

    const meta = {
        kind: entry.kind ?? null,
        domain: entry.domain ?? null,
        tags: entry.tags ?? null
    };

    if (meta.kind || meta.domain?.length || meta.tags?.length) {
        sections.push({
            id: "classification",
            title: "Classification",
            type: "meta",
            value: meta
        });
    }

    return {
        header: {
            term: entry.term,
            fullName: entry.fullName ?? null,
            meta: entry.scope ? `Context: ${entry.scope}` : null
        },
        sections
    };
}

/* table columns */

export const GLOSSARY_TABLE_COLUMNS = {

    quick: [
        {key: "term", label: "Term", render: (e) => e.term},
        {key: "fullName", label: "Full name", render: (e) => e.fullName ?? "—"},
        {key: "definition", label: "Meaning", render: (e) => e.definition ?? "—"},
                {
            key: "whyItMatters",
            label: "Why it matters",
            render: (e) => e.whyItMatters ?? "—"
        },
                        {
            key: "explanation",
            label: "Explanation",
            render: (e) => e.explanation ?? "—"
        },
    ],

    full: [
        {key: "term", label: "Term", render: (e) => e.term},
        {key: "fullName", label: "Full name", render: (e) => e.fullName ?? "—"},
        {key: "definition", label: "What it is", render: (e) => e.definition ?? "—"},
        {
            key: "appearsIn",
            label: "Where you see it",
            render: (e) => e.appearsIn?.length ? e.appearsIn.join(", ") : "—"
        },
        {
            key: "whyItMatters",
            label: "Why it matters",
            render: (e) => e.whyItMatters ?? "—"
        },
        {
            key: "domain",
            label: "Domain",
            render: (e) => e.domain?.length ? e.domain.join(", ") : "—"
        },
        {
            key: "kind",
            label: "Kind",
            render: (e) => e.kind ?? "—"
        }
    ]

};