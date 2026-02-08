import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";


/** @type {import('gatsby').GatsbyConfig} */
const config = {
  siteMetadata: {
    title: "Manjana.dev",
    description: "This is where I write my thoughts.",
  },

  plugins: [

    // ✅ Filesystem FIRST
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${process.cwd()}/src/content/blog/`,
      },
    },

    // ✅ MDX with GFM tables enabled
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],

        // Gatsby v5 — must be nested here
        mdxOptions: {
          remarkPlugins: [remarkFrontmatter,remarkGfm],
        },

        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800,
              linkImagesToOriginal: true,
              quality: 80,
              tracedSVG: true,
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: { global: false },
              languageExtensions: [
                {
                  language: "shell",
                  extend: "python",
                  definition: {

                  }
                },
              ],
            },
          },
        ],
      },
    },

    // ✅ Page creator
{
  resolve: "gatsby-plugin-page-creator",
  options: {
    path: `${process.cwd()}/src/pages`,
    extensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  },
},

    // ✅ Images
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
};

export default config;
