export const unicodeGlossary = {
    ASCII: {
        term: "ASCII",
        fullName: "American Standard Code for Information Interchange",
        definition:
            "7-bit character encoding defining 128 characters.",
        explanation:
            "Forms the foundational subset of Unicode and UTF-8.",
        appearsIn: ["Legacy systems", "Protocols", "Programming languages"],
        whyItMatters:
            "Unicode and UTF-8 are backward-compatible with ASCII.",
        kind: "encoding",
        domain: ["text-encoding"],
        tags: ["legacy"],
    },
    CodePoint: {
        term: "Code Point",
        definition:
            "Unique numerical identifier assigned to a Unicode character.",
        explanation:
            "Written in hexadecimal form prefixed with U+ (e.g., U+1F600).",
        examples: ["U+0041", "U+1F64F"],
        whyItMatters:
            "Separates character identity from encoding and visual representation.",
        kind: "concept",
        domain: ["unicode"],
    },
    Glyph: {
        term: "Glyph",
        definition:
            "Visual representation of a Unicode character rendered by a font.",
        explanation:
            "Multiple glyphs can represent the same code point depending on font and style.",
        whyItMatters:
            "Unicode standardizes characters, not how they look.",
        kind: "rendering",
        domain: ["fonts", "unicode"],
    },
    CodeBlock: {
        term: "Unicode Block",
        definition:
            "Contiguous range of code points allocated to related characters.",
        explanation:
            "Blocks group characters by script or function (e.g., Basic Latin).",
        examples: ["Basic Latin", "Cyrillic", "Emoticons"],
        kind: "structure",
        domain: ["unicode"],
    },
    Script: {
        term: "Script",
        definition:
            "Collection of characters used to write one or more languages.",
        explanation:
            "Unicode supports both modern and historic writing systems.",
        examples: ["Latin", "Cyrillic", "Han"],
        kind: "classification",
        domain: ["unicode"],
    },
    Symbol: {
        term: "Symbol",
        definition:
            "Character not belonging to a writing script.",
        explanation:
            "Includes emojis, mathematical operators, currency signs, and pictographs.",
        kind: "classification",
        domain: ["unicode"],
    },
    GeneralCategory: {
        term: "General Category",
        definition:
            "Unicode property classifying characters by semantic role.",
        explanation:
            "Examples include letters (L), symbols (S), marks (M), numbers (N).",
        kind: "property",
        domain: ["unicode"],
    },
    UnicodePlane: {
        term: "Unicode Plane",
        definition:
            "Subdivision of the Unicode code space into ranges of 65,536 code points.",
        explanation:
            "Each plane serves a functional or historical grouping purpose.",
        kind: "structure",
        domain: ["unicode"],
    },
    BMP: {
        term: "BMP",
        fullName: "Basic Multilingual Plane",
        definition:
            "Plane 0 of Unicode covering the most commonly used characters.",
        explanation:
            "Includes Latin, Greek, Cyrillic, CJK, and many symbols.",
        range: "U+0000–U+FFFF",
        kind: "unicode-plane",
        domain: ["unicode"],
    },
    SMP: {
        term: "SMP",
        fullName: "Supplementary Multilingual Plane",
        definition:
            "Unicode plane containing historic scripts and emojis.",
        explanation:
            "Characters here require surrogate pairs in UTF-16.",
        range: "U+10000–U+1FFFF",
        kind: "unicode-plane",
        domain: ["unicode"],
    },
    UTF8: {
        term: "UTF-8",
        definition:
            "Variable-length encoding for Unicode using 1–4 bytes.",
        explanation:
            "ASCII-compatible and dominant encoding on the web.",
        whyItMatters:
            "Efficient, interoperable, and backward-compatible.",
        kind: "encoding",
        domain: ["unicode"],
    },
    UTF16: {
        term: "UTF-16",
        definition:
            "Variable-length Unicode encoding using 2 or 4 bytes.",
        explanation:
            "Uses surrogate pairs for code points above U+FFFF.",
        kind: "encoding",
        domain: ["unicode"],
    },
    UTF32: {
        term: "UTF-32",
        definition:
            "Fixed-length Unicode encoding using 4 bytes per character.",
        explanation:
            "Simple but inefficient in storage.",
        kind: "encoding",
        domain: ["unicode"],
    },
    Normalization: {
        term: "Unicode Normalization",
        definition:
            "Process of converting text to a canonical representation.",
        explanation:
            "Ensures equivalent characters compare equal.",
        kind: "algorithm",
        domain: ["unicode"],
    },
    NFC: {
        term: "NFC",
        fullName: "Normalization Form C",
        definition:
            "Canonical composed normalization form.",
        explanation:
            "Preferred form for most text storage and exchange.",
        kind: "normalization-form",
        domain: ["unicode"],
    },
    NFD: {
        term: "NFD",
        fullName: "Normalization Form D",
        definition:
            "Canonical decomposed normalization form.",
        explanation:
            "Splits combined characters into base + combining marks.",
        kind: "normalization-form",
        domain: ["unicode"],
    },
    HomoglyphAttack: {
        term: "Homoglyph Attack",
        definition:
            "Attack using visually similar Unicode characters to deceive users.",
        explanation:
            "Common in phishing and domain impersonation.",
        whyItMatters:
            "Human visual trust does not equal Unicode equality.",
        kind: "security-issue",
        domain: ["unicode", "security"],
    },
    TrojanSource: {
        term: "Trojan Source",
        definition:
            "Attack exploiting bidirectional Unicode controls to alter code appearance.",
        explanation:
            "Can cause source code to be visually misleading while compiling differently.",
        kind: "security-issue",
        domain: ["unicode", "software-security"],
    },
    ZeroWidth: {
        term: "Zero-Width Characters",
        definition:
            "Unicode characters with no visible glyph.",
        explanation:
            "Used for control, formatting, or malicious obfuscation.",
        examples: ["U+200B", "U+200D"],
        kind: "unicode-feature",
        domain: ["unicode"],
    },
    BidiAlgorithm: {
        term: "Bidirectional Algorithm",
        definition:
            "Unicode algorithm for displaying mixed RTL and LTR text.",
        explanation:
            "Required for scripts like Arabic and Hebrew.",
        kind: "algorithm",
        domain: ["unicode"],
    },
    TextSegmentation: {
        term: "Text Segmentation",
        definition:
            "Rules for splitting text into graphemes, words, and sentences.",
        explanation:
            "Defined in Unicode TR29.",
        kind: "algorithm",
        domain: ["unicode"],
    },
}