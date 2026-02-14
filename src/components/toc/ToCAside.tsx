import React, {useEffect} from "react"
import {Box, IconButton, Typography} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import {ToCList} from "./ToCList"
import {useScrollSpy} from "./useScrollSpy"
import {extractTocIds, filterTocByDepth} from "./tocUtils"

interface ToCAsideProps {
    title: string
    toc: { items?: any[] }
    tocDepth?: number
    collapsed: boolean
    onToggle: () => void
}

export const ToCAside: React.FC<ToCAsideProps> = ({
                                                      title,
                                                      toc,
                                                      tocDepth,
                                                      collapsed,
                                                      onToggle
                                                  }) => {
    const depth = Math.max(2, tocDepth ?? 2)
    const filteredItems = filterTocByDepth(toc.items, depth)
    const allowedIds = extractTocIds(filteredItems)
    const activeId = useScrollSpy(allowedIds)

    return (
        <Box

            component="aside"
            sx={{
                borderLeft: collapsed
                    ? "none"
                    : "1px solid rgba(255,255,255,0.08)",
                pl: collapsed ? 0 : 3,
                pr: 0,
                height: "100vh",
                transition: "all 0.25s ease",

            }}
        >
            {/* Header Row */}
            <Box
                sx={{
                    position: "relative",
                    mx: collapsed ? "0" : "0",
                    px: collapsed ? "0" : "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "space-between",
                    mb: 2,
                }}
            >
                {!collapsed && (
                    <Typography
                        variant="subtitle2"
                        sx={{
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            pt: 3,
                            color: "#888"
                        }}
                    >
                        On this page
                    </Typography>
                )}
            </Box>

            {/* TOC List */}
            {!collapsed && (
                <ToCList items={filteredItems} activeId={activeId}/>
            )}
        </Box>
    )
}
