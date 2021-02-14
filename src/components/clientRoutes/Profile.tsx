import React, { useEffect } from 'react'
import firebaseApp from '../../firebaseApp'

const Profile = () => {
  const getToken = async () => {
    const token = await firebaseApp.auth().currentUser?.getIdToken(true)
    console.log(token)
    return token
  }

  useEffect(() => {
    const token = getToken()
  }, [])
  return <div>Profile</div>
}

export default Profile
