import React from 'react';
import { Typography } from '@mui/material';

const ShadowComment = ({ children }) => {
    return (
        <Typography
            sx={{
                fontFamily: `'Fira Code', monospace`,
                fontSize: '0.95rem',
                color: '#aaaaaa',
                fontStyle: 'italic',
                textShadow: `
                    0 0 5px rgba(255, 255, 255, 0.2),
                    0 0 10px rgba(0, 255, 255, 0.2),
                    0 0 20px rgba(0, 255, 204, 0.2)
                `,
                marginY: 2,
                display: 'block',
                paddingLeft: 0,
                paddingRight: 1,
            }}
        >
            {children}
        </Typography>
    );
};

export default ShadowComment;