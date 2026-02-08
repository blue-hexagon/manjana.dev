import { glossary } from "./glossary";

export function useGlossaryIndex() {
  return Object.entries(glossary).map(([key, entry]) => ({
    _key: key,
    ...entry,
  }));
}

export function matchEntry(entry, query) {
  if (!query) return true;

  const q = query.toLowerCase();

  return [
    entry.term,
    entry.fullName,
    entry.definition,
    ...(entry.tags ?? []),
  ]
    .filter(Boolean)
    .some((v) => v.toLowerCase().includes(q));
}
