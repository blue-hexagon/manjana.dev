import React from 'react';
import {Typography} from '@mui/material';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper
} from "@mui/material";
import ZoomableImage from "./components/ZoomableImage";
import BlogLink from "./components/mdxblog/BlogLink";
import StructuredNote from "./components/mdxblog/StructuredNote";
import Term from "./components/mdxblog/GlossarySystem/Term";
import GlossaryTableMDX from "./components/mdxblog/GlossarySystem/GlossaryTableMdx";
import PageGlossaryTable from "./components/mdxblog/GlossarySystem/PageGlossaryTable";

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


const ZoomableImageComponent = (props) => {
  return <ZoomableImage {...props} sx={{ marginTop: 1.25 }} />;
};

const MDXTable = ({ children, ...props }) => (
  <TableContainer component={Paper} sx={{ my: 3 }}>
    <Table {...props}>{children}</Table>
  </TableContainer>
);

const MDXThead = (props) => <TableHead {...props} />;
const MDXTbody = (props) => <TableBody {...props} />;
const MDXTr = (props) => <TableRow {...props} />;

const MDXTh = (props) => (
  <TableCell sx={{ fontWeight: 700 }} {...props} />
);

const MDXTd = (props) => (
  <TableCell {...props} />
);

// Export all components for MDX usage
export const DesignSystemComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: Paragraph,
    a: BlogLink,
    img: ZoomableImageComponent,
    table: MDXTable,
    thead: MDXThead,
    tbody: MDXTbody,
    tr: MDXTr,
    th: MDXTh,
    td: MDXTd,
    StructuredNote,
    Term,
    Glossary:GlossaryTableMDX,
    PageGlossary:PageGlossaryTable,
};

