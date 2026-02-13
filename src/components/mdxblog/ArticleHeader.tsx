// @ts-ignore
import React from "react"
import { Box, Divider, Typography } from "@mui/material"

interface PostHeaderProps {
  title: string
  subtitle?: string
  date?: string
}
export const neonTextStyle = {
    color: '#00ffcc',
    textShadow: '0 0 4px rgba(0, 255, 204, 0.75)',
    fontFamily: `'Fira Code', monospace`,
};
export const ArticleHeader: React.FC<PostHeaderProps> = ({
  title,
  subtitle,
  date,
}) => {
    // @ts-ignore
    return (
    <>
      {/* Title row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 0,
            mt: 0,
        }}
      >
        <Typography sx={{...neonTextStyle, fontSize: '3rem', fontWeight: 900, pt: 0}} variant="h1">
            {title}
        </Typography>

        {/* Right side reserved for future metadata */}
                  {date && (
          <Typography component="span" variant="body2" color="textSecondary" gutterBottom>
            {date}
          </Typography>
        )}
      </Box>

      {/* Accent divider */}
      <Divider
        sx={{
          background: "linear-gradient(to right, #ff4081, #1b1b1b)",
          height: "2px",
          width: "100%",
          borderRadius: "4px",
          margin: "2px 0",
          boxShadow: "0 0 10px rgba(255, 64, 129, 0.1)",
        }}
      />

      {/* Subtitle + date row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 4,
        }}
      >
        {subtitle && (
          <Typography
            variant="h2"
            align="left"
            fontStyle="italic"
            sx={{
              color: "#ffcc00",
              fontWeight: 300,
              fontSize: "2rem",
              paddingBottom: 0,
              paddingTop: 1,
            }}
          >
            {subtitle}
          </Typography>
        )}
        <Typography component="span" variant="body2" color="textSecondary" gutterBottom />


      </Box>
    </>
  )
}
