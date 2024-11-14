import React from "react";
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
    CardActionArea
} from "@mui/material";
import {styled} from "@mui/system";
import {FaPython, FaNpm} from "react-icons/fa";
import {Link} from "gatsby";

// Sample project data
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
        title: "HyperSnitch",
        description: "An auto-deployable website multi-monitoring tool – with an integrated SMTP server – that alerts when specific strings is added or removed from a website.",
        image: "/graphics/projects/hypersnitch.png",
        link: "/projects/hypersnitch",
        tags: ["Monitoring", "Automation", "Web Scraping"],
        packageAvailable: null,
        id: 0
    },
    {
        title: "JHHuse",
        description: "JhHuse.dk is a website for a homeowner association, providing document features and member information updates.",
        image: "/graphics/projects/jhhuse_dk.png",
        link: "https://www.jhhuse.dk/",
        tags: ["Web Application"],
        packageAvailable: null,
        id: 1
    }, {
        title: "WinScraper",
        description: "A combined CLI tool and library used for collecting information about Windows devices.",
        image: "/graphics/projects/winscraper.png",
        link: "/projects/hypersnitch",
        tags: ["Monitoring", "Automation", "Web Scraping", "Postfix", "SMTP"],
        packageAvailable: null,
        id: 2
    },
    {
        title: "BashLAMP",
        description: "A Bash script that sets up a Rocky Linux LAMP server with Wordpress and a SSL configured FTP server",
        image: "/graphics/projects/bashlamp.png",
        link: "https://github.com/blue-hexagon/BashLAMP",
        tags: ["Bash", "LAMP", "vsftpd", "Linux"],
        packageAvailable: null,
        id: 3
    },
    {
        title: "Cheatsheet.wtf",
        description: "An evolution of shellmagic.xyz where I added many more cheatsheets.",
        image: "/graphics/projects/cheatsheet_wtf.png",
        link: "https://www.cheatsheet.wtf",
        tags: ["Bash", "Vim", "Linux", "Git"],
        packageAvailable: null,
        id: 4
    },
        {
        title: "TS-Calculator",
        description: "A custom keyboard/GUI controlled calculator written (almost) from scratch in TypeScript.",
        image: "/graphics/projects/ts_calculator.gif",
        link: "https://github.com/blue-hexagon/TS-Calculator",
        tags: ["TypeScript", "Webpack"],
        packageAvailable: null,
        id: 4
    },{
        title: "ShellMagic.Xyz",
        description: "A Bash cheatsheet – my first website (kind of).",
        image: "/graphics/projects/shellmagic_xyz.png",
        link: "https://web.archive.org/web/20200411230156/https:/shellmagic.xyz/",
        tags: ["Bash", "Webarchived"],
        packageAvailable: null,
        id: 5
    },
];

const StyledCard = styled(Card)(({theme}) => ({
    position: "relative",
    transition: "transform 0.3s, box-shadow 0.3s",
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

const IconBadge = ({type}) => {
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
    return (

        <Grid2 container spacing={4}>
            {projects.map((project, index) => (
                <Grid2 item key={index} size={{xs: 12, sm: 6, lg: 4}}>
                    <StyledCard>
                        <Box position="relative">
                            <CardMedia
                                component="img"
                                height="180"
                                image={project.image}
                                alt={project.title}
                                sx={{
                                    filter: "brightness(0.75)",
                                    "&:hover": {filter: "brightness(1)"}
                                }}
                            />
                            {/* IconBadge for installable packages */}
                            {project.packageAvailable && (
                                <Box position="absolute" top={8} right={8}>
                                    <IconBadge type={project.packageAvailable}/>
                                </Box>
                            )}
                        </Box>
                        <Link to={project.link}
                              style={{textDecoration: 'none', color: "inherit"}}>
                            <CardActionArea sx={{height: "100%"}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" color="#ffffff">
                                        {project.title}
                                    </Typography>
                                    <Typography variant="body2" color="#bdbdbd">
                                        {project.description}
                                    </Typography>
                                    <Box mt={2}>
                                        {project.tags.map((tag, idx) => (
                                            <Chip sx={{marginRight: "4px"}} key={idx} label={tag}
                                                  variant="outlined"></Chip>
                                        ))}
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Link>
                    </StyledCard>
                </Grid2>
            ))}
        </Grid2>
    );
};
const Main = () => {
    return (
        <>
            <Container sx={{py: 5}}>
                <Typography variant="h2" color="#ffffff" gutterBottom>
                    My Projects
                </Typography>
                <Typography sx={{pb: 2}} variant="subtitle1" color="#bdbdbd">
                    A selection of some of my work.
                </Typography>
                <ProjectShowcase></ProjectShowcase>
            </Container>
        </>)
}
export default Main;
