import {Button, Grid2, TextField, Typography} from "@mui/material";
import React from "react";

const CategoriesComponent = ({articlesCount, categories}) => {
    console.log(categories);

    return (<>
        <Typography variant="h6" gutterBottom sx={{marginTop: 2}}>Filter</Typography>
        <Grid2 container spacing={2}>
            {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category, index) => (
                    <Grid2 item key={category }>
                        <Button
                            variant="outlined">{String(category).charAt(0).toUpperCase() + String(category).slice(1)}</Button>
                    </Grid2>))) : (<Typography>No categories available.</Typography>)}
            <TextField
                label={`Search ${articlesCount} Articles`}
                variant="standard"
                fullWidth
                size={"medium"}
                sx={{marginBottom: 2}}/>
        </Grid2>
    </>)
}
export default CategoriesComponent