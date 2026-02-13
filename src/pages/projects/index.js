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
import {FaPython, FaNpm} from "react-icons/fa";
import {IconContext} from "react-icons";
import {useState} from "react";
import {IconButton, Tooltip} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Modal} from "@mui/material";

import {Link} from "gatsby";
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
    SiJest, SiWebpack, SiMqtt, SiGrafana, SiTelegraph, SiInfluxdb
} from "react-icons/si";
import IconList from "./IconList";

const projects = [
    // {
    //     title: "Armada",
    //     description: "Website monitoring tool that alerts when specific content is added or removed.",
    //     image: "https://picsum.photos/id/231/600/400",
    //     link: "/projects/hypersnitch",
    //     tags: ["Monitoring", "Automation", "Web Scraping"],
    //     packageAvailable: null,
    //     id: 2
    // },
    // {
    //     title: "LendIT",
    //     description: "Website monitoring tool that alerts when specific content is added or removed.",
    //     image: "https://picsum.photos/id/231/600/400",
    //     link: "/projects/hypersnitch",
    //     tags: ["...",],
    //     packageAvailable: null,
    //     id: 6
    // },
            {
        title: "MQ-Hero",
        description: "A distributed IoT simulation and management platform built around MQTT — featuring policy-driven topic modeling, multi-tenant schemas, and observability integration (Telegraf, InfluxDB, Grafana).",
        image: "/graphics/projects/mq_hero.png",
        link: "/graphics/projects/pdf/dt_svendeprove_presentation2026-02-12-4601h6dakn21.pdf",
        tags: ["IoT", "MQTT", "Distributed Systems"],
        icons: [SiPython,SiMqtt,SiGrafana, SiTelegraph, SiInfluxdb],
        packageAvailable: null,
        id: -2
    },
        {
        title: "manjana.dev",
        description: "A Gatsby + MDX technical platform showcasing deep dives into systems, encoding, networking, and infrastructure — powered by custom React components and advanced UI tooling.",
        image: "/graphics/projects/manjana_dev.png",
        link: "https://manjana.dev",
        tags: ["Web Application"],
        icons: [SiMarkdown,SiGatsby,SiJavascript, SiTypescript, SiReact, SiGit],
        packageAvailable: null,
        id: -1
    },
    {
        title: "HyperSnitch",
        description: "An auto-deployable website monitoring tool with built-in SMTP alerts. Detects when specific strings are added or removed from target pages.",
        image: "/graphics/projects/hypersnitch.png",
        link: "https://github.com/blue-hexagon/HyperSnitch",
        tags: ["Monitoring", "Automation", "Web Scraping"],
        icons: [SiPython, SiPytest, SiGit],
        packageAvailable: null,
        id: 0
    },
    {
        title: "JHHuse",
        description: "A Django-powered website for a homeowners association, featuring document management and member information updates.",
        image: "/graphics/projects/jhhuse_dk.png",
        link: "https://www.jhhuse.dk/",
        tags: ["Web Application"],
        icons: [SiPython, SiDjango, SiBootstrap, SiNginx, SiHtml5, SiDigitalocean, SiGit],
        packageAvailable: null,
        id: 1
    }, {
        title: "WinScraper",
        description: "Windows system reconnaissance CLI and library in Python.",
        image: "/graphics/projects/winscraper.png",
        link: "/projects/hypersnitch",
        tags: ["Utility"],
        icons: [SiPython, SiGit],
        packageAvailable: null,
        id: 2
    },
    {
        title: "BashLAMP",
        description: "One-command provisioning of a Rocky Linux LAMP stack with WordPress and secure FTP.",
        image: "/graphics/projects/bashlamp.png",
        link: "https://github.com/blue-hexagon/BashLAMP",
        tags: ["Bash", "LAMP", "vsftpd", "Linux"],
        icons: [SiLinux, SiGnubash, SiGit],
        packageAvailable: null,
        id: 3
    },
    {
        title: "Cheatsheet.wtf",
        description: "A modernized evolution of ShellMagic.xyz — interactive and searchable terminal cheatsheet platform.",
        image: "/graphics/projects/cheatsheet_wtf.png",
        link: "https://web.archive.org/web/20250426052813/https://www.cheatsheet.wtf/",
        tags: ["Bash", "Vim", "Linux", "Git"],
        icons: [SiPython, SiFlask, SiGit, SiHeroku, SiHtml5, SiCss3, SiJavascript],
        packageAvailable: null,
        id: 4
    },
    {
        title: "TS-Calculator",
        description: "A custom TypeScript calculator built from scratch with full keyboard input handling and a modular UI architecture.",
        image: "/graphics/projects/ts_calculator.gif",
        link: "https://github.com/blue-hexagon/TS-Calculator",
        tags: ["TypeScript", "Webpack"],
        icons: [SiTypescript, SiWebpack],
        packageAvailable: null,
        id: 4
    }, {
        title: "ShellMagic.Xyz",
        description: "A minimalist Bash cheatsheet site — my first serious web project.",
        image: "/graphics/projects/shellmagic_xyz.png",
        link: "https://web.archive.org/web/20200411230156/https:/shellmagic.xyz/",
        tags: ["Bash", "Webarchived"],
        icons: [SiHtml5, SiCss3],
        packageAvailable: null,
        id: 5
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

export const ProjectShowcase = ({indices}) => {
    const [showImages, setShowImages] = useState(true);
    const [zoomOpen, setZoomOpen] = useState(false);
    const [zoomSrc, setZoomSrc] = useState(null);
    useEffect(() => {
        if (zoomOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [zoomOpen]);
    return (
        <>
            {/* Toggle Button Row */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 2,
                }}
            >
                <Tooltip title={showImages ? "Hide images" : "Show images"}>
                    <IconButton
                        onClick={() => setShowImages(prev => !prev)}
                        sx={{
                            color: showImages ? "rgba(255,255,255,0.5)" : "#888",
                            backgroundColor: showImages
                                ? "rgba(255,255,255,0.15)"
                                : "rgba(255,255,255,0.05)",
                            border: showImages
                                ? "1px solid rgba(255,255,255,0.1)"
                                : "1px solid rgba(255,255,255,0.1)",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: showImages
                                    ? "rgba(255,255,255,0.25)"
                                    : "rgba(255,255,255,0.1)",
                            }
                        }}
                    >
                        {showImages ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </Tooltip>
            </Box>
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
                {projects.map((project, index) => (
                    <Grid2 item key={index} size={{xs: 12, sm: 6, lg: 4}}>
                        <StyledCard>
                            <Box position="relative">
                                {showImages && (
                                    <CardMedia
                                        component="img"
                                        height="180"
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
                                            }
                                        }}
                                    />
                                )}

                                {project.packageAvailable && (
                                    <Box position="absolute" top={8} right={8}>
                                        <PackageIconBadge type={project.packageAvailable}/>
                                    </Box>
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
                                                    sx={{marginRight: "4px"}}
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
                            maxWidth: 720,
                            lineHeight: 1.6,
                            fontSize: "1.05rem",
                            fontStyle: ""
                        }}
                    >
                        Cross-platform tooling, system introspection utilities, automation scripts and web applications.
                    </Typography>
                </Box>
                <ProjectShowcase></ProjectShowcase>
            </Container>
        </>)
}
export default Main;
