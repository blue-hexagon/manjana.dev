import React, {useState} from "react";
import {Box, Modal} from "@mui/material";

const ZoomableImage = ({src, alt, height = "100%", maxWidth = 800, center=true}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {/* Small Image */}
            <Box

                component="img"
                src={src}
                alt={alt}
                sx={{
                    display: "block",
                    textAlign: "center",
                    maxWidth: maxWidth,
                    height: height,
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    "&:hover": {
                        transform: "scale(1.01)",
                    },
                }}
                onClick={handleOpen}
            />

            {/* Modal for Enlarged Image */}
            <Modal open={open} onClose={handleClose} disableRestoreFocus>
                <Box onClick={handleClose}
                     sx={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                         height: "100vh",
                         backgroundColor: "rgba(0, 0, 0, 0.8)",
                     }}
                >
                    <Box
                        component="img"
                        src={src}
                        alt={alt}
                        sx={{
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                            border: "2px solid black",
                        }}
                        onClick={handleClose}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default ZoomableImage;
