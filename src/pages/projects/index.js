import React, {useEffect, useState} from "react";
import {
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Icon,
    Chip,
    Grid2,
    CardActionArea,
    Divider,
    IconButton,
    Tooltip,
    Modal
} from "@mui/material";
import {styled} from "@mui/system";
import {FaPython, FaNpm, FaLock, FaLockOpen} from "react-icons/fa";
import {Link} from "gatsby";
import {LuLayers} from "react-icons/lu";

import IconList from "./IconList";
import TechnologyFilter from "./TechnologyFilter";
import useProjectTechnologyFilter from "./useProjectTechnologyFilter";
import {projects} from "./projects_dict";


const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== "featured",
})(({featured}) => ({
    position: "relative",
    backgroundColor: "background.paper",
    border: featured
        ? "1px solid rgba(255,255,255,0.10)"
        : "1px solid rgba(255,255,255,0.05)",
    borderRadius: 12,
    overflow: "hidden",
    transition: "transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease",
    boxShadow: featured
        ? "0 12px 36px rgba(0,0,0,0.30)"
        : "0 8px 24px rgba(0,0,0,0.18)",
    transform: featured ? "translateY(-2px)" : "translateY(0)",

    "&:hover": {
        boxShadow: "0 16px 42px rgba(0,0,0,0.36)",
        borderColor: "rgba(255,255,255,0.10)",
    }
}));

const PackageIconBadge = ({type}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                borderRadius: "50%",
                color: "white"
            }}
        >
            <Icon sx={{color: "white", fontSize: "2rem", mb: "4px"}}>
                {type === "pip" && <FaPython/>}
                {type === "npm" && <FaNpm/>}
            </Icon>
        </Box>
    );
};

function ComplexityBadge({value}) {
    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(0,0,0,0.58)",
                backdropFilter: "blur(6px)",
                px: 1.3,
                py: 0.45,
                fontSize: "0.64rem",
                borderRadius: "7px",
                border: "1px solid rgba(255,255,255,0.24)",
                color: "rgba(255,255,255,0.88)",
                letterSpacing: "0.04em",
                textTransform: "uppercase"
            }}
        >
            {value}
            <LuLayers/>
        </Box>
    );
}

function SourceBadge({type}) {
    const SourceIcon = type === "open" ? FaLockOpen : FaLock;
    const txtColor = type === "open"
        ? "rgba(255,255,255,0.92)"
        : "rgba(255,255,255,0.48)";

    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(0,0,0,0.58)",
                backdropFilter: "blur(6px)",
                px: 1.3,
                py: 0.45,
                fontSize: "0.64rem",
                borderRadius: "7px",
                border: "1px solid rgba(255,255,255,0.22)",
                color: txtColor,
                letterSpacing: "0.04em",
                textTransform: "uppercase"
            }}
        >
            <SourceIcon/>
            {type === "open" ? "Open Source" : "Closed"}
        </Box>
    );
}

function formatYearRange(project) {
    if (!project.yearStart) return "";
    if (project.yearEnd && project.yearEnd !== project.yearStart) {
        return `${project.yearStart}–${project.yearEnd}`;
    }
    if (project.yearEnd === project.yearStart) {
        return `${project.yearStart}`;
    }
    return `${project.yearStart}–Present`;
}

