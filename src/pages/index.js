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
import ProjectShowcase from "./projects";
import {PostsComponent} from "./tech-writings";

//PyTest, PlayWright, PyCharm
const CategoryEnum = {
    WEB: 0,
    DEVOPS: 1,
    NETWORK: 2,
    INFRASTRUCTURE: 3,
}
// Define an array of icon configurations
const iconsData = [
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
        <Typography variant="h3" gutterBottom>
            Hey, I’m Tobias – a Self-Taught Python Engineer Driven by Automation and Innovation
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            I’m a self-taught developer and network professional by trade, with a drive for building decentralized tools
            and automation frameworks that empower security teams. My focus is on distributed systems, peer-to-peer
            infrastructure, and creating solutions that push the boundaries of automated security.
        </Typography>
        <Button variant="contained" color="primary" href="#projects" sx={{m: 1}}>See My Projects</Button>
        <Button variant="outlined" color="primary" href="#about" sx={{m: 1}}>Learn More About Me</Button>
    </Container>
);

const AboutMe = () => (
    <Container id="about" sx={{py: 5}}>
        <Typography variant="h4" gutterBottom>About Me</Typography>
        <Typography variant="body1" gutterBottom>
            I'm a self-taught Python engineer and network professional based in Denmark (Zealand), with a
            strong interest in turning complex systems into streamlined, automated workflows. My focus is on
            cybersecurity and automation, always looking for ways to improve processes and make them more efficient.

            As a self-starter and someone who’s always learning, I’m working on building decentralized tools and
            automation frameworks to solve challenges in distributed systems and security testing. My latest project,
            Armada, is an example of this approach, aiming to create practical, scalable solutions for security teams.
        </Typography>
        <Divider sx={{mt: 5, mb: 5, width: "220px", marginLeft: "auto", marginRight: "auto"}}></Divider>
        {/*<Typography variant="h6" sx={{mt: 2}}>Languages, Techologies & Skills</Typography>*/}
        {/*<Typography variant="body2" color="textSecondary" gutterBottom>*/}
        {/*    Some of the tools, languages, frameworks, and technologies that I work with.*/}
        {/*</Typography>*/}
        <SkillsIcons></SkillsIcons>
    </Container>
);

const Projects = () => (
    <>
        <ProjectShowcase></ProjectShowcase>
    </>
);

const Blog = () => (
    <Container id="blog" sx={{py: 5}}>
        <Typography variant="h4" gutterBottom>Technical Blog</Typography>
        <Typography variant="body1">
            In my blog, I share insights from my work in cy bersecurity, deep dives into distributed systems, and
            technical guides on everything from P2P architecture to pentesting automation.
        </Typography>
        <ul>
            <li>Building Decentralized Command-and-Control Architectures for Cybersecurity</li>
            <li>Using pytest for Distributed Testing in Cybersecurity</li>
            <li>Fast Flux DNS and its Applications in Threat Simulation</li>
        </ul>
        <PostsComponent heading={"Featured Posts"} featuredOnly={true}></PostsComponent>
        <Stack direction="row">
        <Button
            component={Link}
            to="/projects"  // or "/articles", depending on your route
            variant="outlined"
            color="primary"
            sx={{mt: 2, width: "100%"}}
        >
            See More
        </Button>
            </Stack>

    </Container>
);

const Resume = () => (
    <Container id="resume" sx={{py: 5}}>
        <Typography variant="h4" gutterBottom>Resume</Typography>
        <Typography variant="body1" gutterBottom>
            Download my interactive resume to get a full overview of my experience, skills, and projects in
            cybersecurity and distributed systems development. I’m always open to interesting collaborations and new
            opportunities.
        </Typography>
        <Button variant="contained" color="primary" href="your-resume-link.pdf">Download Resume</Button>
    </Container>
);


const MainContainer = () => (
    <>
        <Homepage/>
        <AboutMe/>
        <Projects/>
        <Blog/>
        <Resume/>
    </>
);

export default MainContainer;