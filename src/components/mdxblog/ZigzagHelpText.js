import React from 'react';
import { Tooltip, Typography } from '@mui/material';

const ZigzagHelpText = ({ children, helpText }) => {
    return (
        <Tooltip
            title={helpText}
            arrow
            placement="top"
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: '#121212',
                        color: '#00ffcc',
                        fontFamily: `'Fira Code', monospace`,
                        fontSize: '0.9rem',
                        border: '1px solid #00ffcc',
                        boxShadow: '0 0 10px rgba(0, 255, 204, 0.5)',
                    }
                }
            }}
        >
            <Typography
                component="span"
                sx={{
                    display: 'inline-block',
                    position: 'relative',
                    color: '#ffcc00',
                    cursor: 'help',
                    fontFamily: `'Fira Code', monospace`,
                    fontSize: '1.05rem',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: '2px',
                        backgroundImage: `
                            repeating-linear-gradient(
                                135deg,
                                #ffcc00 0px,
                                #ffcc00 2px,
                                transparent 2px,
                                transparent 4px
                            )
                        `,
                        backgroundSize: '4px 4px',
                        transform: 'translateY(2px)',
                    },
                    '&:hover::after': {
                        backgroundImage: `
                            repeating-linear-gradient(
                                135deg,
                                #00ffcc 0px,
                                #00ffcc 2px,
                                transparent 2px,
                                transparent 4px
                            )
                        `,
                    }
                }}
            >
                {children}
            </Typography>
        </Tooltip>
    );
};

export default ZigzagHelpText;
