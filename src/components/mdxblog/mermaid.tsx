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

interface MermaidProps {
    chart: string
    props: string[] | null
    highlightRows?: number[]
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

export default function Mermaid({chart, props}: MermaidProps) {
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

                const patched = patchPacketSvg(svg, props?.highlightRows || [])

                if (!cancelled) setRawSvg(patched)

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

        if (typeof window === "undefined") return

        const init = async () => {
            const svgPanZoom = (await import("svg-pan-zoom")).default

            const container = document.getElementById(modalContainerId.current)
            if (!container) return

            const svgElement = container.querySelector("svg")
            if (!(svgElement instanceof SVGSVGElement)) return

            const inst = svgPanZoom(svgElement, {
                zoomEnabled: true,
                controlIconsEnabled: false,
                fit: true,
                center: true,
                contain: false,
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
        }

        init()

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
                    className="mermaid-root"
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

function patchPacketSvg(svg: string, highlightRows: number[] = []) {
    if (typeof window === "undefined") return svg

    try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(svg, "image/svg+xml")
        const svgEl = doc.querySelector("svg")
        if (!svgEl) return svg

        // --------------------------------------------------
        // FIND ROWS (groups containing packet blocks)
        // --------------------------------------------------
        const rows = [...doc.querySelectorAll("g")].filter(g =>
            g.querySelector("rect.packetBlock")
        )

        // 🔥 GLOBAL BIT CURSOR (incremental model)
        let bitCursor = 0

        rows.forEach((row, rowIndex) => {
            const rects = [...row.querySelectorAll("rect.packetBlock")] as SVGRectElement[]
            // --------------------------------------------------
            if (highlightRows.includes(rowIndex)) {
                row.setAttribute("class", (row.getAttribute("class") || "") + " packetRowHighlight")
            }
            if (rects.length === 0) return

            // --------------------------------------------------
            // GEOMETRY BASELINE
            // --------------------------------------------------
            const totalWidth = rects.reduce((sum, r) =>
                sum + parseFloat(r.getAttribute("width")!), 0
            )

            const bitsPerRow = 32
            const pxPerBit = totalWidth / bitsPerRow

            let localCursor = bitCursor

            // --------------------------------------------------
            // 🧱 PER-RECT START/END LABELS (INSIDE BLOCKS)
            // --------------------------------------------------
            rects.forEach(rect => {
                const x = parseFloat(rect.getAttribute("x")!)
                const y = parseFloat(rect.getAttribute("y")!)
                const width = parseFloat(rect.getAttribute("width")!)
                const height = parseFloat(rect.getAttribute("height")!)

                const bits = Math.round(width / pxPerBit)

                const startBit = localCursor
                const endBit = localCursor + bits - 1

                const createText = (
                    text: string,
                    tx: number,
                    anchor: "start" | "end"
                ) => {
                    const el = doc.createElementNS("http://www.w3.org/2000/svg", "text")
                    el.setAttribute("x", String(tx))
                    el.setAttribute("y", String(y + 12)) // inside block (top padding)
                    el.setAttribute("text-anchor", anchor)
                    el.setAttribute("class", "packetByte")
                    el.textContent = text
                    return el
                }

                // LEFT (start)
                const startLabel = createText(String(startBit), x + 4, "start")

                // RIGHT (end)
                const endLabel = createText(String(endBit), x + width - 4, "end")

                rect.parentNode?.appendChild(startLabel)
                rect.parentNode?.appendChild(endLabel)

                localCursor += bits
            })

            // --------------------------------------------------
            // 📏 RULER (ONLY FIRST ROW)
            // --------------------------------------------------
            if (rowIndex === 0) {
                const firstRect = rects[0]
                const lastRect = rects[rects.length - 1]

                const xStart = parseFloat(firstRect.getAttribute("x")!)
                const xEnd =
                    parseFloat(lastRect.getAttribute("x")!) +
                    parseFloat(lastRect.getAttribute("width")!)

                const y = parseFloat(firstRect.getAttribute("y")!) - 2
                const totalWidth = xEnd - xStart

                const majorStep = 8
                const minorStep = 4
                const step = totalWidth / bitsPerRow

                const rulerGroup = doc.createElementNS("http://www.w3.org/2000/svg", "g")
                rulerGroup.setAttribute("class", "packetRuler")

                for (let i = 0; i <= bitsPerRow; i += minorStep) {
                    const x = xStart + i * step
                    const isMajor = i % majorStep === 0

                    // --- Tick ---
                    const tick = doc.createElementNS("http://www.w3.org/2000/svg", "line")
                    tick.setAttribute("x1", String(x))
                    tick.setAttribute("x2", String(x))
                    tick.setAttribute("y1", String(y))
                    tick.setAttribute("y2", String(y - (isMajor ? 5 : 3)))
                    tick.setAttribute("class", isMajor ? "packetTickMajor" : "packetTickMinor")

                    rulerGroup.appendChild(tick)

                    // --- Label ---
                    if (isMajor) {
                        const label = doc.createElementNS("http://www.w3.org/2000/svg", "text")

                        label.setAttribute("x", String(x))
                        label.setAttribute("y", String(y - 6))
                        label.setAttribute("text-anchor", "middle")
                        label.setAttribute("class", "packetRulerLabel")
                        label.textContent = String(i)

                        rulerGroup.appendChild(label)
                    }
                }

                row.appendChild(rulerGroup)
            }

            // --------------------------------------------------
            // ADVANCE GLOBAL CURSOR
            // --------------------------------------------------
            bitCursor += bitsPerRow
        })

        return new XMLSerializer().serializeToString(svgEl)
    } catch {
        return svg
    }
}