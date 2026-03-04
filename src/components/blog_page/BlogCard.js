import React from "react";
import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "gatsby";

const BlogCard = ({ data }) => {

    if (!data) return null;

    const fm = data.frontmatter || {};

    const slug = fm.slug || "no-slug";
    const title = fm.title || "Untitled";
    const description = fm.description || "";
    const date = fm.date || "";
    const tags = fm.tags || [];
    const featured = fm.featured || false;

    return (
        <Card
            elevation={0}
            sx={{
                width: "100%",
                height: "100%",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
                transition: "border-color 160ms ease",

                "&:hover": {
                    borderColor: "text.primary"
                }
            }}
        >
            <Link
                to={`/${slug}`}
                style={{
                    textDecoration: "none",
                    color: "inherit",
                    height: "100%"
                }}
            >

                <CardActionArea sx={{ height: "100%" }}>

                    <CardContent
                        sx={{
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%"
                        }}
                    >

                        {/* CONTENT */}
                        <Box sx={{ flexGrow: 1 }}>

                            {featured && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                        letterSpacing: 1,
                                        color: "primary.main",
                                        mb: 1,
                                        display: "block"
                                    }}
                                >
                                    FEATURED
                                </Typography>
                            )}

                            {/* TITLE */}
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 600,
                                    lineHeight: 1.35,
                                    mb: 1,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden"
                                }}
                            >
                                {title}
                            </Typography>

                            {/* META */}
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ mb: 1.5 }}
                            >
                                {date}
                            </Typography>

                            {/* SUMMARY */}
                            {description && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden"
                                    }}
                                >
                                    {description}
                                </Typography>
                            )}

                        </Box>

                        {/* TAGS */}
                        {tags.length > 0 && (
                            <Stack
                                direction="row"
                                spacing={0.8}
                                sx={{
                                    flexWrap: "wrap",
                                    mt: 2.5
                                }}
                            >
                                {tags.slice(0, 4).map((tag, i) => (
                                    <Chip
                                        key={i}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            fontSize: "0.72rem",
                                            height: 24,
                                            borderRadius: 1
                                        }}
                                    />
                                ))}
                            </Stack>
                        )}

                    </CardContent>

                </CardActionArea>

            </Link>

        </Card>
    );
};

export default BlogCard;