import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { navigate } from 'gatsby'
import axios from 'axios'
import firebaseApp from '../../firebaseApp'
import { Link } from 'gatsby'
import { AuthContext } from '../../context/AuthContext'
import { FaunaContext } from '../../context/FaunaContext'

const Dashboard = () => {
  const user = useContext(AuthContext)
  const [faunaState, setFaunaState] = useContext(FaunaContext)

  const handleSignOut = () => {
    firebaseApp.auth().signOut()
    setFaunaState
      ? setFaunaState({ secret: null, client: null })
      : console.error('setFaunaState failed at Dashboard')
    console.log('Logged out')

    navigate('/')
  }

  const handleApi = async () => {
    try {
      const res = await axios.get('/.netlify/functions/hello-world?name=roops')
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <p>My dashboard</p>
      {user && (
        <>
          <Button onClick={handleSignOut} variant="contained" color="primary">
            Sign Out
          </Button>
          <Button component={Link} to="/App/Todo/" variant="contained">
            Todos
          </Button>
        </>
      )}
      <Button component={Link} to="/App/Profile/" variant="contained">
        Profile
      </Button>
      <Button onClick={handleApi} variant="contained">
        Api
      </Button>
    </div>
  )
}

export default Dashboard
