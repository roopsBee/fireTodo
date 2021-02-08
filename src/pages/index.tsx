import React from 'react'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { Button, Container } from '@material-ui/core'

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <Container>
        <Button component={Link} to="/Login" variant="contained">
          Log In
        </Button>
        <Button component={Link} to="/SignUp" variant="contained">
          Sign up
        </Button>
        <Button component={Link} to="/App/" variant="contained">
          App
        </Button>
      </Container>
    </>
  )
}
export default IndexPage
