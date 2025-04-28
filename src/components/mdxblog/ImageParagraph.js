import React from "react";
import {Box, Typography} from "@mui/material";

const ImageWithText = ({imageSrc, altText, children,imageWidth="200px"}) => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb:"1rem"}}>
            <Typography variant="body1" sx={{maxWidth: '100vw', textAlign: 'justify', wordBreak: 'break-word'}}>
                {children}
            </Typography>
            <Box
                component="img"
                src={imageSrc}
                alt={altText}
                sx={{
                    maxWidth: imageWidth,
                    marginLeft: '16px',
                }}
            />
        </Box>
    );
};

export default ImageWithText;
