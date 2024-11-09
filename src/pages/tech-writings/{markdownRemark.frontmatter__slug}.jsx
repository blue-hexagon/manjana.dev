import * as React from "react"
import {graphql} from "gatsby"
import {Container} from "@mui/material";

export default function BlogPostTemplate({data}) {
    const { frontmatter, html, timeToRead, tableOfContents } = data.markdownRemark

    return (<Container>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <h2>{timeToRead} min.</h2>
        <div dangerouslySetInnerHTML={{__html: tableOfContents}}/>
        <div
            dangerouslySetInnerHTML={{__html: html}}
        />
    </Container>)
}

export const query = graphql`
      query($id: String!) {
        markdownRemark(id: { eq: $id }) {
          html
          timeToRead
          tableOfContents
          frontmatter {
                  slug
                  date(formatString: "MMMM DD, YYYY")
                  title
                  description
                  categories
                  featured
          }
        }
      }
    `