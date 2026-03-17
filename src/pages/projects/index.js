import React, {useEffect} from "react";
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
    CardActionArea, Divider
} from "@mui/material";
import {styled} from "@mui/system";
import {FaPython, FaNpm, FaLock, FaLockOpen} from "react-icons/fa";
import {IconContext} from "react-icons";
import {useState} from "react";
import {IconButton, Tooltip} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Modal} from "@mui/material";

import {Link} from "gatsby";
import {LuLock, LuLockOpen, LuLockKeyhole, LuLockKeyholeOpen} from "react-icons/lu";
import {LuLayers} from "react-icons/lu";
import {
    SiDart,
    SiPython,
    SiLatex,
    SiJavascript,
    SiTypescript,
    SiHtml5,
    SiCss3,
    SiSass,
    SiBootstrap,
    SiTailwindcss,
    SiDjango,
    SiFlask,
    SiFlutter,
    SiPostgresql,
    SiNginx,
    SiPostman,
    SiHeroku,
    SiDocker,
    SiGithubactions,
    SiLinux,
    SiDigitalocean,
    SiJetbrains,
    SiGnubash,
    SiAnsible,
    SiCisco,
    SiVmware,
    SiPaloaltosoftware,
    SiMarkdown,
    SiReact,
    SiPycharm,
    SiPytest,
    SiSqlite,
    SiGatsby,
    SiTerraform,
    SiGit,
    SiGithub,
    SiVim,
    SiJest, SiWebpack, SiMqtt, SiGrafana, SiTelegraph, SiInfluxdb, SiOpenssl, SiBat,
} from "react-icons/si";
import IconList from "./IconList";
import TechnologyFilter from "./TechnologyFilter";
import useProjectTechnologyFilter from "./useProjectTechnologyFilter";

