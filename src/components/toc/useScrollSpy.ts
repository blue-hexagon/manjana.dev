import { useEffect, useRef, useState } from "react"

const NAVBAR_HEIGHT = 64
const READ_OFFSET = 24

export const useScrollSpy = (allowedIds: Set<string>) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const headingsRef = useRef<{ id: string; top: number }[]>([])
  const lastActiveRef = useRef<string | null>(null)

  useEffect(() => {
    const collectHeadings = () => {
const headings = Array.from(
  document.querySelectorAll<HTMLElement>("h2, h3, h4")
).filter(h => h.id && allowedIds.has(h.id))

      headingsRef.current = headings.map(h => ({
        id: h.id,
        top: h.offsetTop,
      }))

      // ✅ THIS IS WHERE YOUR SNIPPET GOES
      if (headingsRef.current.length) {
        lastActiveRef.current = headingsRef.current[0].id
        setActiveId(headingsRef.current[0].id)
      }
    }

    // Wait for layout / fonts / MDX hydration
    setTimeout(collectHeadings, 100)

    const onScroll = () => {
      const scrollY = window.scrollY + NAVBAR_HEIGHT + READ_OFFSET

      let current: string | null = null

      for (const h of headingsRef.current) {
        if (scrollY >= h.top) {
          current = h.id
        } else {
          break
        }
      }

      // ✅ NEVER allow "no active section"
      if (!current) {
        current = lastActiveRef.current
      }

      if (current && current !== lastActiveRef.current) {
        lastActiveRef.current = current
        setActiveId(current)
      }
    }

    const onHashChange = () => {
      const id = window.location.hash.replace("#", "")
      if (id) {
        lastActiveRef.current = id
        setActiveId(id)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("hashchange", onHashChange)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  return activeId
}
