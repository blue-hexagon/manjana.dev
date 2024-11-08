import React from "react";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./src/theme";
import "./src/css/prism-material-dark.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import './src/css/main.css';

export const wrapRootElement = ({element}) => (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {element}
    </ThemeProvider>
);