export const ProjectShowcase = ({filteredProjects, showImages}) => {
    const [zoomOpen, setZoomOpen] = useState(false);
    const [zoomSrc, setZoomSrc] = useState(null);

    useEffect(() => {
        document.body.style.overflow = zoomOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [zoomOpen]);

    const selectedProjects = filteredProjects ?? projects;

    return (
        <>
            <Modal
                disableScrollLock
                disableRestoreFocus
                disableAutoFocus
                open={zoomOpen}
                onClose={() => setZoomOpen(false)}
            >
                <Box
                    onClick={() => setZoomOpen(false)}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                            backgroundColor: "background.paper",
                        backdropFilter: "blur(6px)",
                        cursor: "zoom-out",
                    }}
                >
                    {zoomSrc && (
                        <Box
                            component="img"
                            src={zoomSrc}
                            sx={{
                                maxWidth: "92vw",
                                maxHeight: "92vh",
                                borderRadius: 2,
                                boxShadow: "0 25px 80px rgba(0,0,0,0.8)",
                                transition: "0.2s ease",
                            }}
                        />
                    )}
                </Box>
            </Modal>

            <Grid2
                container
                spacing={3.25}
                sx={{height: "100%", alignItems: "stretch"}}
            >
                {selectedProjects.map((project, index) => {
                    const isFeatured = index === 0;

                    return (
                        <Grid2 item key={project.id ?? index} size={{xs: 12, sm: 6, lg: 4}}>
                            <StyledCard featured={isFeatured ? 1 : 0} sx={{
                                "&:hover": {
                                    borderColor: "text.primary",
                                    borderRadius: 3,
                                    border: "1px solid",
                                    transition: "border-color 160ms ease",
                                }
                            }}>
                                <Box position="relative">
                                    {showImages && (
                                        <Box
                                            position="absolute"
                                            bottom={10}
                                            right={10}
                                            sx={{
                                                zIndex: 10,
                                                display: "flex",
                                                gap: 0.8,
                                                flexWrap: "wrap",
                                                justifyContent: "flex-end"
                                            }}
                                        >
                                            <ComplexityBadge value={project.complexity}/>
                                            <SourceBadge type={project.source}/>
                                        </Box>
                                    )}

                                    <Box
                                        position="absolute"
                                        top={10}
                                        right={10}
                                        sx={{
                                            backdropFilter: "blur(6px)",
                                            px: 1.35,
                                            py: 0.5,
                                            borderRadius: "999px",
                                            fontSize: "0.73rem",
                                            color: "#ffffff",
                                            fontWeight: 600,
                                            letterSpacing: "0.01em",
                                            zIndex: 5,
                                            border: "1px solid rgba(255,255,255,0.14)",
                                        }}
                                    >
                                        {formatYearRange(project)}
                                    </Box>

                                    {showImages && (
                                        <CardMedia
                                            component="img"
                                            height="186"
                                            image={project.image}
                                            alt={project.title}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setZoomSrc(project.image);
                                                setZoomOpen(true);
                                            }}
                                            sx={{
                                                cursor: "zoom-in",
                                                filter: isFeatured ? "brightness(0.78)" : "brightness(0.72)",
                                                transition: "filter 0.25s ease, transform 0.25s ease",
                                                "&:hover": {
                                                    filter: "brightness(0.96)",
                                                },
                                                borderTop: "1px solid rgba(27,27,27,0.95)",
                                                borderLeft: "1px solid rgba(27,27,27,0.95)",
                                                borderRight: "1px solid rgba(27,27,27,0.95)",
                                            }}
                                        />
                                    )}
                                </Box>

                                <Link
                                    to={project.link}
                                    style={{textDecoration: "none", color: "inherit"}}
                                >
                                    <CardActionArea sx={{height: "100%"}}>
                                        <CardContent
                                            sx={{
                                                p: 2.25,
                                                "&:last-child": {pb: 2.25}
                                            }}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                sx={{
                                                    color: "#ffffff",
                                                    fontWeight: isFeatured ? 700 : 600,
                                                    lineHeight: 1.1,
                                                    letterSpacing: "-0.02em",
                                                    mb: 1.15
                                                }}
                                            >
                                                {project.title}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="#bdbdbd"
                                                className="truncated-text-three"
                                                sx={{
                                                    lineHeight: 1.62,
                                                    fontSize: "0.98rem",
                                                    minHeight: "4.7em"
                                                }}
                                            >
                                                {project.description}
                                            </Typography>

                                            <Divider
                                                sx={{
                                                    my: 1.8,
                                                    borderColor: "rgba(255,255,255,0.06)"
                                                }}
                                            />

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "nowrap",
                                                    overflow: "hidden",
                                                    gap: 0.1,
                                                    position: "relative",

                                                    maskImage: "linear-gradient(to right, black 85%, transparent)",
                                                    WebkitMaskImage: "linear-gradient(to right, black 85%, transparent)",
                                                }}
                                            >
                                                {project.tags.map((tag, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={tag}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            marginRight: "6px",
                                                            mb: "6px",
                                                            color: "rgba(255,255,255,0.86)",
                                                            borderColor: "rgba(255,255,255,0.16)",
                                                            background: "rgba(255,255,255,0.01)",
                                                            "& .MuiChip-label": {
                                                                px: 1.2
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </Box>

                                            <Box mt={1.35}
                                            >
                                                <IconList icons={project.icons}/>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </StyledCard>
                        </Grid2>
                    );
                })}
            </Grid2>
        </>
    );
};

const Main = () => {
    const [showImages, setShowImages] = useState(true);
    const allProjects = projects
    const {
        allIcons,
        includeTech,
        excludeTech,
        toggleTech,
        clearAll,
        filteredProjects
    } = useProjectTechnologyFilter(allProjects);

    return (
        <Container sx={{pt: 6, pb: 2}}>
            <Box sx={{mb: 3.25}}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: "-0.85px",
                        color: "#ffffff",
                        lineHeight: 1.03,
                        mb: 2.15,
                    }}
                >
                    Selected Work
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "#c8c8c8",
                        lineHeight: 1.62,
                        fontSize: "1.04rem",
                        mb: 1.1,
                        lineBreak: "auto",
                    }}
                >
                    A selection of engineering projects spanning automation tooling,
                    system introspection utilities, infrastructure experiments, and
                    web-based platforms.
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "#b2b2b2",
                        maxWidth: 980,
                        lineHeight: 1.62,
                        fontSize: "1.01rem",
                    }}
                >
                    Most projects are built to explore systems deeply and translate
                    operational knowledge into practical tools.
                </Typography>

                <Typography
                    variant="subtitle2"
                    sx={{
                        color: "rgba(189,189,189,0.45)",
                        maxWidth: "100%",
                        lineHeight: 1.45,
                        mt: 1.25,
                        fontSize: "0.85rem",
                    }}
                >
                    Additional open-source projects and experiments are available on GitHub.
                </Typography>
            </Box>

            <TechnologyFilter
                icons={allIcons}
                include={includeTech}
                exclude={excludeTech}
                onToggle={toggleTech}
                onClear={clearAll}
                showImages={showImages}
                onToggleImages={() => setShowImages((prev) => !prev)}
                projects={filteredProjects}
                allProjects={projects}
            />

            <Box sx={{mb: 2.5}}/>

            <ProjectShowcase
                filteredProjects={filteredProjects}
                showImages={showImages}
            />
        </Container>
    );
};

export default Main;