import React, {useMemo, useState} from "react";
import {graphql, useStaticQuery, Link} from "gatsby";
import {
    Alert,
    Box,
    Chip,
    Container,
    Divider,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import {styled} from "@mui/system";

import BlogCard from "../../pages_components/blog/BlogCard";


/* ============================================================
   STYLED
   ============================================================ */

const Hero = styled(Box)(() => ({
    marginTop: "2.5rem",
    marginBottom: "2.5rem",
    padding: "2rem",
    borderRadius: "20px",
    background:
        "linear-gradient(180deg, rgba(0,255,204,0.06) 0%, rgba(255,255,255,0.02) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.24)",
}));

const SearchPanel = styled(Box)(() => ({
    padding: "1.25rem",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    marginBottom: "2rem",
}));

const SectionHeader = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    marginBottom: "1rem",
}));

const SectionTitleWrap = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
}));

const MetaStrip = styled(Box)(() => ({
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginTop: "1rem",
}));

const MetaCard = styled(Box)(() => ({
    minWidth: "140px",
    padding: "0.85rem 1rem",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
}));

const CategoryRow = styled(Box)(() => ({
    display: "flex",
    flexWrap: "wrap",
    gap: "0.65rem",
    marginTop: "1rem",
}));

const EmptyState = styled(Box)(() => ({
    padding: "2rem",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.02)",
    border: "1px dashed rgba(255,255,255,0.14)",
}));


/* ============================================================
   HELPERS
   ============================================================ */

function normalizePosts(edges) {
    return edges?.map((e) => e.node) || [];
}

