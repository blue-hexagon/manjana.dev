import { Button, TextField, Typography, Box } from "@mui/material";
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
            <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 2, mb: 2 }}
            >
                Filter
            </Typography>

            {/* Category Row */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 4,
                }}
            >
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category) => {
                        const isActive = activeCategory === category;

                        return (
                            <Button
                                key={category}
                                variant={isActive ? "contained" : "outlined"}
                                onClick={() =>
                                    onCategorySelect(
                                        isActive ? null : category
                                    )
                                }
                                sx={{
                                    borderColor: "#00ffcc",
                                    color: isActive ? "#000" : "#00ffcc",
                                    backgroundColor: isActive
                                        ? "#00ffcc"
                                        : "transparent",
                                    "&:hover": {
                                        backgroundColor: isActive
                                            ? "#00e6b8"
                                            : "rgba(0,255,204,0.08)",
                                        borderColor: "#00ffcc",
                                    }
                                }}
                            >
                                {category}
                            </Button>
                        );
                    })
                ) : (
                    <Typography>No categories available.</Typography>
                )}
            </Box>

            {/* Search Field */}
            <Box sx={{ mb: 2 }}>
                <TextField
                    label={`Search ${articlesCount} Articles`}
                    variant="standard"
                    fullWidth
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    InputProps={{
                        style: { color: "#ffffff" }
                    }}
                    InputLabelProps={{
                        style: { color: "#bdbdbd" }
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
        </>
    );
};

export default CategoriesComponent;
