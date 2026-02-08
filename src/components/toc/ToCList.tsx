// @ts-ignore
import React from "react"

interface ToCItem {
    url: string
    title: string
    items?: ToCItem[]
}

interface Props {
    items?: ToCItem[]
    activeId: string | null
}

export const ToCList: React.FC<Props> = ({items, activeId}) => {
    if (!items) return null

    return (
        <ul className="toc-list">
            {items.map(item => {
                const id = item.url ? item.url.replace("#", "") : null
                const isActive = id !== null && id === activeId

                return (
                    <li key={item.url}>
                        <a
                            href={item.url}
                            className={isActive ? "active" : ""}
                            onClick={() => {
                                const id = item.url?.replace("#", "")
                                if (id) {
                                    // optimistic update
                                    window.history.replaceState(null, "", item.url)
                                }
                            }}
                        >
                            {item.title}
                        </a>
                        {item.items && (
                            <ToCList items={item.items} activeId={activeId}/>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}
