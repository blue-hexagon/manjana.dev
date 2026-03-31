import React, {useState, useRef, useEffect} from "react"
import Navbar from "./Navbar"
import {Container, Box, IconButton} from "@mui/material"
import {useLocation} from "@reach/router"
import useMediaQuery from "@mui/material/useMediaQuery"
import {PlainIconFooter, SpecialIconFooter} from "./Footers"
import {ToCDrawer} from "./toc/ToCDrawer"
import {GlossaryContext} from "./mdxblog/GlossarySystem/GlossaryContext"
import {ToCAside} from "./toc/ToCAside"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";


function useScrollHint(timeout = 2500) {
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        let timer;

        const handleScroll = () => {
            setTimeout(() => setVisible(true), 100)


            clearTimeout(timer)
            timer = setTimeout(() => {
                setVisible(false)
            }, timeout)
        }
        window.addEventListener("scroll", handleScroll, {passive: true})


        // trigger once on mount (optional)
        handleScroll()
        return () => {
            window.removeEventListener("scroll", handleScroll)
            clearTimeout(timer)
        }
    }, [timeout])

    return visible
}

export default function Layout({children, data}) {
    const title = data?.mdx?.frontmatter?.title
    const toc = data?.mdx?.tableOfContents
    const tocDepth = data?.mdx?.frontmatter?.tocDepth ?? 2
    const glossaryPrefix = data?.mdx?.frontmatter?.glossaryPrefix ?? null

    const location = useLocation()
    const matches = useMediaQuery("(min-width:1800px)")
    const [tocCollapsed, setTocCollapsed] = useState(false)

    /* ===========================
       Resizable Width Logic
       =========================== */
    const [tocWidth, setTocWidth] = useState(420)

    useEffect(() => {
        if (typeof window === "undefined") return

        const saved = localStorage.getItem("toc-width")
        if (saved) {
            setTocWidth(Number(saved))
        }
    }, [])

    const resizingRef = useRef(false)
    const tocRef = useRef(null)
    const asideRef = React.useRef(null)

    const startResize = () => {
        if (tocCollapsed) return
        resizingRef.current = true
        document.body.style.userSelect = "none"
    }

    const stopResize = () => {
        if (!resizingRef.current) return
        resizingRef.current = false

        if (typeof window !== "undefined") {
            document.body.style.userSelect = ""
            localStorage.setItem("toc-width", String(tocWidth))
        }
    }

    const handleResize = (e) => {
        if (!resizingRef.current || !tocRef.current) return

        const rect = tocRef.current.getBoundingClientRect()

        // Distance from mouse to right edge of TOC container
        const newWidth = rect.right - e.clientX

        const clamped = Math.max(260, Math.min(newWidth, 700))
        setTocWidth(clamped)
    }
    useEffect(() => {
        if (typeof window === "undefined") return

        window.addEventListener("mousemove", handleResize)
        window.addEventListener("mouseup", stopResize)

        return () => {
            window.removeEventListener("mousemove", handleResize)
            window.removeEventListener("mouseup", stopResize)
        }
    }, [tocWidth])
    const showChevron = useScrollHint(2500)

    /* ===========================
       Layout
       =========================== */

    return (
        <Box sx={{display: "flex", flexDirection: "column", height: "100vh"}}>
            <Navbar/>

            {toc?.items && (
                <ToCDrawer title={title} toc={toc} tocDepth={tocDepth}/>
            )}

            <Box sx={{flexGrow: 1}}>
                <Container maxWidth="100vw">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: tocCollapsed ? 0 : 3,
                            transition: "gap 0.25s ease"
                        }}
                    >
                        {/* Content */}
                        <Box
                            sx={{
                                flex: 1,
                                minWidth: 0,
                                mt: 4
                            }}
                        >
                            <GlossaryContext.Provider value={glossaryPrefix}>
                                {children}
                            </GlossaryContext.Provider>
                        </Box>

                        {/* TOC Aside */}
                        {toc?.items && (
                            <>
                                <IconButton
                                    size="small"
                                    onClick={() => setTocCollapsed(v => !v)}
                                    sx={{
                                        color: "#888",
                                        position: "fixed",
                                        "&:hover": {color: "#00ffcc"},
                                        right: "1.75rem",
                                        top: "1.33rem",
                                        zIndex: 0,

                                    }}
                                    aria-label="Toggle table of contents"
                                >
                                    {tocCollapsed &&
                                        <ChevronLeftIcon className={`toc-chevron ${showChevron ? "visible" : "hidden"}`}
                                                         fontSize="small"/>}
                                </IconButton>
                                <Box
                                    ref={asideRef}
                                    sx={{

                                        width: tocCollapsed ? 0 : tocWidth,
                                        flexShrink: 0,
                                        display: {xs: "none", md: "block"},
                                        transition: "width 0.25s ease",
                                        overflowY: "auto",
                                        scrollbarWidth: "none",
                                        position: "sticky",
                                        top: 0,
                                        minHeight: 0,
                                        scrollBehavior: "smooth",
                                        scrollPaddingTop: "128px",
                                        scrollPaddingBottom: "128px",
                                    }}
                                >
                                    {/* Resize Handle */}
                                    {!tocCollapsed && (
                                        <Box
                                            onMouseDown={startResize}
                                            sx={{

                                                position: "absolute",
                                                left: 0,
                                                top: 0,
                                                width: "6px",
                                                height: "100%",
                                                cursor: "ew-resize",
                                                zIndex: 10,
                                                "&:hover": {
                                                    backgroundColor: "rgba(0,255,204,0.15)"
                                                }
                                            }}
                                        />
                                    )}

                                    <Box
                                        ref={tocRef}
                                        sx={{
                                            alignSelf: "flex-start",
                                        }}
                                    >
                                        <ToCAside
                                            containerRef={asideRef}
                                            title={title}
                                            toc={toc}
                                            tocDepth={tocDepth}
                                            collapsed={tocCollapsed}
                                            setTocCollapsed={setTocCollapsed}

                                        />
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>
                </Container>
            </Box>

            {matches ? <SpecialIconFooter/> : <PlainIconFooter/>}
        </Box>
    )
}
