import React, { useState } from 'react';
import { Popper, Typography, Fade, Box } from '@mui/material';

const HelperLinkText = ({ children, popoverText, href }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Typography
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    fontFamily: `'Fira Code', monospace`,
                    fontSize: '0.95rem',
                    color: '#00ffee',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    fontStyle: 'italic',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                        color: '#00ffff',
                    }
                }}
            >
                {children}
            </Typography>

            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="top-start"
                transition
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10],
                        },
                    },
                ]}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                        <Box
                            sx={{
                                backgroundColor: '#121212',
                                border: '1px solid #00ffcc',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                boxShadow: '0 0 10px rgba(0,255,204,0.4)',
                                color: '#00ffcc',
                                fontFamily: `'Fira Code', monospace`,
                                fontSize: '0.8rem',
                                maxWidth: '300px',
                                overflowWrap: 'break-word',
                                zIndex: 10,
                            }}
                        >
                            {popoverText}
                        </Box>
                    </Fade>
                )}
            </Popper>
        </>
    );
};

export default HelperLinkText;
