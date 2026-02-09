import React, { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";

const ZoomableImage = ({
    src,
    alt,
    caption,
    sx = {},
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Inline image + caption */}
            <Box
                component="figure"
                sx={{
                    margin: 0,
                    textAlign: "center",
                }}
            >
                <Box
                    component="img"
                    src={src}
                    alt={alt}
                    onClick={() => setOpen(true)}
                    sx={{
                        cursor: "zoom-in",
                        transition: "transform 0.25s ease",
                        "&:hover": { transform: "scale(1.02)" },
                        display: "block",
                        ...sx,
                    }}
                />

                {caption && (
                    <Typography
                        component="figcaption"
                        variant="caption"
                        sx={{
                            mt: 0.5,
                            color: "text.secondary",
                            lineHeight: 1.4,
                        }}
                    >
                        {caption}
                    </Typography>
                )}
            </Box>

            {/* Zoom modal */}
            <Modal open={open} onClose={() => setOpen(false)} disableRestoreFocus>
                <Box
                    onClick={() => setOpen(false)}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.85)",
                    }}
                >
                    <Box
                        component="img"
                        src={src}
                        alt={alt}
                        sx={{
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                            border: "2px solid #000",
                            cursor: "zoom-out",
                        }}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default ZoomableImage;
