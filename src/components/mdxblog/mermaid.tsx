import React, { useEffect, useMemo, useRef, useState } from "react"
import { Box, Fade, IconButton, Modal, Tooltip, Typography } from "@mui/material"
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
   Normalize ONLY modal SVG
-------------------------------------------------- */
function normalizeModalSvg(svg: string, id: string) {
  if (typeof window === "undefined") return svg

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svg, "image/svg+xml")
    const el = doc.querySelector("svg")
    if (!el) return svg

    el.removeAttribute("width")
    el.removeAttribute("height")
    el.setAttribute("id", id)
    el.style.display = "block"

    return new XMLSerializer().serializeToString(el)
  } catch {
    return svg
  }
}

export default function Mermaid({ chart }: MermaidProps) {
  const modalSvgId = useRef(
    `mermaid-modal-${Math.random().toString(36).slice(2)}`
  )

  const panZoomRef = useRef<any>(null)

  const [open, setOpen] = useState(false)
  const [panZoomReady, setPanZoomReady] = useState(false)
  const [rawSvg, setRawSvg] = useState("")
  const [zoomPct, setZoomPct] = useState(100)

  /* --------------------------------------------------
     Render Mermaid (raw SVG)
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
        const { svg } = await mermaid.render(id, chart)
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

  /* --------------------------------------------------
     Split inline and modal SVG
  -------------------------------------------------- */
  const inlineSvg = rawSvg

  const modalSvg = useMemo(() => {
    return normalizeModalSvg(rawSvg, modalSvgId.current)
  }, [rawSvg])

  /* --------------------------------------------------
     Attach svg-pan-zoom AFTER modal fully entered
  -------------------------------------------------- */
  useEffect(() => {
    if (!panZoomReady) {
      if (panZoomRef.current) {
        panZoomRef.current.destroy()
        panZoomRef.current = null
      }
      return
    }

    const svgElement = document.getElementById(modalSvgId.current)
    if (!svgElement) return

    // Ensure correct sizing
    svgElement.style.width = "100%"
    svgElement.style.height = "100%"

    const inst = svgPanZoom(svgElement, {
      zoomEnabled: true,
      controlIconsEnabled: false,
      fit: true,
      center: true,
      minZoom: 0.25,
      maxZoom: 6,
      zoomScaleSensitivity: 0.2,
      dblClickZoomEnabled: true,
      smoothScroll: true,
    })

    panZoomRef.current = inst

    // Force layout recalculation
    setTimeout(() => {
      inst.resize()
      inst.fit()
      inst.center()
      setZoomPct(Math.round(inst.getZoom() * 100))
    }, 50)

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
    inst.fit()
    inst.center()
    setZoomPct(Math.round(inst.getZoom() * 100))
  }

  /* --------------------------------------------------
     Keyboard shortcuts
  -------------------------------------------------- */
  useEffect(() => {
    if (!open) return

    const handleKey = (e: KeyboardEvent) => {
      const inst = panZoomRef.current
      if (!inst) return

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
      {/* Inline Diagram */}
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
            "& svg": {
              width: "100%",
              height: "auto",
            },
          }}
          dangerouslySetInnerHTML={{ __html: inlineSvg }}
        />

        <Tooltip title="Open fullscreen">
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10,
            }}
          >
            <ZoomOutMapIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Fullscreen Modal */}
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
                width: "95vw",
                height: "95vh",
                borderRadius: "14px",
                overflow: "hidden",
                background: "rgba(14,17,23,0.55)",
              }}
            >
              {/* Modal SVG */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  "& svg": {
                    width: "100%",
                    height: "100%",
                    display: "block",
                  },
                }}
                dangerouslySetInnerHTML={{ __html: modalSvg }}
              />

              {/* Controls */}
              <Box
                sx={{
                  position: "absolute",
                  right: 16,
                  bottom: 16,
                  zIndex: 10,
                  display: "flex",
                  gap: 1,
                }}
              >
                <IconButton onClick={zoomIn}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={zoomOut}>
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={resetView}>
                  <RestartAltIcon />
                </IconButton>
              </Box>

              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 10,
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  zIndex: 10,
                }}
              >
                <Typography sx={{ fontSize: 12 }}>
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
