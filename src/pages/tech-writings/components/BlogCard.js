import {Card, CardActionArea, CardContent, Chip, Divider, Stack, Typography} from "@mui/material";
import React from "react";
import {Link} from "gatsby";
import {Box} from "@mui/system";

const BlogCard = ({data}) => {
    if (!data) {
        return null; // Or render some placeholder/error message
    }
    const slug = data.slug || "no-slug";
    const title = data.title || "Untitled";
    return (<Card sx={{
        maxWidth: 400, borderRadius: 2, boxShadow: 5, display: 'flex', flexDirecton: 'column', height: "100%"
    }}>
        <Link to={`/tech-writings/${slug || "no-slug"}`} style={{textDecoration: 'none', color: "inherit"}}>
            <CardActionArea sx={{height: "100%"}}>
                <CardContent
                    sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}>
                    <Box>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                            {data.date || "no date"}
                        </Typography>

                        <Typography variant="h5" component="div" sx={{fontWeight: 'bold', mb: 1}}>
                            {data.title || "no title"}
                        </Typography>

                        <Typography variant="body2" color="text.primary"
                                    sx={{mb: 2, textOverflow: 'ellipsis', flexGrow: 2}}>
                            {data.description.length > 120 ? data.description.slice(0, 120) + '...' : data.description}
                        </Typography>
                    </Box>
                    <Box>
                        <Divider sx={{my: 2}}/>
                        <Box>
                            <Stack direction="row"
                                   spacing={1}
                                   sx={{display: 'flex', flexWrap: 'wrap', alignSelf: 'center'}}>
                                {data.categories.map((category, index) => (<Chip
                                    key={index}
                                    label={category}
                                    variant="outlined"
                                    color="primary"
                                    sx={{fontSize: '0.75rem'}}
                                />))}
                            </Stack>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Link>
    </Card>);
};

export default BlogCard;
