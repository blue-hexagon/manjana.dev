import React from "react";
import {AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";
import {Box} from "@mui/system";
import {useState} from "react";
import {Link} from "gatsby";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    // Define your menu items
    const menuItems = [
        {text: "Home", link: "/"}, {text: "Projects", link: "/projects"},
        {text: "Writings", link: "/blog"},
        {text: "Contact", link: "/contact"},
        {text: "Knowledge", link: "/knowledge"}
    ];

    return (<AppBar position="static">
        <Toolbar>
            <Link to={"/"} style={{textDecoration: 'none', marginRight: '16px'}}>
                <Typography variant="h6" color={"text.primary"}
                            component="div"
                            sx={{flexGrow: 1, textDecoration: 'none'}}>
                    >> manjana.dev
                </Typography>
            </Link>
            {/* Desktop Menu */}
            <Box sx={{display: {xs: "none", md: "block"}}}>
                {menuItems.map((item) => (

                    <Button color="inherit" key={item.text} mx="2" component={Link} to={item.link}>
                        {item.text}
                    </Button>))}
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{display: {md: "none"}, ml: "auto"}}
                onClick={handleDrawerToggle}
            >
                <MenuIcon/>
            </IconButton>

            {/* Mobile Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={handleDrawerToggle}
                    onKeyDown={handleDrawerToggle}
                >
                    <List>
                        {menuItems.map((item) => (<ListItem button key={item.text} component={Link} to={item.link}>
                            <ListItemText primary={item.text}/>
                        </ListItem>))}
                    </List>
                </Box>
            </Drawer>
        </Toolbar>
    </AppBar>);
};

export default Navbar;
