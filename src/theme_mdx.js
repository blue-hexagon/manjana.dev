import React from 'react';
import {Typography, Link, Box, Divider} from '@mui/material';

export const H1 = ({children, ...props}) => (
    <>
        <h6 sx={{color: "green"}} variant="h6" gutterBottom {...props}>
            {children}
        </h6>
        <Divider sx={{marginBottom: 2}}/>
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
        backgroundColor: '#f5f5f5',
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
