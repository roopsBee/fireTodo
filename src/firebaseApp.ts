import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBnOWAx_h25UzWK43v6JwIbrFN9l3j01ms',
  authDomain: 'firetodo-abcd8.firebaseapp.com',
  projectId: 'firetodo-abcd8',
  storageBucket: 'firetodo-abcd8.appspot.com',
  messagingSenderId: '542370247096',
  appId: '1:542370247096:web:584c6dae87e75028ea9f4d',
})

export default app
