import React from 'react';
import {Typography, Link, Box, Divider} from '@mui/material';
const neonTextStyle = {
  color: '#00ffcc',  // Neon cyan color for emphasis
  textShadow: '0 0 15px rgba(0, 255, 204, 0.75)',  // Glowing effect for text
  fontFamily: `'Fira Code', monospace`,
};
export const H1 = ({children, ...props}) => (
    <>
        <Typography sx={{...neonTextStyle, fontSize: '3rem', fontWeight: 900}} variant="h1" gutterBottom {...props}>
            {children}
        </Typography>
        <Divider sx={{
            background: 'linear-gradient(to right, #ff4081, #ffcc00)',
            height: '2px',
            borderRadius: '4px',
            margin: '20px 0',
            boxShadow: '0 0 10px rgba(255, 64, 129, 0.6)' // Adds a glowing shadow effect
        }}/>
    </>
);

const H2 = ({children, ...props}) => (
    <Typography
        variant="h2"
        sx={{
            color: '#ff4081', // Vivid pink to contrast the primary cyan heading
            fontWeight: 600,
            fontSize: '2rem',
            marginBottom: 2
        }}
        {...props}
    >
        {children}
    </Typography>
);

const H3 = ({children, ...props}) => (
    <Typography
        variant="h3"
        sx={{
            color: '#e0e0e0', // Neutral light gray to match body text for subheadings
            fontWeight: 500,
            fontSize: '1.6rem',
            marginBottom: 1
        }}
        {...props}
    >
        {children}
    </Typography>
);

const Paragraph = ({children, ...props}) => (
    <Typography
        variant="body1"
        sx={{
            color: '#e0e0e0', // Off-white color for text to maintain contrast with dark background
            fontSize: '1.1rem',
            lineHeight: 1.6,
            marginBottom: 2,
        }}
        paragraph
        {...props}
    >
        {children}
    </Typography>
);

const CustomLink = ({children, ...props}) => (
    <Link
        sx={{
            color: '#00ffcc', // Primary color for link consistency
            textDecoration: 'underline',
            ':hover': {
                color: '#ff4081', // Hover effect with secondary color
            },
        }}
        {...props}
    >
        {children}
    </Link>
);

const Code = ({children, ...props}) => (
    <Box
        component="pre"
        sx={{
            backgroundColor: '#262626', // Slightly darkened code block background
            color: '#f5f5f5', // Off-white text to contrast dark background
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontFamily: 'Fira Code, monospace', // Monospace font for coding clarity
            fontSize: '1.1rem',
            margin: '20px 0', // Add some spacing around the code block
        }}
        {...props}
    >
        {children}
    </Box>
);

// Export all components for MDX usage
export const DesignSystemComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    p: Paragraph,
    a: CustomLink,
    code: Code,
};
