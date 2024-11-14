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
                        default: require.resolve(`./src/components/Layout.js`),
                    },
                }
            },
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    name: 'blog',
                    path: `${__dirname}/src/content/`,
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
                    path: `${__dirname}/src/content`,

                },
            },
            {
                resolve: `gatsby-transformer-remark`,
                options: {
                    plugins: [
                        {
                            resolve: `gatsby-remark-prismjs`,
                            options: {
                                classPrefix: "language-",
                                inlineCodeMarker: null,
                                aliases: {},
                                showLineNumbers: true,
                                noInlineHighlight: false,
                                languageExtensions: [
                                    {
                                        language: "superscript",
                                        extend: "javascript",
                                        definition: {
                                            superscript_types: /(SuperType)/,
                                        },
                                        insertBefore: {
                                            function: {
                                                superscript_keywords: /(superif|superelse)/,
                                            },
                                        },
                                    },
                                ],
                                prompt: {
                                    user: ">>>",
                                    host: null,
                                    global: false,
                                },
                                escapeEntities: {},
                            },
                        },
                    ],
                },
            },

        ],
    };
