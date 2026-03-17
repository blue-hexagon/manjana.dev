import React from "react";
import {IconContext} from "react-icons";
import {IoClose} from "react-icons/io5";
import iconMap from "../../components/iconMap";
import {Box, IconButton, Tooltip} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {
    TbTopologyRing,
    TbTopologyRing2,
    TbTopologyStar,
    TbTopologyStar3,
    TbTopologyStarRing3
} from "react-icons/tb";

const complexityLevels = [
    {icon: TbTopologyRing2, level: "Tiny"},
    {icon: TbTopologyRing, level: "Simple"},
    {icon: TbTopologyStar, level: "Moderate"},
    {icon: TbTopologyStar3, level: "Advanced"},
    {icon: TbTopologyStarRing3, level: "Complex"}
];

const TechnologyFilter = ({
                              icons,
                              include,
                              exclude,
                              onToggle,
                              onClear,
                              showImages,
                              onToggleImages,
                              projects
                          }) => {

    const hasFilters = include.length || exclude.length;

    const handleClick = (icon, e) => {
        const isShift = e.shiftKey;
        onToggle(icon, {exclude: isShift});
    };

    const counts = React.useMemo(() => {
        const map = new Map();
        projects.forEach(project => {
            project.icons.forEach(icon => {
                map.set(icon, (map.get(icon) || 0) + 1);
            });
        });
        return map;
    }, [projects]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: "8px 12px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",

            }}
        >

            {/* ICON FILTERS */}
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    flexGrow: 1,
                    alignItems: "center",

                }}
            >

                <IconContext.Provider value={{size: "20px"}}>

                    {icons.map((IconComponent, index) => {

                        const isIncluded = include.includes(IconComponent);
                        const isExcluded = exclude.includes(IconComponent);

                        const iconEntry = Object.entries(iconMap).find(
                            ([, {icon}]) => icon === IconComponent
                        );

                        const label = iconEntry ? iconEntry[1].label : "Unknown";
                        const count = counts.get(IconComponent) || 0;

                        return (
                            <Tooltip key={index} title={`${label}`}>

                                <Box
                                    key={index}
                                    onClick={(e) => handleClick(IconComponent, e)}
                                    title={`${label}${isExcluded ? " (excluded)" : ""}`}
                                    sx={{
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        width: 36,
                                        height: 36,

                                        borderRadius: "8px",
                                        cursor: "pointer",

                                        opacity: count === 0 ? 0.25 : 1,

                                        transition: "all .18s ease",

                                        color: isIncluded
                                            ? "#00ffcc"
                                            : isExcluded
                                                ? "#ff6b6b"
                                                : "rgba(255,255,255,0.45)",

                                        background: isIncluded
                                            ? "rgba(0,255,204,0.08)"
                                            : isExcluded
                                                ? "rgba(255,80,80,0.10)"
                                                : "transparent",

                                        border: "1px solid",

                                        borderColor: isIncluded
                                            ? "rgba(0,255,204,0.25)"
                                            : isExcluded
                                                ? "rgba(255,80,80,0.30)"
                                                : "transparent",

                                        "&:hover": {
                                            color: "#ffffff",
                                            background: "rgba(255,255,255,0.06)",
                                            borderColor: "rgba(255,255,255,0.15)"
                                        }
                                    }}
                                >
                                    <IconComponent/>

                                    {/* COUNT BADGE */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: -4,
                                            right: -4,
                                            minWidth: 16,
                                            height: 16,
                                            px: "3px",
                                            fontSize: "10px",
                                            fontWeight: 600,
                                            borderRadius: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "rgba(0,0,0,0.8)",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            color: "#aaa"
                                        }}
                                    >
                                        {count}
                                    </Box>

                                </Box>
                            </Tooltip>
                        );

                    })}

                </IconContext.Provider>

                {/* COMPLEXITY SCALE */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        ml: 1,
                        pl: 1,
                        borderLeft: "1px solid rgba(255,255,255,0.06)"
                    }}
                >
                    {complexityLevels.map(({icon: Icon, level}) => (
                        <Tooltip key={level} title={`Complexity: ${level}`}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 28,
                                    height: 28,
                                    borderRadius: "6px",
                                    color: "rgb(128,128,128)",
                                    transition: "all .15s ease",
                                    "&:hover": {
                                        color: "#ffffff",
                                        background: "rgba(255,255,255,0.06)"
                                    }
                                }}
                            >
                                <Icon size={24}/>
                            </Box>
                        </Tooltip>
                    ))}
                </Box>

            </Box>

            {/* RIGHT CONTROLS */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    pl: 1.5,
                    borderLeft: "1px solid rgba(255,255,255,0.06)"

                }}
            >

                <Tooltip title="Clear filters">
                    <IconButton
                        onClick={onClear}
                        size="small"
                        sx={{
                            width: 32,
                            height: 32,
                            color: "rgba(255,255,255,0.45)",
                            "&:hover": {
                                color: "#ffffff",
                                background: "rgba(255,255,255,0.06)"
                            }
                        }}
                    >
                        <IoClose size={18}/>
                    </IconButton>
                </Tooltip>

                <Tooltip title={showImages ? "Hide previews" : "Show previews"}>
                    <IconButton
                        size="small"
                        onClick={onToggleImages}
                        sx={{
                            width: 32,
                            height: 32,

                            color: showImages
                                ? "rgb(128,128,128)"
                                : "rgba(255,255,255,0.45)",


                            "&:hover": {
                                color: "#ffffff",
                                background: "rgba(255,255,255,0.06)",
                                borderColor: "rgba(255,255,255,0.2)"
                            }
                        }}
                    >
                        {showImages
                            ? <Visibility fontSize="small"/>
                            : <VisibilityOff fontSize="small"/>
                        }
                    </IconButton>
                </Tooltip>

            </Box>

        </Box>
    );
};

export default TechnologyFilter;