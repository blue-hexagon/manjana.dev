import React from "react"
import { Container, Typography, Button, Box } from "@mui/material"
import { Link } from "gatsby"

export default function NotFoundPage() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "background.default",
        padding: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "4rem", sm: "6rem", md: "8rem" },
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        404
      </Typography>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        It seems the page you’re looking for doesn’t exist or may have been moved.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/"
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  )
}