const projects = [
    {
        title: "DotCertify",
        yearStart: 2026,
        description: "A Python playground for exploring X.509 PKI workflows — generating keys, building CSRs, operating a local CA, signing certificates, and validating certificate chains using the cryptography library.",
        image: "/graphics/projects/dotcertify.png",
        link: "https://github.com/blue-hexagon/DotCertify",
        tags: ["PKI", "X.509", "Cryptography"],
        icons: [SiPython, SiGit, SiOpenssl],
        packageAvailable: null,
        complexity: "moderate",
        source: "open",
        id: -6
    },
    {
        title: "MQ-Hero",
        yearStart: 2026,
        description: "A distributed IoT simulation and management platform built around MQTT — featuring policy-driven topic modeling, multi-tenant schemas, and observability integration (Telegraf, InfluxDB, Grafana).",
        image: "/graphics/projects/mq_hero.png",
        link: "/graphics/projects/pdf/dt_svendeprove_presentation2026-02-12-4601h6dakn21.pdf",
        tags: ["IoT", "MQTT", "Distributed Systems"],
        icons: [SiPython, SiDocker, SiGnubash, SiMqtt, SiGrafana, SiTelegraph, SiInfluxdb],
        packageAvailable: null,
        complexity: "advanced",
        source: "open",
        id: -5
    },
    {
        title: "manjana.dev",
        yearStart: 2025,
        description: "A Gatsby + MDX technical platform showcasing deep dives into systems, encoding, networking, and infrastructure — powered by custom React components and advanced UI tooling.",
        image: "/graphics/projects/manjana_dev.png",
        link: "https://manjana.dev",
        tags: ["Web Application"],
        icons: [SiMarkdown, SiGatsby, SiJavascript, SiTypescript, SiReact, SiGit],
        packageAvailable: null,
        complexity: "advanced",
        source: "open",
        id: -4
    },
    {
        title: "HyperSnitch",
        yearStart: 2025,
        yearEnd: 2025,
        description: "An auto-deployable website monitoring tool with built-in SMTP alerts. Detects when specific strings are added or removed from target pages.",
        image: "/graphics/projects/hypersnitch.png",
        link: "https://github.com/blue-hexagon/HyperSnitch",
        tags: ["Monitoring", "Automation", "Web Scraping"],
        icons: [SiPython, SiGnubash, SiDigitalocean, SiPytest, SiGit],
        packageAvailable: null,
        complexity: "moderate",
        source: "open",
        id: -3
    },
    {
        title: "LendIT.Pro",
        yearStart: 2023,
        yearEnd: 2024,
        description: "A multi-tenant asset and loan management platform for organizations to track and manage IT equipment lending. Built with Django and PostgreSQL with RBAC staff management, automated PDF receipts, and infrastructure automation via Docker and Terraform.",
        image: "/graphics/projects/lendit.png",
        link: null,
        tags: ["Web Application", "Asset Management", "Django"],
        icons: [SiPython, SiDjango, SiPostgresql, SiDocker, SiTerraform, SiJavascript],
        packageAvailable: null,
        complexity: "complex",
        source: "closed",
        id: -2
    },
    {
        title: "Armada (Cthulhu)",
        yearStart: 2022,
        description: "A research project exploring decentralized command-and-control architecture for distributed security testing, featuring YAML-driven orchestration, peer-to-peer task propagation, and scalable execution across coordinated nodes.",
        image: "/graphics/projects/armada.png",
        link: "",
        tags: ["Cybersecurity", "Distributed Systems", "Automation", "Closed Source"],
        icons: [SiPython, SiGit],
        packageAvailable: null,
        complexity: "complex",
        source: "closed",
        id: -1
    },
    {
        title: "BashLAMP",
        yearStart: 2022,
        yearEnd: 2022,
        description: "One-command provisioning of a Rocky Linux LAMP stack with WordPress and secure FTP.",
        image: "/graphics/projects/bashlamp.png",
        link: "https://github.com/blue-hexagon/BashLAMP",
        tags: ["Bash", "LAMP", "vsftpd", "Linux"],
        icons: [SiLinux, SiGnubash, SiGit],
        packageAvailable: null,
        complexity: "simple",
        source: "open",
        id: 0
    },
    {
        title: "PyInit",
        yearStart: 2024,
        description: "A lightweight Python project bootstrap template that provides instant setup of development tooling, formatting, linting, and testing workflows using Poetry, pre-commit hooks, and automated task runners.",
        image: "/graphics/projects/pyinit.png",
        link: "https://github.com/blue-hexagon/pyinit",
        tags: ["Python", "Developer Tooling"],
        icons: [SiPython, SiGit],
        packageAvailable: null,
        complexity: "tiny",
        source: "open",
        id: 1
    },
    {
        title: "TS-Calculator",
        yearStart: 2022,
        yearEnd: 2022,
        description: "A custom TypeScript calculator built from scratch with full keyboard input handling and a modular UI architecture.",
        image: "/graphics/projects/ts_calculator.gif",
        link: "https://github.com/blue-hexagon/TS-Calculator",
        tags: ["TypeScript", "Webpack"],
        icons: [SiTypescript, SiWebpack, SiGit],
        packageAvailable: null,
        complexity: "simple",
        source: "open",
        id: 2
    },
    {
        title: "JHHuse",
        yearStart: 2021,
        yearEnd: 2022,
        description: "A Django-powered website for a homeowners association, featuring document management and member information updates.",
        image: "/graphics/projects/jhhuse_dk.png",
        link: "https://www.jhhuse.dk/",
        tags: ["Django", "CMS", "Full Stack"],
        icons: [SiPython, SiDjango, SiBootstrap, SiNginx, SiHtml5, SiDigitalocean, SiGit],
        packageAvailable: null,
        complexity: "simple",
        source: "closed",
        id: 3
    }, {
        title: "WinScraper",
        yearStart: 2021,
        yearEnd: 2022,
        description: "Windows system reconnaissance CLI and library in Python.",
        image: "/graphics/projects/winscraper.png",
        link: "/projects/hypersnitch",
        tags: ["Windows", "System Recon", "Python"],
        icons: [SiPython, SiGit],
        packageAvailable: null,
        complexity: "simple",
        source: "open",
        id: 4
    },

    {
        title: "Cheatsheet.wtf",
        yearStart: 2021,
        yearEnd: 2021,
        description: "A modernized evolution of ShellMagic.xyz — interactive and searchable terminal cheatsheet platform.",
        image: "/graphics/projects/cheatsheet_wtf.png",
        link: "https://web.archive.org/web/20250426052813/https://www.cheatsheet.wtf/",
        tags: ["Bash", "Vim", "Linux", "Git"],
        icons: [SiPython, SiFlask, SiGit, SiHeroku, SiHtml5, SiCss3, SiJavascript],
        packageAvailable: null,
        complexity: "moderate",
        source: "closed",
        id: 5
    },
    {
        title: "ShellMagic.Xyz",
        yearStart: 2020,
        yearEnd: 2020,
        description: "A minimalist Bash cheatsheet site — my first serious web project.",
        image: "/graphics/projects/shellmagic_xyz.png",
        link: "https://web.archive.org/web/20200411230156/https:/shellmagic.xyz/",
        tags: ["Bash", "Webarchived"],
        icons: [SiHtml5, SiCss3],
        packageAvailable: null,
        complexity: "tiny",
        source: "open",
        id: 6
    },
];

