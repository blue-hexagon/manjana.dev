import * as React from "react"
import {
    Box,
    Button,
    Chip, IconButton,
    MenuItem,
    Select,
    Tooltip,
} from "@mui/material"
import type {EncodingScenario} from "../types"
import {FiMaximize2, FiMinimize2} from "react-icons/fi"
import {PiBinoculars, PiBinocularsFill} from "react-icons/pi";
import {AiFillAlert, AiOutlineAlert} from "react-icons/ai";

export function HeaderBar(props: {
    differs: boolean
    scenarios: EncodingScenario[]
    scenarioId: string | undefined
    setScenarioId: (id: string) => void
    onNextScenario: (id: string) => void
    expanded: boolean
    toggleExpanded: () => void
    onDiffClick: () => void
    onToggleFullscreen: () => void
    togglePipeLineExpanded: () => void
    fullscreen: boolean
    pipeLineExpanded: boolean

}) {
    const {
        differs,
        scenarios,
        scenarioId,
        setScenarioId,
        onNextScenario,
        expanded,
        toggleExpanded,
        onDiffClick,
        onToggleFullscreen,
        togglePipeLineExpanded,
        pipeLineExpanded,
        fullscreen
    } = props

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
            }}
        >
            {/* Left cluster: diff + scenario navigation */}
            <Box sx={{display: "flex", gap: 1.25, alignItems: "center"}}>
                {differs && (
                    <Tooltip title="View diff">
                        <Chip
                            size="small"
                            label="diff"
                            onClick={onDiffClick}
                            sx={{
                                cursor: "pointer",
                                bgcolor: "rgba(255,64,129,.15)",
                                color: "#ff7aa7",
                                fontSize: "0.7rem",
                            }}
                        />
                    </Tooltip>
                )}

                {/* Scenario select */}
                <Select
                    size="small"
                    value={scenarioId}
                    onChange={e => setScenarioId(String(e.target.value))}
                    sx={{fontSize: ".75rem", minWidth: 220}}
                >
                    {scenarios.map(s => (
                        <MenuItem key={s.id} value={s.id}>
                            {s.label}
                        </MenuItem>
                    ))}
                </Select>

                {/* Next scenario */}
                <Button
                    size="small"
                    disabled={!scenarioId}
                    onClick={() => {
                        if (scenarioId) onNextScenario(scenarioId)
                    }}
                    sx={{
                        fontSize: ".75rem",
                        textTransform: "none",
                        color: "rgba(255,255,255,0.55)",
                        minWidth: "auto",
                        px: 0.5,

                        "&:hover": {
                            color: "#00ffcc",
                            background: "transparent",
                        },

                        "&:focus-visible": {
                            outline: "1px solid rgba(0,255,204,0.6)",
                            outlineOffset: "2px",
                        },

                        "&.Mui-disabled": {
                            color: "rgba(255,255,255,0.25)",
                        },
                    }}
                >
                    Next →
                </Button>
            </Box>

            {/* Right cluster: inspector toggle */}
            <Box>
                <IconButton
                    size="small"
                    onClick={togglePipeLineExpanded}
                    sx={{color: pipeLineExpanded ? "" : "#ffcc00"}}
                >
                    {pipeLineExpanded ? (
                        <AiOutlineAlert size={14}/>
                    ) : (
                        <AiFillAlert size={14}/>
                    )}
                </IconButton>
                <IconButton
                    size="small"
                    onClick={toggleExpanded}
                    sx={{color: expanded ? "" : "#ffcc00"}}
                >
                    {expanded ? (
                        <PiBinocularsFill size={14}/>
                    ) : (
                        <PiBinoculars size={14}/>
                    )}
                </IconButton>
                <Tooltip title={fullscreen ? "Exit fullscreen" : "Fullscreen"}>
                    <IconButton
                        size="small"
                        onClick={onToggleFullscreen}

                    >
                        {fullscreen ? (
                            <FiMinimize2 size={14}/>
                        ) : (
                            <FiMaximize2 size={14}/>
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}
