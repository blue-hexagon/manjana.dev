import React from 'react';
import {Typography, Box} from '@mui/material';
import ZoomableImage from "./components/ZoomableImage";
import BlogLink from "./components/mdxblog/BlogLink";

const neonTextStyle = {
    color: '#00ffcc',
    textShadow: '0 0 15px rgba(0, 255, 204, 0.75)',
    fontFamily: `'Fira Code', monospace`,
};
export const H1 = ({children, ...props}) => (
    <>
        <Typography sx={{...neonTextStyle, fontSize: '3rem', fontWeight: 900}} variant="h1" {...props}>
            {children}
        </Typography>
    </>
);

const H2 = ({children, ...props}) => (
    <Typography
        variant="h2"
        sx={{
            color: '#ffcc00',
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
            color: '#ff4081',
            fontWeight: 550,
            fontSize: '1.6rem',
            marginBottom: 1,
            paddingTop: 1,
        }}
        {...props}
    >
        {children}
    </Typography>
);

const H4 = ({children, ...props}) => (
    <Typography
        variant="h4"
        sx={{
            color: '#ff84ad',
            fontWeight: 550,
            fontSize: '1.2rem',
            marginBottom: 1,
            paddingTop: 1,
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
            color: '#e0e0e0',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            marginBottom: 2,
            marginTop: 1.25
        }}
        paragraph
        {...props}
    >
        {children}
    </Typography>
);


const ZoomableImageComponent = {
    img: (props) => <ZoomableImage sx={{
        marginTop: 1.25,
    }} {...props} />,
};



// Export all components for MDX usage
export const DesignSystemComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: Paragraph,
    a: BlogLink,
    img: ZoomableImageComponent
};

