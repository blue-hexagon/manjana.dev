import {Box, Link, Typography} from "@mui/material";
import {iconsData} from "../pages";
import React from "react";

export const SpecialIconFooter = () => {
    return (
        <Box style={styles.footerContainer} component="footer"
             sx={{
                 p: 2, mt: 4, textAlign: 'center',
                 backgroundColor: "rgba(18,18,18,0.85)",
                 backdropFilter: "blur(12px)",
                 borderTop: "1px solid rgba(255,255,255,0.07)",
             }}>

            <div style={styles.iconsContainerLeft}>
                {iconsData.slice(0, Math.ceil(iconsData.length / 2)).map((icon, index) => (
                    <IconComponent key={index} iconData={icon}/>
                ))}
            </div>

            <div style={styles.mainText}>
                <Typography variant="body2" color="rgb(85, 85, 85)">
                    <Typography
                        variant="body2"
                        sx={{
                            color: "rgb(85, 85, 85)",
                            textAlign: "center",
                            lineHeight: 1.5,
                        }}
                    >
                        © 2025–{new Date().getFullYear()}
                        <Box
                            component="span"
                            sx={{
                                display: {xs: "block", sm: "inline"},
                            }}
                        >
                            {" "}manjana/blue-hexagon
                        </Box>
                    </Typography>
                    <Typography sx={{display: {xs: "none", md: "none", lg: "none", xl: "block"},}} variant="body2"
                                color="rgb(85, 85, 85)">
                        Connect with me on <Link target="_blank" rel="noreferrer" underline="none"
                                                 href="https://github.com/blue-hexagon">GitHub</Link> or&nbsp;
                        <Link target="_blank" rel="noreferrer" underline="none"
                              href="https://www.linkedin.com/in/your-profile">LinkedIn</Link>.
                    </Typography>
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
        alignItems:"center",
        overflow: "hidden"
    },
    mainText: {
        width: '25%',
        mx: "0.7rem",
        textAlign: 'center',
        color: 'rgba(255,255,255,0.15)',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    iconsContainerRight: {
        display: 'inline-flex',
        width: '50%',
        justifyContent: 'flex-start',
        alignItems:"center",
        overflow: "hidden"
    },
    icon: {
        margin: '0.5rem',
        transition: 'transform 0.3s ease',
        lineHeight: 1,
    },
    iconImage: {
        fontSize: '1.6rem',
        color: 'rgb(50, 50, 50)',
        lineHeight: 1,
    },
};

