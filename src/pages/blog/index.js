import React, {useState, useMemo} from "react"
import {
    Typography,
    Container,
    Box,
    TextField,
    Button,
    Alert
} from "@mui/material"
import Grid2 from "@mui/material/Grid2"
import {styled} from "@mui/system"
import {graphql, useStaticQuery} from "gatsby"

import CategoriesComponent from "../../components/blog_page/Categories"
import BlogCard from "../../components/blog_page/BlogCard"


/* ============================================================
   STYLED COMPONENTS
   ============================================================ */

const FormContainer = styled(Container)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    borderRadius: "8px",
    backgroundColor: "#1c1c1c",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    marginTop: "3rem",
}))

const StyledButton = styled(Button)(() => ({
    marginTop: "1rem",
    backgroundColor: "#8ab4f8",
    color: "#000",
    "&:hover": {
        backgroundColor: "#6a93d7",
    },
}))


/* ============================================================
   NEWSLETTER FORM
   ============================================================ */

const NewsletterForm = ({source = "blog-index"}) => {

    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault()

        setError("")
        setSuccess("")

        if (!email) {
            setError("Email is required.")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.")
            return
        }

        setLoading(true)

        const formData = new FormData()
        formData.append("email", email)
        formData.append("source", source)

        try {

            const res = await fetch("https://formspree.io/f/xykdyazo", {
                method: "POST",
                body: formData,
                headers: {Accept: "application/json"},
            })

            if (!res.ok) throw new Error()

            setSuccess("Thank you for subscribing.")
            setEmail("")

        } catch {

            setError("Something went wrong. Please try again later.")

        } finally {

            setLoading(false)

        }

    }

    return (
        <FormContainer maxWidth="full">

            <Typography variant="h5" color="#fff" gutterBottom>
                Subscribe to New Articles
            </Typography>

            <Typography variant="body2" color="#bdbdbd" gutterBottom>
                Get deep technical articles directly to your inbox.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{width: "100%", mt: 2}}>

                {/* Honeypot anti-bot field */}
                <input
                    type="text"
                    name="company"
                    style={{display: "none"}}
                    tabIndex={-1}
                    autoComplete="off"
                />

                <TextField
                    fullWidth
                    label="Your Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error}
                    helperText={error}
                    InputProps={{style: {color: "#fff"}}}
                    InputLabelProps={{style: {color: "#bdbdbd"}}}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "#8ab4f8"},
                            "&:hover fieldset": {borderColor: "#6a93d7"},
                            "&.Mui-focused fieldset": {borderColor: "#8ab4f8"},
                        },
                    }}
                />

                <StyledButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? "Subscribing…" : "Subscribe"}
                </StyledButton>

                {success && (
                    <Alert severity="success" sx={{mt: 2}}>
                        {success}
                    </Alert>
                )}

            </Box>

        </FormContainer>
    )

}


/* ============================================================
   POSTS GRID
   ============================================================ */

export const PostsComponent = ({heading, posts}) => {

    if (!posts?.length) {
        return (
            <>
                {heading && (
                    <Typography variant="h4" gutterBottom sx={{mt: 4}}>
                        {heading}
                    </Typography>
                )}
                <Typography color="#888">
                    No articles found.
                </Typography>
            </>
        )
    }

    return (
        <>
            {heading && (
                <Typography variant="h4" gutterBottom sx={{mt: 4}}>
                    {heading}
                </Typography>
            )}

            <Grid2 container rowSpacing={1.5} columnSpacing={{xs: 1, sm: 2, md: 1.5}}>

                {posts.map(post => (
                    <Grid2 item size={{xs: 12, sm: 6, mx: 4, lg: 4}} key={post.id} alignItems="stretch">
                        <BlogCard data={post}/>
                    </Grid2>
                ))}

            </Grid2>
        </>
    )

}


/* ============================================================
   MAIN PAGE
   ============================================================ */

const IndexPage = () => {

    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState(null)

    const data = useStaticQuery(graphql`
      query {
        allMdx(
          sort: { frontmatter: { date: DESC } }
        ) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                slug
                date
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
    `)


    /* ============================================================
       NORMALIZE POSTS
       ============================================================ */

    const posts = useMemo(
        () => data?.allMdx?.edges.map(e => e.node) || [],
        [data]
    )


    /* ============================================================
       EXTRACT CATEGORIES
       ============================================================ */

    const categories = useMemo(() => {

        const set = new Set()

        posts.forEach(post => {
            post.frontmatter.categories?.forEach(c => set.add(c))
        })

        return Array.from(set)

    }, [posts])


    /* ============================================================
       SEARCH + FILTER
       ============================================================ */

    const filteredPosts = useMemo(() => {

        const query = search.toLowerCase().trim()

        return posts.filter(post => {

            const fm = post.frontmatter

            const matchesSearch =
                fm.title?.toLowerCase().includes(query) ||
                fm.description?.toLowerCase().includes(query) ||
                fm.tags?.some(tag => tag.toLowerCase().includes(query))

            const matchesCategory =
                !activeCategory || fm.categories?.includes(activeCategory)

            return matchesSearch && matchesCategory

        })

    }, [posts, search, activeCategory])


    /* ============================================================
       FEATURED + RECENT
       ============================================================ */

    const featuredPosts = useMemo(
        () => filteredPosts.filter(p => p.frontmatter.featured),
        [filteredPosts]
    )

    const recentPosts = useMemo(
        () =>
            filteredPosts
                .filter(p => !p.frontmatter.featured)
                .slice(0, 6),
        [filteredPosts]
    )


    /* ============================================================
       RENDER
       ============================================================ */

    return (
        <Container maxWidth="lg">

            <CategoriesComponent
                categories={categories}
                articlesCount={posts.length}
                search={search}
                onSearchChange={setSearch}
                activeCategory={activeCategory}
                onCategorySelect={setActiveCategory}
            />

            <Box my={4}>

                <PostsComponent
                    posts={featuredPosts}
                />

                <PostsComponent
                    heading="Recent Posts"
                    posts={recentPosts}
                />

            </Box>

            <NewsletterForm/>

        </Container>
    )

}

export default IndexPage