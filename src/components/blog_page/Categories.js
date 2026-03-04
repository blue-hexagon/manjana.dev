import {Button, TextField, Typography, Box, Stack, Chip} from "@mui/material";
import React from "react";

const CategoriesComponent = ({
                                 articlesCount,
                                 categories,
                                 search,
                                 onSearchChange,
                                 activeCategory,
                                 onCategorySelect
                             }) => {
    return (
        <>
            {/* Search Field */}
            <Box sx={{mb: 2}}>
                <TextField
                    label={`Search ${articlesCount} Articles`}
                    variant="standard"
                    fullWidth
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    InputProps={{
                        style: {color: "#ffffff"}
                    }}
                    InputLabelProps={{
                        style: {color: "#bdbdbd"}
                    }}
                    sx={{
                        "& .MuiInput-underline:before": {
                            borderBottomColor: "rgba(255,255,255,0.3)",
                        },
                        "& .MuiInput-underline:hover:before": {
                            borderBottomColor: "#00ffcc",
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: "#00ffcc",
                        },
                    }}
                />
            </Box>
            {/* Category Row */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 1,
                }}
            >

                {/* CATEGORY FILTERS */}
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        flexWrap: "wrap",
                        rowGap: 1
                    }}
                >
                    {Array.isArray(categories) && categories.length > 0 ? (

                        categories.map((category) => {

                            const isActive = activeCategory === category;

                            return (
                                <Chip
                                    key={category}
                                    label={category}
                                    clickable
                                    onClick={() =>
                                        onCategorySelect(
                                            isActive ? null : category
                                        )
                                    }
                                    color={isActive ? "primary" : "default"}
                                    variant={isActive ? "filled" : "outlined"}
                                    sx={{
                                        fontSize: "0.75rem",
                                        borderRadius: 1
                                    }}
                                />
                            );
                        })

                    ) : (

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            No categories available.
                        </Typography>

                    )}
                </Stack>
            </Box>


        </>
    );
};

export default CategoriesComponent;
