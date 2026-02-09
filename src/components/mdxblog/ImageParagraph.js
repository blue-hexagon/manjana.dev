import React from "react";
import { Box, Typography } from "@mui/material";
import ZoomableImage from "./ZoomableImage";

const ImageWithText = ({
    imageSrc,
    altText,
    caption,
    children,
    imageWidth = "200px",
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                gap: "16px",
                mb: "1rem",
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    maxWidth: "100%",
                    textAlign: "justify",
                    wordBreak: "break-word",
                }}
            >
                {children}
            </Typography>

            <ZoomableImage
                src={imageSrc}
                alt={altText}
                caption={caption}
                sx={{
                    maxWidth: imageWidth,
                    flexShrink: 0,
                    mt: 2,
                }}
            />
        </Box>
    );
};

export default ImageWithText;
