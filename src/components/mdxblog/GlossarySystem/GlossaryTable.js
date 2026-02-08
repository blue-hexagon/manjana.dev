import React from "react";
import {glossary} from "./glossary";
import {useTermRegistry} from "./TermRegistry";
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper
} from "@mui/material";

const GlossaryTable = () => {
    const registry = useTermRegistry();
    if (!registry) return null;

    const used = registry.terms;

    if (used.length === 0) return null;

    return (
        <TableContainer component={Paper} sx={{my: 4}}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Term</TableCell>
                        <TableCell>Definition</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {used.map(name => {
                        const e = glossary[name];
                        if (!e) return null;

                        return (
                            <TableRow key={name}>
                                <TableCell sx={{fontWeight: 700}}>
                                    {e.label}
                                </TableCell>
                                <TableCell>
                                    {e.define}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GlossaryTable;
