import React from 'react'
import Navbar from "./Navbar";
import {Container, Link, Typography} from '@mui/material';
import {Box} from "@mui/system";

export default function Layout({children}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar></Navbar>
            {/* Main Content */}
            <Box sx={{flexGrow: 1, padding: 2}}>
                <Container>
                    {children}
                </Container>
            </Box>

            <footer>
                <Box component="footer" sx={{p: 2, mt: 4, backgroundColor: 'background.paper', textAlign: 'center'}}>
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} manjana/blue-hexagon &mdash; all rights reserved.
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Connect with me on <Link target="_blank" rel="noreferrer" underline="none"
                                                 href="https://github.com/blue-hexagon">GitHub</Link> or&nbsp;
                        <Link target="_blank" rel="noreferrer" underline="none"
                              href="https://www.linkedin.com/in/your-profile">LinkedIn</Link>.
                    </Typography>
                </Box>
            </footer>
        </Box>
    )
}
