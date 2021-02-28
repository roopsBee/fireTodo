import { navigate } from 'gatsby'
import axios from 'axios'
import firebaseApp from '../firebaseApp'
import { ContextValue } from '../context/FaunaContext'
import { FBUser } from '../context/AuthContext'
import * as faunadb from 'faunadb'

type LoginFn = (values: {
  email?: string
  userName?: string
  password?: string
  user: FBUser
  faunaContext?: ContextValue
}) => Promise<any>

const login: LoginFn = async ({
  email,
  password,
  user,
  faunaContext,
  userName,
}) => {
  try {
    // sign in with firebase auth
    if (!user && email && password) {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password)
      navigate('/App/')
      console.log('Logged in')
    } else if (!user && (!email || !password)) {
      console.error('Invalid credentials: password or email missing')
    } else {
      console.log('Already logged in')
    }

    //get firebase id token
    const userIdToken = await firebaseApp.auth().currentUser?.getIdToken(true)
    console.log('Got user id token')

    // get faunadb secret with user token
    const { data } = await axios.post('/.netlify/functions/login', {
      userIdToken,
      userName,
    })

    console.log('Got fauna user data', data)

    // set fauna context
    if (faunaContext) {
      const [faunaState, setFaunaState] = faunaContext
      const { secret } = data
      const client = new faunadb.Client({ secret })
      const q = faunadb.query

      const idRef = await client.query(q.CurrentIdentity())

      if (setFaunaState) {
        setFaunaState({ ...data, client, idRef })
      } else {
        console.error('setFaunaState failed @ Login')
      }
    }
    // get all lists and todos
    if (user && faunaContext) {
    }
  } catch (error) {
    console.error(error)
  }
}

export default login
