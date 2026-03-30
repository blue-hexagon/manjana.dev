import React, {useEffect, useRef} from "react"

import {FaFileCode} from "react-icons/fa";
import {GiMagicGate, GiMagicLamp} from "react-icons/gi";
import {RiFlowChart, RiTableFill} from "react-icons/ri";
import {BiSolidLayer, BiSolidZap} from "react-icons/bi";
import {PiChalkboardTeacherBold} from "react-icons/pi";
import {GrTroubleshoot} from "react-icons/gr";

type MarkerConfig = {
    icon: React.ReactNode
    className?: string
}
const DSL_BEGIN = "|>"
const MARKERS: Record<string, MarkerConfig> = {
    SCRIPT: {icon: <FaFileCode className="toc-icon"/>},
    FLOW_DIAGRAM: {icon: <RiFlowChart className="toc-icon"/>},
    PACKET_DIAGRAM: {icon: <BiSolidLayer className="toc-icon"/>},
    TABLE: {icon: <RiTableFill className="toc-icon"/>},
    EXAMPLE_PANEL: {icon: <PiChalkboardTeacherBold className="toc-icon"/>},
    TSHOOT: {icon: <GrTroubleshoot className="toc-icon"/>},
    TLDR: {icon: <BiSolidZap className="toc-icon"/>},
}

function formatTitle(title: string) {
    const [rawTitle, dsl] = title.split(DSL_BEGIN)

    const cleanTitle = rawTitle.trim()
    const icons: React.ReactNode[] = []

    if (dsl) {
        const tokens = dsl.trim().split(/\s+/)

        for (const token of tokens) {
            const config = MARKERS[token.toUpperCase()]
            if (config) {
                icons.push(config.icon)
            }
        }
    }

    if (icons.length === 0) return cleanTitle

    return (
        <>
            <span className="toc-text">{cleanTitle}</span>
            {/*{icons.map((icon, i) => (*/}
            {/*    <span key={i} className="toc-icon-wrapper">*/}
            {/*        {icon}*/}
            {/*    </span>*/}
            {icons.length > 0 && (
                <span className="toc-icon-wrapper">
        {icons[0]}
    </span>
            )}
        </>
    )
}

export interface ToCItem {
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
}> = ({item, activeId}) => {
    // item.title.replace("") #MARKER;
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
                {formatTitle(item.title)}
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
