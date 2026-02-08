import React from "react";
import { glossary } from "./glossary";
import { useTermRegistry } from "./TermRegistry";
import GlossaryTable from "./GlossaryTable";
import { GLOSSARY_TABLE_COLUMNS } from "./projections";

export default function PageGlossaryTable({ columns = "quick" }) {
  const registry = useTermRegistry();
  if (!registry?.termKeys?.length) return null;

  const entries = registry.termKeys
    .map((key) => ({ _key: key, ...glossary[key] }))
    .filter((e) => e.term);

  return (
    <GlossaryTable
      entries={entries}
      columns={GLOSSARY_TABLE_COLUMNS[columns] ?? GLOSSARY_TABLE_COLUMNS.quick}
    />
  );
}
