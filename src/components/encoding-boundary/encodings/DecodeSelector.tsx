import {
    Button,
    ButtonGroup,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material"
import * as React from "react"
import {DecodeEncoding} from "./DecodeEncoding";
import {ENCODINGS} from "./EncodingRegistry";
import {ListSubheader} from "@mui/material"

import {Dispatch, SetStateAction} from "react"

interface DecodeSelectorProps {
    value: DecodeEncoding
    onChange: Dispatch<SetStateAction<DecodeEncoding>>
}

function groupBy<T, K extends string>(
    items: T[],
    keyFn: (item: T) => K
): Record<K, T[]> {
    return items.reduce((acc, item) => {
        const key = keyFn(item)
        if (!acc[key]) acc[key] = []
        acc[key].push(item)
        return acc
    }, {} as Record<K, T[]>)
}

export function DecodeSelector({value, onChange}: DecodeSelectorProps) {
    const common = ENCODINGS.filter(e => e.common)
    const grouped = groupBy(ENCODINGS, e => e.group)

    return (
        <Stack spacing={1} direction="row">
            {/* Fast path */}
            <ButtonGroup size="small">
                {common.map(enc => (
                    <Button
                        key={enc.id}
                        variant={value === enc.id ? "contained" : "outlined"}
                        onClick={() => onChange(enc.id)}
                    >
                        {enc.label}
                    </Button>
                ))}
            </ButtonGroup>

            {/* Expert selector */}
            <Select
                size="small"
                value={value}
                onChange={e => onChange(e.target.value as DecodeEncoding)}
                sx={{maxWidth: 360}}
            >
                {Object.entries(grouped).map(([group, items]) => (
                    <React.Fragment key={group}>
                        <ListSubheader>
                            <Typography variant="caption" sx={{opacity: 0.7}}>
                                {group}
                            </Typography>
                        </ListSubheader>

                        {items.map(enc => (
                            <MenuItem key={enc.id} value={enc.id}>
                                <Stack>
                                    <Typography variant="body2">
                                        {enc.label}
                                        {enc.risk === "high" && "⚠️️"}
                                    </Typography>
                                    <Typography variant="caption" sx={{opacity: 0.7}}>
                                        {enc.description}
                                    </Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                    </React.Fragment>
                ))}
            </Select>
        </Stack>
    )
}
