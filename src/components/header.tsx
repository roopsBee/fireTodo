import { Link } from 'gatsby'
import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import faunadb from 'faunadb'
import { AuthContext } from '../context/AuthContext'
import firebaseApp from '../firebaseApp'
import { navigate } from 'gatsby'
import { FaunaContext } from '../context/FaunaContext'
import { TodoContext } from '../context/TodoContext'

const Header = () => {
  const user = useContext(AuthContext)
  const [fauna, setFauna] = useContext(FaunaContext)
  const [todoLists, setTodoLists] = useContext(TodoContext)
  const q = faunadb.query

  const handleSignOut = () => {
    firebaseApp.auth().signOut()
    navigate('/')
    fauna?.client?.query(q.Logout(true))
    if (setFauna && setTodoLists) {
      setFauna({})
      setTodoLists([])
    }
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
