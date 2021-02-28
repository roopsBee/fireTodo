const admin = require('firebase-admin')
const faunadb = require('faunadb')

const handler = async (event) => {
  try {
    console.log('Initialising admin')
    if (!admin.apps.length) {
      await admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.GATSBY_FB_ADMIN_ID,
          privateKey:
            process.env.GATSBY_FB_ADMIN_KEY[0] === '-'
              ? process.env.GATSBY_FB_ADMIN_KEY
              : JSON.parse(process.env.GATSBY_FB_ADMIN_KEY),
          // process.env.GATSBY_FB_ADMIN_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.GATSBY_FB_ADMIN_EMAIL,
        }),
      })
    }
    console.log('Admin initialized')

    console.log('Veryfying token')
    const { userIdToken, userName } = JSON.parse(event.body)
    const { uid, email } = await admin.auth().verifyIdToken(userIdToken)
    console.log('Got decoded token')

    // fauna init
    const client = new faunadb.Client({
      secret: process.env.GATSBY_FAUNA_SERVER_KEY,
    })
    const q = faunadb.query

    // create user if doesn't exist, and get fauna token
    console.log('logging into fauna')
    const res = await client.query(
      q.Call(q.Function('create_and_login_user'), [email, uid, userName])
    )
    console.log('logged into fauna', res)

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    }
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
