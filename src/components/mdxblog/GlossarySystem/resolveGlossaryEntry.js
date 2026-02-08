import { glossary } from "./glossary";

/**
 * Resolve a glossary entry by term and optional prefix.
 *
 * Strategy:
 *  - If prefix is given, try `${prefix}_${name}` first (e.g., TLS_SAN).
 *  - Fallback to canonical name (e.g., SAN).
 */
export function resolveGlossaryEntry(name, prefix) {
  if (!name) return null;

  if (prefix) {
    const scopedKey = `${prefix}_${name}`;
    if (glossary[scopedKey]) {
      return { key: scopedKey, entry: glossary[scopedKey] };
    }
  }

  if (glossary[name]) {
    return { key: name, entry: glossary[name] };
  }

  return null;
}
