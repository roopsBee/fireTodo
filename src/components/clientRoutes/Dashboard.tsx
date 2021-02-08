import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { navigate } from 'gatsby'
import firebaseApp from '../../firebaseApp'
import { Link } from 'gatsby'
import { AuthContext } from '../AuthContext'

const Dashboard = () => {
  const handleSignOut = () => {
    firebaseApp.auth().signOut()
    navigate('/')
  }
  const user = useContext(AuthContext)
  console.log(user)

  return (
    <div>
      <p>My dashboard</p>
      {user && (
        <Button onClick={handleSignOut} variant="contained" color="primary">
          Sign Out
        </Button>
      )}
      <Button component={Link} to="/App/Profile/" variant="contained">
        Profile
      </Button>
    </div>
  )
}

export default Dashboard
