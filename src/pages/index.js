import React from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Grid2,
    Card,
    CardContent,
    TextField, Divider, Rating, CardActionArea, Stack
} from '@mui/material';
import Typewriter from 'typewriter-effect';
import {
    SiCsharp,
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
    SiPlaywright,
    SiSqlite,
    SiPowershell,
    SiGatsby,
    SiTerraform,
    SiGit,
    SiGithub,
    SiVim,
    SiJest
} from "react-icons/si";
import {DiJava} from "react-icons/di";
import {Link} from "gatsby";
import {ProjectShowcase} from "./projects";
import {PostsComponent} from "./blog";

//PyTest, PlayWright, PyCharm
const CategoryEnum = {
    WEB: 0,
    DEVOPS: 1,
    NETWORK: 2,
    INFRASTRUCTURE: 3,
}
// Define an array of icon configurations
export const iconsData = [
    {Icon: SiCsharp, label: 'C#', level: 3, categories: []},
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
    {Icon: SiPlaywright, label: 'Playwright', level: 5, categories: []},
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
    {Icon: SiPowershell, label: 'Powershell', level: 2, categories: []},
    {Icon: SiDigitalocean, label: 'DigitalOcean', level: 3, categories: []},
    {Icon: SiJetbrains, label: 'JetBrains', level: 4, categories: []},
    {Icon: SiPycharm, label: 'PyCharm', level: 5, categories: []},
    {Icon: SiGnubash, label: 'Bash', level: 3, categories: []},
    {Icon: SiVmware, label: 'VMWare', level: 2, categories: []},
    {Icon: SiCisco, label: 'Cisco', level: 4, categories: []},
    {Icon: SiAnsible, label: 'Ansible', level: 2.5, categories: []},
    {Icon: SiPaloaltosoftware, label: 'Paloalto', level: 2, categories: []},

];

export function HeroImage({imageUrl}) {
    return (
        <Box sx={{width: "100%", display: "flex", justifyContent: "center"}}>
            <Box sx={{width: '30%', height: '30vh'}}>
                <img
                    src={imageUrl}
                    alt="Image of a person"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: "17%",
                    }}
                />
            </Box>
        </Box>
    );
}

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

// Define a component that renders all icons dynamically
const SkillsIcons = () => {
    return (
        <Box sx={{marginY: 2.75}}>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center'}}>
                {iconsData.map(({Icon, label, level, categories}, index) => (
                    <div key={index} style={{textAlign: 'center', width: '80px'}}>
                        <Icon size={40} color="#4A4A4A"/>
                        <p style={{fontSize: '0.8em', marginTop: '8px'}}>{label}</p>
                    </div>
                ))}
            </div>
        </Box>
    );
};


const Homepage = () => (

    <Container id="home" sx={{py: 5, textAlign: 'center'}}>
        <TypingEffect></TypingEffect>
        <Typography variant="subtitle1" gutterBottom>
            I’m a developer with a
            strong interest in turning complex systems into streamlined, automated workflows. My current focus is on
            cybersecurity and automation.

            As a self-starter and someone who’s always learning, I’m working on building decentralized tools and
            automation frameworks to solve challenges in distributed systems and security testing. My latest project,
            Armada, is an example of this approach, aiming to create practical, scalable solutions for security teams.
        </Typography>
        <GradientDivider></GradientDivider>
        <Button variant="outlined" color="primary" component={Link} to="/projects" sx={{m: 1}}>See My Projects</Button>
        <Button variant="outlined" color="primary" component={Link} to="/blog" sx={{m: 1}}>See My Blog
            Posts</Button>
        <Typography fontSize={"12px"} color={"rgb(70,70,70)"} style={{textAlign: "center"}}>(Work in progress - this site is still being worked
            on)</Typography>
    </Container>
);
const TypingEffect = () => {
    return (
        <div style={{fontSize: '2rem', color: '#fff', textAlign: 'center'}}>
            <Typewriter
                options={{
                    strings: [
                        "Hey, I'm Tobias!",
                        'Self-Taught Developer',
                        'Network Professional by Trade',
                        'Based in Zealand, Denmark',
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 85,
                }}
            />
        </div>
    );
};
const AboutMe = () => (
    <Container id="about" sx={{pb: 5, pt:3}}>
        {/*<Divider sx={{mt: 5, mb: 5, width: "220px", marginLeft: "auto", marginRight: "auto"}}></Divider>*/}
        {/*<Typography variant="h6" sx={{mt: 2}}>Languages, Techologies & Skills</Typography>*/}
        {/*<Typography variant="body2" color="textSecondary" gutterBottom>*/}
        {/*    Some of the tools, languages, frameworks, and technologies that I work with.*/}
        {/*</Typography>*/}
        <SkillsIcons></SkillsIcons>
    </Container>
);

const Projects = () => (
    <>
        <Container id="projects" sx={{pt: 0}}>
            <Typography variant="h4" sx={{mb: 1}} gutterBottom>Projects</Typography>
            <ProjectShowcase></ProjectShowcase>
            <Stack direction="row">
                <Button
                    component={Link}
                    to="/projects"
                    variant="outlined"
                    color="primary"
                    sx={{mt: 2, width: "12.5%", ml: "auto"}}
                >
                    See More
                </Button>
            </Stack>

        </Container>

    </>
);

const Blog = () => (
    <Container id="blog" sx={{py: 5}}>
        <Typography variant="h4" gutterBottom>Technical Blog</Typography>
        <PostsComponent heading={null} featuredOnly={false}></PostsComponent>
        <Stack direction="row">
            <Button
                component={Link}
                to="/blog"
                variant="outlined"
                color="primary"
                sx={{mt: 2, width: "12.5%", ml: "auto"}}
            >
                See More
            </Button>
        </Stack>

    </Container>
);

const MainContainer = () => (
    <>
        <Box sx={{marginTop: "4rem"}}></Box>
        <HeroImage imageUrl="/graphics/logo.svg" sx={{marginTop: "4em"}}></HeroImage>
        <Box sx={{marginTop: "1.5rem"}}></Box>
        <Homepage/>
        {/*<AboutMe/>*/}
        {/*<Projects/>*/}
        {/*<Blog/>*/}
    </>
);

export default MainContainer;
