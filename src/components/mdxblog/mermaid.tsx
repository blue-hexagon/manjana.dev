import React, {useEffect, useMemo, useRef, useState} from "react"
import {
    Box,
    Fade,
    IconButton,
    Modal,
    Tooltip,
    Typography,
} from "@mui/material"
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap"
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import svgPanZoom from "svg-pan-zoom"

interface MermaidProps {
    chart: string
}

/* --------------------------------------------------
   Remove ONLY layout constraints (keep Mermaid ID!)
-------------------------------------------------- */
function normalizeModalSvg(svg: string) {
    if (typeof window === "undefined") return svg

    try {

        const parser = new DOMParser()
        const doc = parser.parseFromString(svg, "image/svg+xml")
        const el = doc.querySelector("svg")
        if (!el.getAttribute("viewBox")) {
            const width = el.getAttribute("width") || 1000
            const height = el.getAttribute("height") || 1000
            el.setAttribute("viewBox", `0 0 ${width} ${height}`)
        }
        if (!el) return svg

        // Remove fixed sizing
        el.removeAttribute("width")
        el.removeAttribute("height")

        const style = el.getAttribute("style") || ""

        const cleaned = style
            .replace(/max-width\s*:\s*[^;]+;?/gi, "")
            .replace(/width\s*:\s*[^;]+;?/gi, "")
            .replace(/height\s*:\s*[^;]+;?/gi, "")
            .trim()

        if (cleaned) el.setAttribute("style", cleaned)
        else el.removeAttribute("style")

        el.style.display = "block"
        el.style.overflow = "hidden"

        return new XMLSerializer().serializeToString(el)
    } catch {
        return svg
    }
}

export default function Mermaid({chart}: MermaidProps) {
    const modalContainerId = useRef(
        `mermaid-modal-container-${Math.random().toString(36).slice(2)}`
    )

    const panZoomRef = useRef<any>(null)

    const [open, setOpen] = useState(false)
    const [panZoomReady, setPanZoomReady] = useState(false)
    const [rawSvg, setRawSvg] = useState("")
    const [zoomPct, setZoomPct] = useState(100)

    /* --------------------------------------------------
       Render Mermaid
    -------------------------------------------------- */
    useEffect(() => {
        let cancelled = false

        const render = async () => {
            if (typeof window === "undefined") return

            const mermaid = (await import("mermaid")).default

            try {
                const id = `mermaid-inline-${Math.random()
                    .toString(36)
                    .slice(2)}`

                const {svg} = await mermaid.render(id, chart)

                if (!cancelled) setRawSvg(svg)
            } catch (err) {
                console.error("Mermaid render error:", err)
            }
        }

        render()

        return () => {
            cancelled = true
        }
    }, [chart])

    const inlineSvg = rawSvg

    const modalSvg = useMemo(() => {
        return normalizeModalSvg(rawSvg)
    }, [rawSvg])

    /* --------------------------------------------------
       Initialize svg-pan-zoom
    -------------------------------------------------- */
    useEffect(() => {
        if (!panZoomReady) {
            if (panZoomRef.current) {
                panZoomRef.current.destroy()
                panZoomRef.current = null
            }
            return
        }

        const container = document.getElementById(modalContainerId.current)
        if (!container) return

        const svgElement = container.querySelector("svg")
        if (!(svgElement instanceof SVGSVGElement)) return


        // @ts-ignore
        const inst = svgPanZoom(svgElement, {
            zoomEnabled: true,
            controlIconsEnabled: false,
            fit: true,        // ← important
            center: true,
            contain: false,   // ← disable this
            minZoom: 0.2,
            maxZoom: 8,
            zoomScaleSensitivity: 0.2,
            dblClickZoomEnabled: true,
            smoothScroll: true,
        })
        panZoomRef.current = inst

        requestAnimationFrame(() => {
            inst.resize()
            inst.center()
            setZoomPct(Math.round(inst.getZoom() * 100))
        })

        return () => {
            if (panZoomRef.current) {
                panZoomRef.current.destroy()
                panZoomRef.current = null
            }
        }
    }, [panZoomReady, modalSvg])

    /* --------------------------------------------------
       Controls
    -------------------------------------------------- */
    const zoomIn = () => {
        const inst = panZoomRef.current
        if (!inst) return
        inst.zoomIn()
        setZoomPct(Math.round(inst.getZoom() * 100))
    }

    const zoomOut = () => {
        const inst = panZoomRef.current
        if (!inst) return
        inst.zoomOut()
        setZoomPct(Math.round(inst.getZoom() * 100))
    }

    const resetView = () => {
        const inst = panZoomRef.current
        if (!inst) return
        inst.resetZoom()
        inst.center()
        setZoomPct(Math.round(inst.getZoom() * 100))
    }

    /* --------------------------------------------------
       Keyboard shortcuts
    -------------------------------------------------- */
    useEffect(() => {
        if (!open) return

        const handleKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    setOpen(false)
                    break
                case "+":
                case "=":
                    zoomIn()
                    break
                case "-":
                    zoomOut()
                    break
                case "0":
                    resetView()
                    break
            }
        }

        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [open])

    return (
        <>
            {/* Inline */}
            <Box
                sx={{
                    position: "relative",
                    background: "rgba(14,17,23,0.85)",
                    borderRadius: "14px",
                    padding: "1.75rem",
                    margin: "2.5rem 0",
                    overflowX: "auto",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        "& svg": {
                            width: "auto",
                            height: "auto",
                            maxWidth: "100%",
                            display: "block",
                        },
                    }}
                    dangerouslySetInnerHTML={{__html: inlineSvg}}
                />

                <Tooltip title="Open fullscreen">
                    <IconButton
                        onClick={() => setOpen(true)}
                        sx={{position: "absolute", top: 16, right: 16}}
                    >
                        <ZoomOutMapIcon/>
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Modal */}
            <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
                <Fade
                    in={open}
                    timeout={180}
                    onEntered={() => setPanZoomReady(true)}
                    onExited={() => setPanZoomReady(false)}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                                "radial-gradient(circle at center, #111827 0%, #0E1117 75%)",
                            padding: 3,
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: "100vw",
                                height: "100vh",
                                borderRadius: "14px",
                                overflow: "hidden",
                                background: "rgba(14,17,23,0.55)",
                            }}
                        >
                            <Box
                                id={modalContainerId.current}
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    overflow: "hidden",
                                    "& svg": {
                                        width: "100%",
                                        height: "100%",
                                        display: "block",
                                    },
                                }}
                                dangerouslySetInnerHTML={{__html: modalSvg}}
                            />

                            {/* Controls */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: 16,
                                    bottom: 16,
                                    display: "flex",
                                    gap: 1,
                                }}
                            >
                                <IconButton onClick={zoomIn}>
                                    <AddIcon/>
                                </IconButton>
                                <IconButton onClick={zoomOut}>
                                    <RemoveIcon/>
                                </IconButton>
                                <IconButton onClick={resetView}>
                                    <RestartAltIcon/>
                                </IconButton>
                            </Box>

                            <IconButton
                                onClick={() => setOpen(false)}
                                sx={{position: "absolute", top: 16, right: 16}}
                            >
                                <CloseIcon/>
                            </IconButton>

                            <Box sx={{position: "absolute", top: 16, left: 16}}>
                                <Typography sx={{fontSize: 12}}>
                                    Zoom: {zoomPct}%
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}
