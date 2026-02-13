import React, { useEffect, useRef } from "react"

export interface ToCItem {
    url: string
    title: string
    items?: ToCItem[]
}

interface Props {
    items?: ToCItem[]
    activeId: string | null
}

export const ToCList: React.FC<Props> = ({ items, activeId }) => {
    if (!items) return null

    return (
        <ul className="toc-list">
            {items.map(item => (
                <ToCListItem
                    key={item.url}
                    item={item}
                    activeId={activeId}
                />
            ))}
        </ul>
    )
}

const ToCListItem: React.FC<{
    item: ToCItem
    activeId: string | null
}> = ({ item, activeId }) => {
    const id = item.url?.replace("#", "")
    const ref = useRef<HTMLAnchorElement>(null)

    const isActive = id === activeId
    const isChildActive =
        item.items?.some(child =>
            child.url?.replace("#", "") === activeId
        ) ?? false

    const isHighlighted = isActive || isChildActive

    // Auto-scroll active item into view
    useEffect(() => {
        if (isActive && ref.current) {
            ref.current.scrollIntoView({
                block: "nearest",
                behavior: "instant"
            })
        }
    }, [isActive])

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()

        const target = document.getElementById(id || "")
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
            window.history.replaceState(null, "", item.url)
        }
    }

    return (
        <li className={isHighlighted ? "active-parent" : ""}>
            <a
                ref={ref}
                href={item.url}
                onClick={handleClick}
                className={isActive ? "active" : ""}
            >
                {item.title}
            </a>

            {item.items && (
                <ToCList
                    items={item.items}
                    activeId={activeId}
                />
            )}
        </li>
    )
}
