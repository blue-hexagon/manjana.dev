import React from "react";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./src/theme";
import "./src/css/prism-material-dark.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import './src/css/main.css';
import Layout from "./src/components/Layout";
import {DesignSystemComponents} from "./src/theme_mdx";
import {MDXProvider} from "@mdx-js/react";

export const wrapRootElement = ({element}) => (
    <ThemeProvider theme={theme}>
        <MDXProvider components={{...DesignSystemComponents}}>
            <CssBaseline/>
            {element}
        </MDXProvider>
    </ThemeProvider>
);
export const wrapPageElement = ({element, props}) => {
    return <Layout {...props}>{element}</Layout>;
};