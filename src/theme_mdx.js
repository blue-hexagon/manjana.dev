import React from 'react';
import {Typography, Link, Box, Divider} from '@mui/material';

export const H1 = ({children, ...props}) => (
    <>
        <Typography sx={{color: "white"}} variant="h1" gutterBottom {...props}>
            {children}
        </Typography>
        <Divider sx={{background: 'linear-gradient(to right, #ffcc00  , #ff4081)', height: '2px',borderRadius: '1px',margin: '16px 0'}}/>
    </>
);

const H2 = (props) => (
    <Typography variant="h2" gutterBottom {...props} />
);

const H3 = (props) => (
    <Typography variant="h3" gutterBottom {...props} />
);

const Paragraph = (props) => (
    <Typography variant="body1" paragraph {...props} />
);

const CustomLink = (props) => (
    <Link color="primary" underline="hover" {...props} />
);

const Code = (props) => (
    <Box component="pre" sx={{
        backgroundColor: '#851d1d',
        padding: '16px',
        borderRadius: '8px',
        overflow: 'auto',
    }} {...props} />
);

// Export all components as an object
export const DesignSystemComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    p: Paragraph,
    a: CustomLink,
    code: Code,
};
