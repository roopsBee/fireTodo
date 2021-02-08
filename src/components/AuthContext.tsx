import React, { createContext, useState, useEffect } from 'react'
import firebase from 'firebase'
import firebaseApp from '../firebaseApp'

interface Props {
  children?: any
}

type User = firebase.User | null

export const AuthContext = createContext<User>(null)

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(setUser)
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
