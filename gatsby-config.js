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
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 800,
                            linkImagesToOriginal: true,
                            quality: 80,
                            tracedSVG: true, // Use traced SVG for placeholders
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: "language-",
                            inlineCodeMarker: null,
                            aliases: {},
                            showLineNumbers: false,
                            noInlineHighlight: false,
                            prompt: {
                                global: false,
                            },
                            languageExtensions: [
                                {
                                    language: "shell",
                                    extend: "python",
                                    definition: {
                                        superscript_types: /(SuperType)/,
                                    },
                                    insertBefore: {
                                        function: {
                                            superscript_keywords: /(superif|superelse)/,
                                        },
                                    },
                                },
                            ]
                        },
                    },
                ],
            },

        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: 'pages',
                path: `${__dirname}/src/pages/`,
            },
        },
        {
            resolve: `gatsby-plugin-page-creator`,
            options: {
                path: `${__dirname}/src/pages`,

            },
        },
        `gatsby-plugin-sharp`, // Enables image processing
        `gatsby-transformer-sharp`, // Works with gatsby-plugin-sharp

    ],
};
