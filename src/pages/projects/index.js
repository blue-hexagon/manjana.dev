import React from "react";
import {Container, Card, CardContent, CardMedia, Typography, Box, Icon, Chip, Grid2} from "@mui/material";
import {styled} from "@mui/system";
import {FaPython, FaNpm} from "react-icons/fa";

// Sample project data
const projects = [
    {
        title: "Armada",
        description: "Distributed systems pentesting tool with decentralized C2 infrastructure.",
        image: "https://picsum.photos/id/232/600/400",
        link: "/projects/armada",
        tags: ["Cybersecurity", "P2P", "C2"],
        packageAvailable: "pip",
        id: 1
    },
    {
        title: "HyperSnitch",
        description: "Website monitoring tool that alerts when specific content is added or removed.",
        image: "https://picsum.photos/id/231/600/400",
        link: "/projects/hypersnitch",
        tags: ["Monitoring", "Automation", "Web Scraping"],
        packageAvailable: "npm",
        id: 2
    },
    {
        title: "Password Cracker",
        description: "Distributed password hash cracker built with scalability in mind.",
        image: "https://picsum.photos/id/2/600/400",
        link: "/projects/password-cracker",
        tags: ["Security", "Distributed Computing"],
        packageAvailable: null,
        id: 3
    },
];

const StyledCard = styled(Card)(({theme}) => ({
    position: "relative",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
    },
    backgroundColor: "#1c1c1c",
}));

const Tag = styled("span")(({theme}) => ({
    backgroundColor: "#8ab4f8",
    color: "#ffffff",
    padding: "0.2rem 0.5rem",
    borderRadius: "4px",
    marginRight: "0.3rem",
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
                        <CardContent>
                            <Typography gutterBottom variant="h5" color="#ffffff">
                                {project.title}
                            </Typography>
                            <Typography variant="body2" color="#bdbdbd">
                                {project.description}
                            </Typography>
                            <Box mt={2}>
                                {project.tags.map((tag, idx) => (
                                    <Chip key={idx} label={tag} variant="outlined"></Chip>
                                ))}
                            </Box>
                        </CardContent>
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
                <Typography variant="h3" color="#ffffff" gutterBottom>
                    My Projects
                </Typography>
                <Typography variant="subtitle1" color="#bdbdbd">
                    A selection of my work across distributed systems, cybersecurity, and automation.
                </Typography>
                <ProjectShowcase></ProjectShowcase>
            </Container>
        </>)
}
export default Main;
