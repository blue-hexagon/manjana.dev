import React from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Divider, Stack
} from '@mui/material';
import Typewriter from 'typewriter-effect';
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
    SiJest
} from "react-icons/si";
import {DiJava} from "react-icons/di";
import {Link} from "gatsby";


export const iconsData = [
    // {Icon: SiCsharp, label: 'C#', level: 3, categories: []},
    {Icon: SiDart, label: 'Dart', level: 2, categories: []},
    {Icon: DiJava, label: 'Java', level: 3, categories: []},
    {Icon: SiPython, label: 'Python', level: 4, categories: []},
    {Icon: SiPytest, label: 'Pytest', level: 3, categories: []},
    {Icon: SiLatex, label: 'LaTeX', level: 2, categories: []},
    {Icon: SiJavascript, label: 'JavaScript', level: 2, categories: []},
    {Icon: SiJest, label: 'Jest', level: 2, categories: []},
    {Icon: SiTypescript, label: 'TypeScript', level: 1, categories: []},
    {Icon: SiReact, label: 'React', level: 2, categories: []},
    {Icon: SiGatsby, label: 'Gatsby', level: 2, categories: []},
    {Icon: SiHtml5, label: 'HTML', level: 4, categories: []},
    {Icon: SiMarkdown, label: 'Markdown', level: 5, categories: []},
    {Icon: SiCss3, label: 'CSS', level: 2, categories: []},
    {Icon: SiSass, label: 'Sass', level: 2, categories: []},
    {Icon: SiBootstrap, label: 'Bootstrap', level: 4, categories: []},
    {Icon: SiTailwindcss, label: 'Tailwind CSS', level: 3, categories: []},
    // {Icon: SiPlaywright, label: 'Playwright', level: 5, categories: []},
    {Icon: SiDjango, label: 'Django', level: 4, categories: []},
    {Icon: SiFlask, label: 'Flask', level: 2, categories: []},
    {Icon: SiFlutter, label: 'Flutter', level: 2, categories: []},
    {Icon: SiSqlite, label: 'SQLite', level: 4, categories: []},
    {Icon: SiPostgresql, label: 'PostgreSQL', level: 4, categories: []},
    {Icon: SiNginx, label: 'Nginx', level: 2, categories: []},
    {Icon: SiPostman, label: 'Postman', level: 4, categories: []},
    {Icon: SiTerraform, label: 'Terraform', level: 4, categories: []},
    {Icon: SiVim, label: 'Vim', level: 3, categories: []},
    {Icon: SiGit, label: 'Git', level: 3, categories: []},
    {Icon: SiGithub, label: 'Github', level: 3, categories: []},
    {Icon: SiHeroku, label: 'Heroku', level: 3, categories: []},
    {Icon: SiDocker, label: 'Docker', level: 3, categories: []},
    {Icon: SiGithubactions, label: 'GitHub Actions', level: 2, categories: []},
    {Icon: SiLinux, label: 'Linux', level: 5, categories: []},
    // {Icon: SiPowershell, label: 'Powershell', level: 2, categories: []},
    {Icon: SiDigitalocean, label: 'DigitalOcean', level: 3, categories: []},
    {Icon: SiJetbrains, label: 'JetBrains', level: 4, categories: []},
    {Icon: SiPycharm, label: 'PyCharm', level: 5, categories: []},
    {Icon: SiGnubash, label: 'Bash', level: 3, categories: []},
    {Icon: SiVmware, label: 'VMWare', level: 2, categories: []},
    {Icon: SiCisco, label: 'Cisco', level: 4, categories: []},
    {Icon: SiAnsible, label: 'Ansible', level: 2.5, categories: []},
    {Icon: SiPaloaltosoftware, label: 'Paloalto', level: 2, categories: []},

];

