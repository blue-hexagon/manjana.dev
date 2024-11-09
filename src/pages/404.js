import React from "react"
import { Container, Typography, Button, Box } from "@mui/material"
import { Link } from "gatsby"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  errorCode: {
    fontSize: "8rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  message: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(4),
  },
}))

export default function NotFoundPage() {
  const classes = useStyles()

  return (
    <Container className={classes.root} maxWidth="md">
      <Typography className={classes.errorCode} variant="h1">
        404
      </Typography>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography className={classes.message} variant="body1">
        It seems the page you’re looking for doesn’t exist or may have been moved.
      </Typography>
      <Box className={classes.button}>
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
