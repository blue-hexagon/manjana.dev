import {Button, Grid2, TextField, Typography} from "@mui/material";
import React from "react";

const categories = ["React", "JavaScript", "CSS", "Web Development", "Performance"];
const CategoriesComponent = ({articlesCount}) => {
    return (<>
        <Typography variant="h6" gutterBottom sx={{marginTop: 2}}>
            Filter
        </Typography>
        <Grid2 container spacing={2}>
            {categories.map((category, index) => (<Grid2 item key={index}>
                <Button variant="outlined">{category}</Button>
            </Grid2>))}
            <TextField
                label={`Search ${articlesCount} Articles`}
                variant="standard"
                fullWidth
                size={"medium"}
                sx={{marginBottom: 2}}
            />
        </Grid2></>)
}
export default CategoriesComponent