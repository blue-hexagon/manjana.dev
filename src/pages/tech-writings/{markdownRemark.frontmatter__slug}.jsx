import * as React from "react"
import {graphql} from "gatsby"
import {Container} from "@mui/material";

export default function BlogPostTemplate({data}) {

    console.log(data)
    // const {html, timeToRead, tableOfContents, frontmatter} = data
    if (!data) {
        return null
    }
    return (<Container>
        <h1>{data.frontmatter.title}</h1>
        <h2>{data.frontmatter.date}</h2>
        <h2>{data.timeToRead} min.</h2>
        <div dangerouslySetInnerHTML={{__html: data.tableOfContents}}/>
        <div
            dangerouslySetInnerHTML={{__html: data.html}}
        />
    </Container>)
}

const data = graphql`
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