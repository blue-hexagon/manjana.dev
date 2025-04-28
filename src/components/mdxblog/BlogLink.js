import { Link, Popper, Fade, Box } from '@mui/material';
import React, { useState } from 'react';

const BlogLink = ({ children, hoverText, ...props }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMouseEnter = (event) => {
        if (hoverText) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleMouseLeave = () => {
        if (hoverText) {
            setAnchorEl(null);
        }
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Link
                sx={{
                    color: '#00ffcc', // Primary color for link consistency
                    textDecoration: 'none',
                    fontFamily: `'Fira Code', monospace`,
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                        color: '#ff4081', // Hover effect with secondary color
                    },
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                {children}
            </Link>

            {hoverText && (
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
                                {hoverText}
                            </Box>
                        </Fade>
                    )}
                </Popper>
            )}
        </>
    );
};

export default BlogLink;
