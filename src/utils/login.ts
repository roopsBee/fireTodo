import { navigate } from 'gatsby'
import axios from 'axios'
import firebaseApp from '../firebaseApp'
import { ContextValue } from '../context/FaunaContext'
import { FBUser } from '../context/AuthContext'

type LoginFn = (values: {
  email: string
  password: string
  user: FBUser
  faunaContext: ContextValue
}) => Promise<any>

const login: LoginFn = async ({ email, password, user, faunaContext }) => {
  try {
    const [faunaState, setFaunaState] = faunaContext

    // sign in with firebase auth
    if (!user) {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password)
      navigate('/App/')
      console.log('Logged in')
    } else {
      console.log('Already logged in')
    }

    //log into fauna
    const userIdToken = await firebaseApp.auth().currentUser?.getIdToken(true)
    console.log('Got user id token')
    // get faunadb secret with user token
    const { data } = await axios.post('/.netlify/functions/login', {
      userIdToken,
    })

    const { secret } = data
    console.log('Got fauna secret')

    setFaunaState
      ? setFaunaState({ secret })
      : console.error('setFaunaState failed @ Login')
  } catch (error) {
    console.error(error)
  }
}

export default login
