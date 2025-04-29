import React, {useState} from 'react';
import {
    Typography, Container, Grid2, TextField, Box
} from '@mui/material';
import {graphql, useStaticQuery} from 'gatsby'
import CategoriesComponent from "../../components/blog_page/Categories";
import BlogCard from "../../components/blog_page/BlogCard";
import {Button, Alert} from "@mui/material";
import {styled} from "@mui/system";

const FormContainer = styled(Container)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    borderRadius: "8px",
    backgroundColor: "#1c1c1c",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.up("sm")]: {
        width: "100%",
    },
}));

const StyledButton = styled(Button)(({theme}) => ({
    marginTop: "1rem",
    backgroundColor: "#8ab4f8",
    color: "#000000",
    "&:hover": {
        backgroundColor: "#6a93d7",
    },
}));

const NewsletterForm = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email) {
            setError("Email is required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // TODO: add the function to actually handle the subscription logic
        // (e.g., API call to subscribe the user). This is a placeholder for now.
        setSuccess("Thank you for subscribing!");

        setEmail("");
    };

    return (
        <FormContainer>
            <Typography variant="h5" color="#ffffff" gutterBottom>
                Subscribe to New Articles
            </Typography>
            <Typography variant="body2" color="#bdbdbd" gutterBottom>
                Get the latest articles directly to your inbox.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{width: "100%", mt: 2}}>
                <TextField
                    variant="outlined"
                    label="Your Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error}
                    helperText={error}
                    InputProps={{
                        style: {color: "#ffffff"},
                    }}
                    InputLabelProps={{
                        style: {color: "#bdbdbd"},
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#8ab4f8",
                            },
                            "&:hover fieldset": {
                                borderColor: "#6a93d7",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#8ab4f8",
                            },
                        },
                    }}
                />

                <StyledButton type="submit" variant="contained" fullWidth>
                    Subscribe
                </StyledButton>

                {success && (
                    <Alert severity="success" sx={{mt: 2}}>
                        {success}
                    </Alert>
                )}
            </Box>
        </FormContainer>
    );
};


export const PostsComponent = ({heading, featuredOnly, data}) => {


    const returnFeaturedOnly = featuredOnly || false
    return (
        <>
            {(heading !== null) &&
                <Typography variant="h4" gutterBottom sx={{marginTop: 4}}>
                    {heading}
                </Typography>
            }
            <Grid2 container rowSpacing={1.5} columnSpacing={{xs: 1, sm: 2, md: 1.5}}>
                {returnFeaturedOnly &&
                    data.allMdx.edges
                        .filter(({node}) => node.frontmatter.featured === true)
                        .map(({node}) => (
                            <Grid2 item size={{xs: 12, sm: 6, lg: 4}} key={node.id}>
                                <BlogCard data={node}></BlogCard>
                            </Grid2>
                        ))}
                {!returnFeaturedOnly &&
                    data.allMdx.edges
                        .map(({node}) => (
                            <Grid2 item size={{xs: 12, sm: 6, lg: 4}} key={node.id}>
                                <BlogCard data={node}></BlogCard>
                            </Grid2>
                        ))}

            </Grid2>
        </>
    );
};


const IndexPage = () => {
    const data = useStaticQuery(graphql`
  query {
    allMdx {
      totalCount
      edges {
        node {
          id
          body
          frontmatter {
            slug
            date(formatString: "MMMM DD, YYYY")
            title
            description
            categories
            tags
            featured
            series
          }
        }
      }
    }
  }
`);
    const count = data?.allMdx?.totalCount || 0
    const uniqueCategories = new Set();
    data?.allMdx?.edges.forEach(({node}) => {
        const categories = node.frontmatter.categories;

        if (categories && categories.length > 0) {
            categories.forEach(category => uniqueCategories.add(category));
        }
    });
    const categoryArray = Array.from(uniqueCategories);

    return (
        <>
            <Container>

                <CategoriesComponent categories={categoryArray} articlesCount={count}></CategoriesComponent>
                <Box my={4}>
                    <PostsComponent heading={"Recent Posts"} featuredOnly={false} data={data}></PostsComponent>
                    <PostsComponent heading={"Featured Posts"} featuredOnly={true} data={data}></PostsComponent>
                </Box>
                <Box>
                    <NewsletterForm></NewsletterForm>

                </Box>
            </Container>
        </>
    )
        ;
};

export default IndexPage

