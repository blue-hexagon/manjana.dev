// @ts-ignore
import React, {useState, useEffect} from "react"
import {ToCList} from "./ToCList"
import {useScrollSpy} from "./useScrollSpy"
import {useTocKeyboard} from "./useTocKeyboard"
import "./toc.css"
import {extractTocIds, filterTocByDepth} from "./tocUtils"

interface ToCDrawerProps {
    title: string
    toc: {
        items?: any[]
    }
    tocDepth?: number
}

export const ToCDrawer: React.FC<ToCDrawerProps> = ({title, toc, tocDepth}) => {
    const [isOpen, setIsOpen] = useState(false)
    // const tocDepth = 3 // later: from frontmatter
    const depth = Math.max(2, tocDepth ?? 2)
    const filteredItems = filterTocByDepth(toc.items, depth)
    const allowedIds = extractTocIds(filteredItems)
    const activeId = useScrollSpy(allowedIds)
    useTocKeyboard(() => setIsOpen(v => !v))

    // lock body scroll on mobile

    return (
        <>
            <button
                className="toc-toggle"
                aria-label="Toggle table of contents"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(v => !v)}
            >
                ☰
            </button>

            {isOpen && (
                <>
                    <div className="toc-backdrop" onClick={() => setIsOpen(false)}/>
                    <aside className="toc-drawer" role="navigation">
                        <h2 className="toc-title">{title}</h2>
                        <ToCList items={filteredItems} activeId={activeId} />
                    </aside>
                </>
            )}
        </>
    )
}
