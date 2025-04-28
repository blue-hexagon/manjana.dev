import * as React from "react";
import {graphql} from "gatsby";
import {Helmet} from "react-helmet";

const BlogPostTemplate = ({data, children}) => {
    const {frontmatter} = data.mdx;

    return (
        <>
            <Helmet>
                <title>{frontmatter.title} | Manjana.dev</title>
                <meta name="description" content={frontmatter.description}/>

                <link rel="canonical" href={`https://manjana.dev/blog/${frontmatter.slug}`}/>

                <meta property="og:title" content={frontmatter.title}/>
                <meta property="og:description" content={frontmatter.description}/>
                <meta property="og:type" content="article"/>
                <meta property="og:url" content={`https://manjana.dev/blog/${frontmatter.slug}`}/>
                <meta property="og:site_name" content="Manjana.dev"/>
                <meta property="og:image" content={`https://manjana.dev/images/${frontmatter.featuredImage}`}/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={frontmatter.title}/>
                <meta name="twitter:description" content={frontmatter.description}/>
                <meta name="twitter:image" content={`https://manjana.dev/images/${frontmatter.featuredImage}`}/>
                {/*<meta name="twitter:site" content="@manjana.dev"/>*/}
            </Helmet>
            {children}
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
