import { useEffect } from "react"

export const useTocKeyboard = (toggle: () => void) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "t" &&
        !["INPUT", "TEXTAREA"].includes(
          (document.activeElement as HTMLElement)?.tagName
        )
      ) {
        toggle()
      }

      if (e.key === "Escape") {
        toggle()
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [toggle])
}
