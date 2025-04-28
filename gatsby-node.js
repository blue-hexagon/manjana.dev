const path = require("path");

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;

    const result = await graphql(`
    query {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            id
            frontmatter {
              slug
              path
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

    if (result.errors) {
        console.error(result.errors);
        throw result.errors;
    }

    const posts = result.data.allMdx.edges;

    posts.forEach(({node}) => {
        console.log(`Creating page: ${node.frontmatter.path}`);
        createPage({
            path: `/${node.frontmatter.slug}/`,
            component: path.resolve("./src/templates/blog-post.js") + `?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
                id: node.id,
                contentFilePath: node.internal.contentFilePath, // Pass it here too if needed
            },
        });
    });
};