const StyledCard = styled(Card)(({theme}) => ({
    position: "relative",
    transition: "transform 1.3s, box-shadow 0.3s height 0.5s",
    "&:hover": {
        transform: "scale(1.00)",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
    },
    backgroundColor: "#1c1c1c",

}));

const Tag = styled("span")(({theme}) => ({
    backgroundColor: "#8ab4f8",
    color: "#ffffff",
    padding: "0.2rem 0.5rem",
    borderRadius: "4px",
    marginRight: "0.5rem",
    fontSize: "0.75rem",
}));
const PackageIconBadge = ({type}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '50%',
                color: 'white'
            }}
        >
            <Icon size={"large"} sx={{color: "white", fontSize: "2rem", mb: "4px"}}>
                {type === "pip" && <FaPython/>}
                {type === "npm" && <FaNpm/>}
            </Icon>
        </Box>
    );
};
const complexityColor = {
    small: "#6c9cff",
    medium: "#00d4aa",
    large: "#ffb020",
    complex: "#ff5c5c"
};

function ComplexityBadge({value, sx}) {

    const color = "#fafafa"

    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",

                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(6px)",
                px: 1.5,
                py: 0.5,
                fontSize: "0.65rem",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.35)",
                color: color,
                letterSpacing: "0.04em",
                textTransform: "uppercase"
            }}
        >
            {value}
            <LuLayers/>
        </Box>
    );
}

function SourceBadge({type, sx}) {

    const SourceIocn = type === "open" ? FaLockOpen : FaLock
    const txtColor = type === "open" ? "#fafafa" : "rgba(255,255,255,0.35)"
    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",

                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(6px)",
                px: 1.5,
                py: 0.5,
                fontSize: "0.65rem",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.35)",
                color: txtColor,
                letterSpacing: "0.04em",
                textTransform: "uppercase"
            }}
        >
            <SourceIocn/>
            {type === "open" ? "Open Source" : "Closed Source"}
        </Box>
    )
}