function extractCategories(posts) {
    const set = new Set();

    posts.forEach((post) => {
        post.frontmatter.categories?.forEach((category) => set.add(category));
    });

    return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function matchesSearch(post, query) {
    if (!query) return true;

    const q = query.toLowerCase();

    const fm = post.frontmatter || {};

    return (
        fm.title?.toLowerCase().includes(q) ||
        fm.description?.toLowerCase().includes(q) ||
        fm.tags?.some((tag) => tag.toLowerCase().includes(q)) ||
        fm.categories?.some((cat) => cat.toLowerCase().includes(q)) ||
        fm.series?.toLowerCase().includes(q)
    );
}


/* ============================================================
   CATEGORY FILTERS
   ============================================================ */

const CategoriesBar = ({
                           categories,
                           activeCategory,
                           onCategorySelect,
                       }) => {
    return (
        <CategoryRow>
            <Chip
                label="All Notes"
                clickable
                onClick={() => onCategorySelect(null)}
                color={!activeCategory ? "primary" : "default"}
                variant={!activeCategory ? "filled" : "outlined"}
                sx={{
                    borderRadius: "999px",
                    fontWeight: 600,
                }}
            />

            {categories.map((category) => {
                const active = activeCategory === category;

                return (
                    <Chip
                        key={category}
                        label={category}
                        clickable
                        onClick={() => onCategorySelect(category)}
                        color={active ? "primary" : "default"}
                        variant={active ? "filled" : "outlined"}
                        sx={{
                            borderRadius: "999px",
                            fontWeight: 500,
                        }}
                    />
                );
            })}
        </CategoryRow>
    );
};


/* ============================================================
   NOTES GRID
   ============================================================ */

const NotesGrid = ({heading, eyebrow, posts, icon = null}) => {
    return (
        <Box sx={{mt: 4}}>
            {(heading || eyebrow) && (
                <SectionHeader>
                    <SectionTitleWrap>
                        {icon}
                        <Box>
                            {eyebrow && (
                                <Typography
                                    variant="overline"
                                    sx={{
                                        display: "block",
                                        letterSpacing: "0.14em",
                                        color: "rgba(0,255,204,0.85)",
                                    }}
                                >
                                    {eyebrow}
                                </Typography>
                            )}
                            {heading && (
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 700,
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {heading}
                                </Typography>
                            )}
                        </Box>
                    </SectionTitleWrap>
                </SectionHeader>
            )}

            {!posts?.length ? (
                <EmptyState>
                    <Typography
                        variant="h6"
                        sx={{color: "#fff", mb: 0.75, fontWeight: 600}}
                    >
                        No notes found
                    </Typography>
                    <Typography sx={{color: "rgba(255,255,255,0.68)"}}>
                        Try changing the search term or clearing the active category.
                    </Typography>
                </EmptyState>
            ) : (
                <Grid2
                    container
                    rowSpacing={1.5}
                    columnSpacing={{xs: 1, sm: 2, md: 1.5}}
                >
                    {posts.map((post) => (
                        <Grid2
                            key={post.id}
                            size={{xs: 12, sm: 6, lg: 4}}
                            alignItems="stretch"
                        >
                            <BlogCard data={post}/>
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </Box>
    );
};


/* ============================================================
   PAGE
   ============================================================ */

const NotesIndexPage = () => {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState(null);

    const data = useStaticQuery(graphql`
        query NotesIndexPageQuery {
            allMdx(
              filter: {
                internal: {
                  contentFilePath: { regex: "/src/content/notes/" }
                }
              }
                sort: { frontmatter: { date: DESC } 
            }
            ) {
                totalCount
                edges {
                    node {
                        id
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
                        parent {
                            ... on File {
                                sourceInstanceName
                                relativePath
                            }
                        }
                    }
                }
            }
        }
    `);

    const posts = useMemo(
        () => normalizePosts(data?.allMdx?.edges),
        [data]
    );

    const categories = useMemo(
        () => extractCategories(posts),
        [posts]
    );

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const fm = post.frontmatter || {};

            const categoryMatch =
                !activeCategory || fm.categories?.includes(activeCategory);

            return matchesSearch(post, search.trim()) && categoryMatch;
        });
    }, [posts, search, activeCategory]);

    const featuredNotes = useMemo(
        () => filteredPosts.filter((p) => p.frontmatter?.featured),
        [filteredPosts]
    );

    const recentNotes = useMemo(
        () => filteredPosts.filter((p) => !p.frontmatter?.featured),
        [filteredPosts]
    );

    const totalTags = useMemo(() => {
        const set = new Set();

        posts.forEach((post) => {
            post.frontmatter?.tags?.forEach((tag) => set.add(tag));
        });

        return set.size;
    }, [posts]);

    return (
        <Container maxWidth="lg">
            <Hero>
                <Stack spacing={2}>
                    <Box>
                        <Typography
                            variant="overline"
                            sx={{
                                color: "rgba(0,255,204,0.88)",
                                letterSpacing: "0.16em",
                                fontWeight: 700,
                            }}
                        >
                            NOTES
                        </Typography>

                        <Typography
                            variant="h2"
                            sx={{
                                mt: 1,
                                color: "#fff",
                                fontWeight: 800,
                                lineHeight: 1,
                                fontSize: {
                                    xs: "2.2rem",
                                    sm: "2.9rem",
                                    md: "3.4rem",
                                },
                            }}
                        >
                            Field notes, fragments, and technical observations.
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2,
                                maxWidth: "860px",
                                color: "rgba(255,255,255,0.74)",
                                fontSize: "1.02rem",
                                lineHeight: 1.75,
                            }}
                        >
                            This is the lighter-weight side of the site: shorter technical
                            notes, sharp observations, experiments, implementation details,
                            and ideas worth preserving before they become full articles.
                        </Typography>
                    </Box>

                    <MetaStrip>
                        <MetaCard>
                            <Typography
                                variant="caption"
                                sx={{color: "rgba(255,255,255,0.56)"}}
                            >
                                Total Notes
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{color: "#fff", fontWeight: 700, mt: 0.3}}
                            >
                                {posts.length}
                            </Typography>
                        </MetaCard>

                        <MetaCard>
                            <Typography
                                variant="caption"
                                sx={{color: "rgba(255,255,255,0.56)"}}
                            >
                                Categories
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{color: "#fff", fontWeight: 700, mt: 0.3}}
                            >
                                {categories.length}
                            </Typography>
                        </MetaCard>

                        <MetaCard>
                            <Typography
                                variant="caption"
                                sx={{color: "rgba(255,255,255,0.56)"}}
                            >
                                Unique Tags
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{color: "#fff", fontWeight: 700, mt: 0.3}}
                            >
                                {totalTags}
                            </Typography>
                        </MetaCard>
                    </MetaStrip>
                </Stack>
            </Hero>

            <SearchPanel>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search notes by title, category, tag, description, or series..."
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: "rgba(255,255,255,0.5)"}}/>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                color: "#fff",
                                borderRadius: "14px",
                                backgroundColor: "rgba(255,255,255,0.015)",
                                "& fieldset": {
                                    borderColor: "rgba(255,255,255,0.1)",
                                },
                                "&:hover fieldset": {
                                    borderColor: "rgba(255,255,255,0.18)",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#00ffcc",
                                },
                            },
                        }}
                    />

                    <CategoriesBar
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategorySelect={setActiveCategory}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <Alert
                            severity="info"
                            sx={{
                                width: "100%",
                                backgroundColor: "rgba(0,255,204,0.06)",
                                color: "#d7fff7",
                                border: "1px solid rgba(0,255,204,0.12)",
                                "& .MuiAlert-icon": {
                                    color: "#00ffcc",
                                },
                            }}
                        >
                            Showing <strong>{filteredPosts.length}</strong> of{" "}
                            <strong>{posts.length}</strong> notes
                            {activeCategory ? ` in "${activeCategory}"` : ""}.
                        </Alert>
                    </Box>
                </Stack>
            </SearchPanel>

            {posts.length === 0 ? (
                <EmptyState>
                    <Typography
                        variant="h5"
                        sx={{color: "#fff", mb: 1, fontWeight: 700}}
                    >
                        No notes yet
                    </Typography>
                    <Typography sx={{color: "rgba(255,255,255,0.68)"}}>
                        Gatsby is running, but no MDX content from the <code>notes</code>{" "}
                        source was found. Check your filesystem source config and ensure the
                        files live under <code>src/content/notes</code>.
                    </Typography>
                </EmptyState>
            ) : (
                <>
                    {featuredNotes.length > 0 && (
                        <NotesGrid
                            eyebrow="Highlighted"
                            heading="Featured Notes"
                            posts={featuredNotes}
                            icon={<NoteAltIcon sx={{color: "#00ffcc"}}/>}
                        />
                    )}

                    <Divider
                        sx={{
                            my: 4,
                            borderColor: "rgba(255,255,255,0.06)",
                        }}
                    />

                    <NotesGrid
                        eyebrow="Chronology"
                        heading="Recent Notes"
                        posts={recentNotes}
                        icon={<AutoStoriesIcon sx={{color: "#00ffcc"}}/>}
                    />

                    {categories.length > 0 && (
                        <Box sx={{mt: 5, mb: 6}}>
                            <SectionHeader>
                                <SectionTitleWrap>
                                    <LocalOfferOutlinedIcon sx={{color: "#00ffcc"}}/>
                                    <Typography
                                        variant="h5"
                                        sx={{color: "#fff", fontWeight: 700}}
                                    >
                                        Explore by Category
                                    </Typography>
                                </SectionTitleWrap>
                            </SectionHeader>

                            <CategoryRow>
                                {categories.map((category) => (
                                    <Chip
                                        key={category}
                                        label={category}
                                        component={Link}
                                        to={`/notes/?category=${encodeURIComponent(category)}`}
                                        clickable
                                        variant="outlined"
                                        sx={{
                                            borderRadius: "999px",
                                            color: "#fff",
                                            borderColor: "rgba(255,255,255,0.12)",
                                            "&:hover": {
                                                borderColor: "#00ffcc",
                                                backgroundColor: "rgba(0,255,204,0.06)",
                                            },
                                        }}
                                    />
                                ))}
                            </CategoryRow>
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default NotesIndexPage;