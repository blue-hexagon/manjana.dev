// @ts-ignore
import React, {useState, useEffect} from "react"
import {ToCList} from "./ToCList"
import {useScrollSpy} from "./useScrollSpy"
import {useTocKeyboard} from "./useTocKeyboard"
import "./toc.css"
import {extractTocIds} from "./tocUtils"

interface ToCDrawerProps {
    title: string
    toc: {
        items?: any[]
    }
}

export const ToCDrawer: React.FC<ToCDrawerProps> = ({title, toc}) => {
    const [isOpen, setIsOpen] = useState(false)
    const allowedIds = extractTocIds(toc.items)
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
                        <ToCList items={toc.items} activeId={activeId}/>
                    </aside>
                </>
            )}
        </>
    )
}
