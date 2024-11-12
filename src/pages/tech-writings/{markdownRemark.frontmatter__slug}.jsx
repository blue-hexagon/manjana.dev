import * as React from "react"
import {graphql} from "gatsby"
import {Container, Divider, Typography} from "@mui/material";
import {Box} from "@mui/material";

export default function BlogPostTemplate({data}) {
    const {frontmatter, html, timeToRead, tableOfContents} = data.markdownRemark

    return (<Container>
        <Typography variant="h1" sx={{pt:5}} gutterBottom>
            {frontmatter.title}
        </Typography>
        <Box sx={{}}>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                {frontmatter.date}
            </Typography>
            <Divider></Divider>
            {/*<Typography variant="h6"  color="textSecondary" gutterBottom>*/}
            {/*     min read*/}
            {/*</Typography>*/}
        </Box>
        <div
            dangerouslySetInnerHTML={{__html: html}}
        />
    </Container>)
}

export const query = graphql`
      query($id: String!) {
        markdownRemark(id: { eq: $id }) {
          html
          tableOfContents
          frontmatter {
                  slug
                  date(formatString: "MMMM DD, YYYY")
                  title
                  description
                  categories
                  tags
                  featured
                  series
          }
        }
      }
    `