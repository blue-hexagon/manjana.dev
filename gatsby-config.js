/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: "Manjana.dev",
        description: "This is where I write my thoughts.",
    },
    plugins: [

        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                defaultLayouts: {
                    default: require.resolve(`./src/templates/blogPost.jsx`),
                },
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: "language-",
                            inlineCodeMarker: null,
                            aliases: {},
                            showLineNumbers: true,
                            noInlineHighlight: false,
                            prompt: {
                                user: ">>>",
                                host: null,
                                global: false,
                            },
                        },
                    },
                ],
            },

        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: 'content',
                path: `${__dirname}/src/content/`,
            },
        },
        {
            resolve: `gatsby-plugin-page-creator`,
            options: {
                path: `${__dirname}/src/content`,

            },
        },
        // {
        // resolve: `gatsby-plugin-page-creator`,
        // options: {
        //     path: `${__dirname}/src/pages`,
        //
        // },
        // },

    ],
};