export const ProjectShowcase = ({filteredProjects, showImages}) => {
    const [zoomOpen, setZoomOpen] = useState(false);
    const [zoomSrc, setZoomSrc] = useState(null);
    useEffect(() => {
        if (zoomOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [zoomOpen]);
    const selectedProjects = filteredProjects ? filteredProjects : projects
    return (
        <>
            {/* Toggle Button Row */}
            <Modal disableScrollLock
                   disableRestoreFocus
                   disableAutoFocus
                   open={zoomOpen} onClose={() => setZoomOpen(false)}>
                <Box
                    onClick={() => setZoomOpen(false)}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.9)",
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
                spacing={4}
                height="100%"
                sx={{height: "100%", display: "flex", alignItems: "center"}}
            >
                {selectedProjects.map((project, index) => (
                    <Grid2 item key={index} size={{xs: 12, sm: 6, lg: 4}}>
                        <StyledCard>
                            <Box position="relative">
                                {showImages &&
                                    <Box position="absolute"
                                         bottom={8}
                                         right={8}
                                         sx={{zIndex: 10, display: "flex", gap: 1}}>
                                        <ComplexityBadge value={project.complexity}/>
                                        <SourceBadge type={project.source}/>
                                    </Box>
                                }
                                <Box
                                    position="absolute"
                                    top={8}
                                    right={8}
                                    sx={{
                                        background: "rgba(0,0,0,0.6)",
                                        backdropFilter: "blur(6px)",
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: "12px",
                                        fontSize: "0.75rem",
                                        color: "#ffffff",
                                        fontWeight: 500,
                                        zIndex: 5,
                                    }}
                                >
                                    {project.yearStart && (
                                        <>
                                            {project.yearEnd && project.yearEnd !== project.yearStart
                                                ? `${project.yearStart}–${project.yearEnd}`
                                                : project.yearEnd === project.yearStart
                                                    ? project.yearStart
                                                    : `${project.yearStart}–Present`}
                                        </>
                                    )}
                                </Box>


                                {showImages && (

                                    <CardMedia
                                        component="img"
                                        height={showImages ? 180 : 0}
                                        image={project.image}
                                        alt={project.title}
                                        onClick={(e) => {
                                            e.stopPropagation(); // prevent navigation
                                            e.preventDefault();
                                            setZoomSrc(project.image);
                                            setZoomOpen(true);
                                        }}
                                        sx={{
                                            cursor: "zoom-in",
                                            filter: "brightness(0.75)",
                                            transition: "0.25s ease",
                                            "&:hover": {
                                                filter: "brightness(1)",
                                                transform: "scale(1.02)",
                                            },
                                            borderTop: "1px solid rgba(27, 27, 27, 0.99)",
                                            borderLeft: "1px solid rgba(27, 27, 27, 0.99)",
                                            borderRight: "1px solid rgba(27, 27, 27, 0.99)",
                                            borderRadius: "10px 10px 0px 0px",
                                        }}
                                    />
                                )}


                            </Box>

                            <Link
                                to={project.link}
                                style={{textDecoration: "none", color: "inherit"}}
                            >
                                <CardActionArea sx={{height: "100%"}}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" color="#ffffff">
                                            {project.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#bdbdbd"
                                            className="truncated-text-three"
                                        >
                                            {project.description}
                                        </Typography>

                                        <Divider/>

                                        <Box mt={2}>
                                            {project.tags.map((tag, idx) => (
                                                <Chip
                                                    sx={{marginRight: "4px", mb: "4px", overflow: "hidden"}}
                                                    key={idx}
                                                    label={tag}
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                        <Box mt={2}>
                                            <IconList icons={project.icons}/>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </StyledCard>
                    </Grid2>
                ))}
            </Grid2>
        </>
    );
};
const Main = () => {
    const [showImages, setShowImages] = useState(true);

    const {
        allIcons,
        includeTech,
        excludeTech,
        toggleTech,
        clearAll,
        filteredProjects
    } = useProjectTechnologyFilter(projects);


    return (
        <>
            <Container sx={{pt: 5, pb: 1}}>
                <Box sx={{mb: 0}}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 600,
                            letterSpacing: "-0.5px",
                            color: "#ffffff",
                            lineHeight: 1.1,
                        }}
                    >
                        Selected Work
                    </Typography>

                    <Box
                        sx={{
                            width: 80,
                            height: 4,
                            mt: 2,
                            mb: 3,
                            background: "linear-gradient(90deg, #00ffcc, transparent)",
                            borderRadius: 2,
                        }}
                    />

                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: "#bdbdbd",
                            maxWidth: "100%",
                            lineHeight: 1.6,
                            fontSize: "1.05rem",
                            fontStyle: ""
                        }}
                    >
                        A selection of engineering projects spanning automation tooling,
                        system introspection utilities, infrastructure experiments, and
                        web-based platforms. Most projects are built to explore systems
                        deeply and translate operational knowledge into practical tools.
                    </Typography>
                    <Typography variant="subtitle2" sx={{
                        color: "rgba(189,189,189,0.45)",
                        maxWidth: "100%",
                        lineHeight: 1.4,
                        mt: ".25rem",
                        mb: 2,
                        fontSize: "0.85rem",
                        fontStyle: ""
                    }}>
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
                    onToggleImages={() => setShowImages(prev => !prev)}

                    projects={filteredProjects}
                />
                <Box sx={{mb: 2}}/>
                <ProjectShowcase
                    filteredProjects={filteredProjects}
                    showImages={showImages}
                    setShowImages={setShowImages}
                /> </Container>
        </>)
}
export default Main;
