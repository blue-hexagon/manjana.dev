// const path = require("path");
// const {createFilePath} = require("gatsby-source-filesystem");
//
// exports.onCreateNode = ({node, actions, getNode}) => {
//
//     const {createNodeField} = actions
//     if (node.internal.type === `Mdx`) {
//
//         const relativePath = createFilePath({node, getNode, basePath: "./src/content"});
//
//         createNodeField({
//             node,
//             name: "slug",
//             value: `/blog${node.frontmatter.slug}`
//         });
//
//     }
// }
// exports.createPages = async ({graphql, actions, reporter}) => {
//
//     const postTemplate = path.resolve(`./src/templates/blogPost.jsx`)
//     const {createPage} = actions
//
//     const result = await graphql(`
//     query {
//       allMdx {
//         edges {
//           node {
//           id
//           frontmatter {
//             slug
//             }
//            fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `);
//
//     if (result.errors) {
//         reporter.panicOnBuild('Error loading MDX result', result.errors)
//     }
//     const blogPosts = result.data.allMdx.edges
//     blogPosts.forEach(({node}) => {
//         createPage({
//             path: `/blog/${node.frontmatter.slug}`,
//             component: `${postTemplate}`,
//             context: {
//                 id: node.id,
//             },
//         });
//     });
// };
// //
// //