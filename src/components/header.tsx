import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'
import firebaseApp from '../firebaseApp'
import { navigate } from 'gatsby'

const Header = () => {
  const user = useContext(AuthContext)
  const handleSignOut = () => {
    firebaseApp.auth().signOut()
    navigate('/')
  }

  return (
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
        <Button component={Link} to="/App/">
          App
        </Button>

        {user ? (
          <Button onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <>
            <Button component={Link} to="/Login/">
              Login
            </Button>
            <Button component={Link} to="/SignUp/">
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