const Hero = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {/* Logo */}
            <Box
                sx={{
                    width: "15%",
                    height: "15%",
                    mb: 3,
                    opacity: 0.9,
                    transition: "transform 0.4s ease, opacity 0.3s ease",
                    "&:hover": {
                        transform: "rotate(12deg)",
                        opacity: 1,
                    },
                }}
            >
                <img
                    src="/graphics/logo.svg"
                    alt="Hexagonal system logo"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            </Box>

            {/* Typewriter */}
            <TypingEffect/>

            {/* Core statement */}
            <Typography
                sx={{
                    mt: 3,
                    fontSize: "1.1rem",
                    color: "rgba(255,255,255,0.9)",
                    letterSpacing: "0.05em",
                    fontWeight: 600,
                    fontFamily: "monospace",
                    position: "relative",
                }}
            >
                I build <Box component="span" sx={{color: "#00ffcc"}}>systems</Box> that span networks, infrastructure,
                and code. </Typography>
        </Box>
    );
};

export function GradientDivider() {
    return (
        <Box sx={{width: '85%', textAlign: 'center', mb: 2, ml: "auto", mr: "auto"}}>
            <Divider
                sx={{
                    height: '2px',
                    background: 'linear-gradient(to right, #ffcc00  , #ff4081)',
                    border: 'none',
                    borderRadius: "5px"
                }}
            />
        </Box>
    );
}

const Homepage = () => {
    const buildDate = new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (

        <Container id="home" sx={{pb: 5, textAlign: 'center'}}>
            {/* BODY */}
            <Box sx={{mt: 0, textAlign: "center"}}>
                <Typography
                    sx={{
                        fontSize: "0.95rem",
                        lineHeight: 1.8,
                        color: "rgba(255,255,255,0.6)",
                        // maxWidth: "720px",
                        mx: "auto",
                    }}
                >
                    My work focuses on distributed systems, PKI, messaging, and automation — designing control over
                    complex environments rather than just interacting with them.

                    I’ve built platforms for certificate lifecycle management, distributed MQTT-based systems with
                    observability pipelines, and automation tooling that provisions and operates infrastructure
                    end-to-end.

                    I’m particularly interested in control planes — how systems coordinate state, propagate changes,
                    and remain stable under load and failure.
                </Typography>

                {/* Signature */}
                <Typography
                    sx={{
                        mt: 4,
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                    }}
                >
                    Building and documenting real systems
                </Typography>
            </Box>
            <GradientDivider></GradientDivider>
            {/* CTA */}
            <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{flexWrap: "wrap", mt: 3}}
            >
                <Button
                    variant="outlined"
                    component={Link}
                    to="/projects"
                    sx={{
                        px: 3,
                        py: 1,
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        borderColor: "rgba(255,255,255,0.2)",
                    }}
                >
                    SYSTEMS I’VE BUILT
                </Button>

                <Button
                    variant="outlined"
                    component={Link}
                    to="/blog"
                    sx={{
                        px: 3,
                        py: 1,
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        borderColor: "rgba(255,255,255,0.2)"
                    }}
                >
                    FIELD NOTES / DEEP-DIVES
                </Button>
            </Stack>
            <Typography
                sx={{
                    fontSize: "0.7rem",
                    mt: 1.5,
                    color: "rgba(255,255,255,0.25)",
                    textAlign: "center",
                    letterSpacing: "0.05em",
                }}
            >
                Last deployed: {buildDate}
            </Typography>
        </Container>
    );
}
const TypingEffect = () => {
    return (
        <Typography
            sx={{
                fontSize: "1.6rem",
                fontWeight: 500,
                color: "#fff",
                letterSpacing: "0.04em",
            }}
        >
            <Typewriter
                options={{
                    strings: [
                        "Distributed Systems",
                        "Control Planes & Security",
                        "Automation at Scale",
                        "Understanding Systems Deeply",
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 45,
                    delay: 35,
                }}
            />
        </Typography>
    );
};

const IndexContainer = () => (
    <>
        <Box sx={{marginTop: "0.1rem"}}></Box>
        <Hero/>
        <Box sx={{marginTop: "0.1em"}}></Box>
        <Homepage/>
    </>
);

export default IndexContainer;
