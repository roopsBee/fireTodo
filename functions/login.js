const admin = require('firebase-admin')
const faunadb = require('faunadb')

const handler = async (event) => {
  try {
    if (!admin.apps.length) {
      await admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.GATSBY_FB_ADMIN_ID,
          privateKey: process.env.GATSBY_FB_ADMIN_KEY,
          clientEmail: process.env.GATSBY_FB_ADMIN_EMAIL,
        }),
      })
    }
    console.log('Admin initialized')
    const { userIdToken } = JSON.parse(event.body)
    const { uid, email } = await admin.auth().verifyIdToken(userIdToken)
    console.log('Got decoded token')

    // fauna init
    const client = new faunadb.Client({
      secret: process.env.GATSBY_FAUNA_SERVER_KEY,
    })
    const q = faunadb.query

    // create user if doesn't exist, and get fauna token
    const res = await client.query(
      q.Call(q.Function('create_and_login_user'), [email, uid])
    )
    const { secret } = res
    // check if user exists
    // const exists = await client.query(
    //   q.Exists(q.Match(q.Index('users_by_email'), email))
    // )

    // // if user doesn't exist create user
    // if (!exists) {
    //   await client.query(
    //     q.Create(q.Collection('users'), {
    //       credentials: { password: uid },
    //       data: {
    //         email: email,
    //       },
    //     })
    //   )
    //   console.log('created fauna user')
    // }

    // // fauna login
    // const { secret, instance } = await client.query(
    //   q.Login(q.Match(q.Index('users_by_email'), email), { password: uid })
    // )

    // console.log('Got fauna secret')
    return {
      statusCode: 200,
      body: JSON.stringify({ secret }),
    }
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
