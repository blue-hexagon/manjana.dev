import React, { useState, useRef } from "react";
import {
    Link,
    Popper,
    Fade,
    Box,
    Typography,
    useTheme,
} from "@mui/material";

type BlogLinkProps = {
    children: React.ReactNode;
    href: string;
    preview?: {
        title?: string;
        description?: string;
        meta?: string; // e.g. domain / type
    };
};

export default function BlogLink({ children, href, preview }: BlogLinkProps) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLElement | null>(null);
    const theme = useTheme();

    const isExternal = /^https?:\/\//.test(href);

    const handleOpen = (event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
        anchorRef.current = event.currentTarget;
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Link
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                underline="none"
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                onFocus={handleOpen}
                onBlur={handleClose}
                sx={{
                    color: "#00ffcc",
                    fontFamily: `'Fira Code', monospace`,
                    fontSize: "1.05rem",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.2s ease",

                    "&:hover": {
                        color: "#ff4081",
                    },

                    // subtle underline animation (feels premium)
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: -2,
                        width: 0,
                        height: "1px",
                        background: "#ff4081",
                        transition: "width 0.2s ease",
                    },
                    "&:hover::after": {
                        width: "100%",
                    },
                }}
            >
                {children}
                {isExternal && " ↗"}
            </Link>

            {preview && (
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="top-start"
                    transition
                    modifiers={[
                        {
                            name: "offset",
                            options: { offset: [0, 12] },
                        },
                    ]}
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={150}>
                            <Box
                                sx={{
                                    backgroundColor: "#121212",
                                    border: "1px solid rgba(0,255,204,0.4)",
                                    borderRadius: "10px",
                                    p: 1.5,
                                    boxShadow: "0 8px 30px rgba(0,255,204,0.15)",
                                    color: "#e0e0e0",
                                    fontFamily: `'Fira Code', monospace`,
                                    maxWidth: 320,
                                    zIndex: 1300,
                                }}
                            >
                                {preview.title && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "#00ffcc",
                                            display: "block",
                                            mb: 0.5,
                                        }}
                                    >
                                        {preview.title}
                                    </Typography>
                                )}

                                {preview.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: "0.75rem",
                                            lineHeight: 1.4,
                                            opacity: 0.85,
                                        }}
                                    >
                                        {preview.description}
                                    </Typography>
                                )}

                                {preview.meta && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: "block",
                                            mt: 0.75,
                                            opacity: 0.5,
                                        }}
                                    >
                                        {preview.meta}
                                    </Typography>
                                )}
                            </Box>
                        </Fade>
                    )}
                </Popper>
            )}
        </>
    );
}