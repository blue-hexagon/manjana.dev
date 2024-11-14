import React from 'react'
import Navbar from "./Navbar";
import {Container, Link, Typography} from '@mui/material';
import {Box} from "@mui/material";
import {iconsData} from "../pages";
import {useLocation} from "@reach/router";
import {DesignSystemComponents} from "../theme_mdx";
import {MDXProvider} from "@mdx-js/react";

export default function Layout({children}) {
    const location = useLocation()
    let specialPage = false;
    if (location.pathname === "/") {
        specialPage = true
    }
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <Navbar></Navbar>
            {/* Main Content */}
            <Box sx={{flexGrow: 1, padding: 2}}>
                <Container>
                    {children}
                </Container>
            </Box>
            {specialPage === true && <IconFooter></IconFooter> || (
                <Box component="footer" style={{padding: '0.7rem 0'}}
                     sx={{p: 2, mt: 4, backgroundColor: 'background.paper', textAlign: 'center'}}>
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} manjana/blue-hexagon &mdash; all rights reserved.
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Connect with me on <Link target="_blank" rel="noreferrer" underline="none"
                                                 href="https://github.com/blue-hexagon">GitHub</Link> or&nbsp;
                        <Link target="_blank" rel="noreferrer" underline="none"
                              href="https://www.linkedin.com/in/your-profile">LinkedIn</Link>.
                    </Typography>
                </Box>
            )}
        </Box>
    )
}


const IconFooter = () => {
    return (
        <Box style={styles.footerContainer} component="footer"
             sx={{p: 2, mt: 4, backgroundColor: 'background.paper', textAlign: 'center'}}>
            <div style={styles.iconsContainerLeft}>
                {iconsData.slice(0, Math.ceil(iconsData.length / 2)).map((icon, index) => (
                    <IconComponent key={index} iconData={icon}/>
                ))}
            </div>

            <div style={styles.mainText}>
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} manjana/blue-hexagon &mdash; all rights reserved.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Connect with me on <Link target="_blank" rel="noreferrer" underline="none"
                                             href="https://github.com/blue-hexagon">GitHub</Link> or&nbsp;
                    <Link target="_blank" rel="noreferrer" underline="none"
                          href="https://www.linkedin.com/in/your-profile">LinkedIn</Link>.
                </Typography>

            </div>

            <div style={styles.iconsContainerRight}>
                {iconsData.slice(Math.ceil(iconsData.length / 2)).map((icon, index) => (
                    <IconComponent key={index} iconData={icon}/>
                ))}
            </div>
        </Box>
    );
};

const IconComponent = ({iconData}) => {
    const {Icon, label} = iconData;

    // Apply random or level-based rotation (between -30 and 30 degrees for variance)
    const rotation = Math.random() * 60 - 30;

    return (
        <div style={{...styles.icon, transform: `rotate(${rotation}deg)`}}>
            <Icon title={label} style={styles.iconImage}/>
        </div>
    );
};

// Footer.js - Styles (inline for simplicity)
const styles = {
    footerContainer: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.3rem 0',
        position: 'relative',
    },
    iconsContainerLeft: {
        display: 'inline-flex',
        width: '50%',
        justifyContent: 'flex-end',
        overflow: "hidden"
    },
    mainText: {
        width: '29%',
        textAlign: 'center',
        color: '#fff',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    iconsContainerRight: {
        display: 'inline-flex',
        width: '50%',
        justifyContent: 'flex-start',
        overflow: "hidden"
    },
    icon: {
        margin: '0.5rem',
        transition: 'transform 0.3s ease',
    },
    iconImage: {
        fontSize: '1.8rem',
        color: 'rgb(50, 50, 50)',
    },
};

