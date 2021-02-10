import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from '@material-ui/core'

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <Button component={Link} to="/">
        {siteTitle}
      </Button>
      <Button component={Link} to="/Login/">
        Login
      </Button>
      <Button component={Link} to="/App/">
        App
      </Button>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
