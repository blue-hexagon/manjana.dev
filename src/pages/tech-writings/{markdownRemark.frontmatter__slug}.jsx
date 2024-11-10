import * as React from "react"
import {graphql} from "gatsby"
import {Container, Typography} from "@mui/material";

export default function BlogPostTemplate({data}) {
    const { frontmatter, html, timeToRead, tableOfContents } = data.markdownRemark

    return (<Container>
            <Typography variant="h1" gutterBottom>
                {frontmatter.title}
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                {frontmatter.date}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
                {timeToRead} min read
            </Typography>
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