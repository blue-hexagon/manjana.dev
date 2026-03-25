import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import {MDXTable} from "../../../theme_mdx";

const GlossaryTable = ({ entries, columns }) => {
  if (!entries?.length) return null;

  return (
      <MDXTable size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key} sx={{ fontWeight: 800 }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry._key ?? entry.term}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(entry) : entry[col.key] ?? "—"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MDXTable>
  );
};

export default GlossaryTable;
