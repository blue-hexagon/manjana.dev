import React from "react";
import { glossary } from "./glossary";
import GlossaryTable from "./GlossaryTable";
import { GLOSSARY_TABLE_COLUMNS } from "./projections";

function toEntries(obj) {
  return Object.entries(obj).map(([key, entry]) => ({
    _key: key,
    ...entry,
  }));
}

/**
 * MDX-friendly glossary table
 *
 * Props:
 *  - columns: "quick" | "full"
 *  - kind?: string
 *  - domain?: string
 *  - tags?: string[]
 *  - includeScoped?: boolean (default true)
 *  - canonicalOnly?: boolean (default false)
 */
const GlossaryTableMDX = ({
  columns = "quick",
  kind,
  domain,
  tags,
  includeScoped = true,
  canonicalOnly = false,
}) => {
  let entries = toEntries(glossary);

  if (!includeScoped) {
    entries = entries.filter((e) => !e._key.includes("_"));
  }

  if (canonicalOnly) {
    // canonical terms = entries without `scope` and without `_` keys
    entries = entries.filter((e) => !e.scope && !e._key.includes("_"));
  }

  if (kind) {
    entries = entries.filter((e) => e.kind === kind);
  }

  if (domain) {
    entries = entries.filter((e) =>
      Array.isArray(e.domain) ? e.domain.includes(domain) : e.domain === domain
    );
  }

  if (tags?.length) {
    entries = entries.filter((e) => tags.every((t) => e.tags?.includes(t)));
  }

  const cols = GLOSSARY_TABLE_COLUMNS[columns] ?? GLOSSARY_TABLE_COLUMNS.quick;

  return <GlossaryTable entries={entries} columns={cols} />;
};

export default GlossaryTableMDX;
