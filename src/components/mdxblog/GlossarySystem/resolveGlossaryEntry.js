import { glossary } from "./glossary";

/**
 * Resolve a glossary entry by term and optional context.
 *
 * Strategy:
 *  - If context is given, try `${name}_${context}` first (e.g., DNS_SAN).
 *  - Fallback to canonical name (e.g., DNS).
 */
export function resolveGlossaryEntry(name, context) {
  if (!name) return null;

  if (context) {
    const scopedKey = `${name}_${context}`;
    if (glossary[scopedKey]) return { key: scopedKey, entry: glossary[scopedKey] };
  }

  if (glossary[name]) return { key: name, entry: glossary[name] };

  return null;
}
