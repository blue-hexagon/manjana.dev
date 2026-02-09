import React from 'react'
import Navbar from "./Navbar";
import {Container} from '@mui/material';
import {Box} from "@mui/material";
import {useLocation} from "@reach/router";
import useMediaQuery from '@mui/material/useMediaQuery';
import {PlainIconFooter, SpecialIconFooter} from "./Footers";
import {ToCDrawer} from "./toc/ToCDrawer"
import {GlossaryContext} from "./mdxblog/GlossarySystem/GlossaryContext";

export default function Layout({children, data}) {
    const title = data?.mdx?.frontmatter?.title
    const toc = data?.mdx?.tableOfContents
    const tocDepth = data?.mdx?.frontmatter?.tocDepth ?? 2;
    const glossaryPrefix = data?.mdx?.frontmatter?.glossaryPrefix ?? null;
    const location = useLocation()
    let specialPage = false;
    if (location.pathname === "/") {
        specialPage = true
    }
    const matches = useMediaQuery('(min-width:1800px)');

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <Navbar></Navbar>
            {toc?.items && <ToCDrawer title={title} toc={toc} tocDepth={tocDepth}/>}
            <Box sx={{flexGrow: 1, padding: 2}}>
                <Container>
                    <GlossaryContext.Provider value={glossaryPrefix}>
                        {children}
                    </GlossaryContext.Provider>
                </Container>
            </Box>
            {(specialPage === true && matches) && <SpecialIconFooter/> || <PlainIconFooter/>}
        </Box>
    )
}


