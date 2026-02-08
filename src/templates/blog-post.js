import * as React from "react";
import { graphql } from "gatsby";

const BlogPostTemplate = ({ data, children }) => {
  return <>{children}</>;
};

export const Head = ({ data }) => {
  const { frontmatter } = data.mdx;

  const {
    title,
    description,
    slug,
    featuredImage,
  } = frontmatter;

  const safeDescription =
    description ??
    "Technical articles and deep dives on systems, networking, and security.";

  const canonicalUrl = `https://manjana.dev/blog/${slug}`;

  const imageUrl = featuredImage
    ? `https://manjana.dev/images/${featuredImage}`
    : null;

  return (
    <>
      <title>{title} | Manjana.dev</title>

      <meta name="description" content={safeDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Manjana.dev" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={safeDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </>
  );
};

export const query = graphql`
  query BlogPostByID($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        description
        featuredImage
      }
    }
  }
`;

export default BlogPostTemplate;
