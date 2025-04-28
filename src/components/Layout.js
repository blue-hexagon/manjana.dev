import React from 'react'
import Navbar from "./Navbar";
import {Container} from '@mui/material';
import {Box} from "@mui/material";
import {useLocation} from "@reach/router";
import useMediaQuery from '@mui/material/useMediaQuery';
import {PlainIconFooter, SpecialIconFooter} from "./Footers";

export default function Layout({children}) {
    const location = useLocation()
    let specialPage = false;
    if (location.pathname === "/") {
        specialPage = true
    }
    const matches = useMediaQuery('(min-width:1800px)');

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <Navbar></Navbar>
            <Box sx={{flexGrow: 1, padding: 2}}>
                <Container>
                    {children}
                </Container>
            </Box>
            {(specialPage === true && matches) && <SpecialIconFooter/> || <PlainIconFooter/>}
        </Box>
    )
}


