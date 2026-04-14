const path = require("path");

exports.onCreateNode = ({node, actions, getNode}) => {
    const {createNodeField} = actions;

    if (node.internal.type === "Mdx") {
        const fileNode = getNode(node.parent);

        if (fileNode?.sourceInstanceName) {
            createNodeField({
                node,
                name: "sourceInstanceName",
                value: fileNode.sourceInstanceName,
            });
        }
    }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    console.log("---- CREATE PAGES START ----");

    const result = await graphql(`
        query CreateMdxPages {
            allMdx(sort: { frontmatter: { date: DESC } }) {
                edges {
                    node {
                        id
                        frontmatter {
                            slug
                            title
                        }
                        internal {
                            contentFilePath
                        }
                        fields {
                            sourceInstanceName
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild("GraphQL failed in createPages", result.errors);
        return;
    }

    const entries = result.data.allMdx.edges;

    console.log("MDX entries found:", entries.length);

    entries.forEach(({ node }) => {
        const slug = node.frontmatter?.slug;
        const source = node.fields?.sourceInstanceName;

        console.log("MDX node:", {
            title: node.frontmatter?.title,
            slug,
            source,
            contentFilePath: node.internal?.contentFilePath,
        });

        if (!slug) {
            reporter.warn(`Skipping MDX without slug: ${node.id}`);
            return;
        }

        let pagePath;
        let templatePath;

        if (source === "blog") {
            pagePath = `/${slug}/`;
            templatePath = path.resolve("./src/templates/blog-post.js");
        } else if (source === "notes") {
            pagePath = `/notes/${slug}/`;
            templatePath = path.resolve("./src/templates/note.js");
        } else {
            reporter.warn(`Skipping MDX with unknown source: ${source}`);
            return;
        }

        console.log(">>> Creating page:", pagePath);

        createPage({
            path: pagePath,
            component: `${templatePath}?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
                id: node.id,
            },
        });
    });
};

exports.onCreateWebpackConfig = ({actions}) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.(ps1|sh|conf|txt|py)$/,
                    use: "raw-loader",
                },
            ],
        },
    });
};