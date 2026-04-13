import * as React from "react";
import { graphql } from "gatsby";
import PageGlossaryTable from "../components/mdxblog/GlossarySystem/PageGlossaryTable";
import { ArticleHeader } from "../components/mdxblog/ArticleHeader";

const NoteTemplate = ({ data, children }) => {
    return (
        <>
            <ArticleHeader
                title={data.mdx?.frontmatter.title}
                subtitle={data.mdx?.frontmatter.subtitle}
                date={data.mdx?.frontmatter.date}
            />
            {children}
            <PageGlossaryTable />
        </>
    );
};

/**
 * Gatsby Head API
 * Runs during SSR + on the client
 */
export const Head = ({ data }) => {
    const { frontmatter } = data.mdx;

    const title = `${frontmatter.title} | Manjana.dev`;
    const description = frontmatter.description;
    const url = `https://manjana.dev/notes/${frontmatter.slug}/`;
    const imageUrl = frontmatter.featuredImage
        ? `https://manjana.dev/images/${frontmatter.featuredImage}`
        : null;

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="Manjana.dev" />
            {imageUrl && <meta property="og:image" content={imageUrl} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {imageUrl && <meta name="twitter:image" content={imageUrl} />}
        </>
    );
};

export const query = graphql`
    query NoteByID($id: String!) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
                subtitle
                date(formatString: "MMMM DD, YYYY")
                slug
                description
                featuredImage
                glossaryPrefix
                tocDepth
            }
            tableOfContents(maxDepth: 6)
            parent {
                ... on File {
                    sourceInstanceName
                    relativePath
                }
            }
        }
    }
`;

export default NoteTemplate;