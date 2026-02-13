import {useEffect, useRef, useState} from "react"

const NAVBAR_HEIGHT = 64
const READ_OFFSET = 24

export const useScrollSpy = (allowedIds: Set<string>) => {
    const [activeId, setActiveId] = useState<string | null>(null)
    const headingsRef = useRef<{ id: string; top: number }[]>([])
    const lastActiveRef = useRef<string | null>(null)


    useEffect(() => {
        if (!allowedIds || allowedIds.size === 0) return

        const collectHeadings = () => {
            const headings = Array.from(
                document.querySelectorAll<HTMLElement>("h2, h3, h4")
            ).filter(h => h.id && allowedIds.has(h.id))

            headingsRef.current = headings
                .map(h => ({
                    id: h.id,
                    top: h.getBoundingClientRect().top + window.scrollY,
                }))
                .sort((a, b) => a.top - b.top)

            // Initialize to first heading
            if (headingsRef.current.length) {
                const firstId = headingsRef.current[0].id
                lastActiveRef.current = firstId
                setActiveId(firstId)
            }
        }

        const onScroll = () => {
            const scrollY =
                window.scrollY + NAVBAR_HEIGHT + READ_OFFSET + 1

            let current: string | null = null

            for (const h of headingsRef.current) {
                if (scrollY >= h.top) {
                    current = h.id
                } else {
                    break
                }
            }

            if (!current && headingsRef.current.length) {
                current = headingsRef.current[0].id
            }

            if (current && current !== lastActiveRef.current) {
                lastActiveRef.current = current
                setActiveId(current)
            }
        }

        const onHashChange = () => {
            const id = window.location.hash.replace("#", "")
            if (id && allowedIds.has(id)) {
                lastActiveRef.current = id
                setActiveId(id)
            }
        }

        collectHeadings()
        onScroll()

        window.addEventListener("scroll", onScroll, {passive: true})
        window.addEventListener("resize", collectHeadings)
        window.addEventListener("hashchange", onHashChange)

        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", collectHeadings)
            window.removeEventListener("hashchange", onHashChange)
        }
    }, [allowedIds])

    return activeId
}
