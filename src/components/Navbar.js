import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();


    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

const menuItems = [
    { text: "Projects", link: "/projects", icon: <DashboardIcon fontSize="small" /> },
    { text: "Writings", link: "/blog", icon: <ArticleIcon fontSize="small" /> },
    { text: "Knowledge", link: "/knowledge", icon: <MenuBookIcon fontSize="small" /> },
    { text: "Contact", link: "/contact", icon: <MailOutlineIcon fontSize="small" /> }
];

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: "rgba(18,18,18,0.85)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)"
            }}
        >
            <Toolbar
                sx={{
                    minHeight: 64,
                    px: 3
                }}
            >
                {/* Brand */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                letterSpacing: "1px",
                                fontFamily: "monospace",
                                color: "#ffffff"
                            }}
                        >
                            manjana
                            <Box
                                component="span"
                                sx={{ color: "#00ffcc" }}
                            >
                                .dev
                            </Box>
                        </Typography>
                    </Link>
                </Box>

                {/* Desktop Navigation */}
                <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.link;

                        return (
                            <Button
    key={item.text}
    component={Link}
    to={item.link}
    sx={{
        mx: 1,
        color: isActive ? "#00ffcc" : "#ffffff",
        borderBottom: isActive
            ? "2px solid #00ffcc"
            : "2px solid transparent",
        borderRadius: 0,
        "&:hover": {
            backgroundColor: "rgba(255,255,255,0.05)"
        }
    }}
>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {item.icon}
        {item.text}
    </Box>
</Button>
                        );
                    })}

                    {/* GitHub Icon */}
                    <IconButton
                        component="a"
                        href="https://github.com/blue-hexagon"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            ml: 2,
                            color: "#ffffff",
                            "&:hover": {
                                color: "#00ffcc"
                            }
                        }}
                    >
                        <GitHubIcon />
                    </IconButton>
                </Box>

                {/* Mobile Menu Icon */}
                <IconButton
                    edge="end"
                    color="inherit"
                    sx={{ display: { md: "none" } }}
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>

                {/* Mobile Drawer */}
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#121212",
                            width: 250
                        }
                    }}
                >
                    <List>
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.link;

                            return (
                                <ListItemButton
    key={item.text}
    component={Link}
    to={item.link}
    onClick={handleDrawerToggle}
    sx={{
        color: isActive ? "#00ffcc" : "#ffffff"
    }}
>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {item.icon}
        <ListItemText primary={item.text} />
    </Box>
</ListItemButton>
                            );
                        })}
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
