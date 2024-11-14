import React from "react";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./src/css/reset.css";
import theme from "./src/theme";
import "./src/css/prism-material-dark.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/command-line/prism-command-line.css";
import './src/css/main.css';
import Layout from "./src/components/Layout";
import {MDXProvider} from "@mdx-js/react";
import {DesignSystemComponents} from "./src/theme_mdx";

export const wrapRootElement = ({element}) => (
    <ThemeProvider theme={theme}>
        <MDXProvider components={DesignSystemComponents}>
            <CssBaseline/>
            {element}
        </MDXProvider>
    </ThemeProvider>
);
export const wrapPageElement = ({element, props}) => {
    return <Layout {...props}>{element}</Layout>;
};