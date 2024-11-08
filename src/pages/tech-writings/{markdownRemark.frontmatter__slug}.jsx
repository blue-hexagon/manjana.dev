import * as React from "react"
import {graphql} from "gatsby"
import Layout from "../../components/Layout";
import {Container} from "@mui/material";

export default function BlogPostTemplate({data}) {
    const {markdownRemark} = data
    const {timeToRead, tableOfContents, frontmatter, html} = markdownRemark
    return (
        <Layout>
            <Container>
                <h1>{frontmatter.title}</h1>
                <h2>{frontmatter.date}</h2>
                <h2>{timeToRead} min.</h2>
                <div dangerouslySetInnerHTML={{__html: tableOfContents}}/>
                <div
                    dangerouslySetInnerHTML={{__html: html}}
                />
            </Container>
        </Layout>
    )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      timeToRead
      tableOfContents
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`