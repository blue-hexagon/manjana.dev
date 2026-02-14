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
import ZoomableImage from "./components/mdxblog/ZoomableImage";
import BlogLink from "./components/mdxblog/BlogLink";
import StructuredNote from "./components/mdxblog/StructuredNote";
import Term from "./components/mdxblog/GlossarySystem/Term";
import GlossaryTableMDX from "./components/mdxblog/GlossarySystem/GlossaryTableMdx";
import PageGlossaryTable from "./components/mdxblog/GlossarySystem/PageGlossaryTable";
import {ArticleHeader} from "./components/mdxblog/ArticleHeader";


/**
 * Modular scale: Perfect Fourth (1.333)
 * Base: 1rem
 */

export const H1 = ({ children, ...props }) => (
  <Typography
    variant="h1"
    sx={{
      fontSize: { xs: "2.4rem", md: "3.157rem" },
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
        color: "#ffcc00",
      marginBottom: 3,
    }}
    {...props}
  >
    {children}
  </Typography>
);

export const H2 = ({ children, ...props }) => (
  <Typography
    variant="h2"
    sx={{
      fontSize: { xs: "1.9rem", md: "2.369rem" },
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
      color: "#ffcc00",
      marginBottom: 2.5,
      marginTop: 4,
    }}
    {...props}
  >
    {children}
  </Typography>
);

export const H3 = ({ children, ...props }) => (
  <Typography
    variant="h3"
    sx={{
      fontSize: { xs: "1.5rem", md: "1.777rem" },
      fontWeight: 600,
      lineHeight: 1.3,
      color: "#ff4081",
      marginBottom: 1.5,
      marginTop: 3,
    }}
    {...props}
  >
    {children}
  </Typography>
);

export const H4 = ({ children, ...props }) => (
  <Typography
    variant="h4"
    sx={{
      fontSize: "1.333rem",
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#ff84ad",
      marginBottom: 1,
      marginTop: 2,
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
  <TableContainer
    component={Paper}
    sx={{
      my: 4,
      background: "rgba(18, 18, 22, 0.75)",
      backdropFilter: "blur(6px)",
      border: "1px solid rgba(0,255,204,0.15)",
      borderRadius: "12px",
      boxShadow: "0 0 30px rgba(0,255,204,0.08)",
      overflow: "hidden",

      "& table": {
        borderCollapse: "separate",
        borderSpacing: 0,
      },

      "& thead": {
        background: "rgba(0,255,204,0.05)",
      },

      "& th": {
        fontWeight: 600,
        fontSize: "0.85rem",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        borderBottom: "1px solid rgba(0,255,204,0.25)",
        color: "#00ffcc",
      },

      "& td": {
        fontSize: "0.95rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.85)",
      },

      "& tr:hover td": {
        background: "rgba(255,255,255,0.02)",
      },

      "& tr:last-child td": {
        borderBottom: "none",
      },
    }}
  >
    <Table {...props}>
      {children}
    </Table>
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
    ArticleHeader,
};

