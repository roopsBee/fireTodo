import React, { useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import firebaseApp from '../firebaseApp'
import { FaunaContext } from '../context/FaunaContext'
import login from '../utils/login'
import { AuthContext } from '../context/AuthContext'
import signupSchema from '../components/yupSchemas/signupSchema'

interface Values {
  password: string
  confirmPassword: string
  email: string
  userName: string
}

function SignUp() {
  const faunaContext = useContext(FaunaContext)
  const user = useContext(AuthContext)

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
          email: '',
          userName: '',
        }}
        validationSchema={signupSchema}
        onSubmit={async ({ email, password, userName }: Values) => {
          try {
            await firebaseApp
              .auth()
              .createUserWithEmailAndPassword(email, password)
            console.log('Created new user')

            await login({ email, password, faunaContext, user, userName })
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              fullWidth
              name="userName"
              label="User Name"
              placeholder="Your username..."
            />
            <Field
              component={TextField}
              fullWidth
              name="email"
              label="Email"
              placeholder="john@acme.com"
              type="email"
            />
            <Field
              component={TextField}
              fullWidth
              name="password"
              label="Password"
              placeholder="Password"
            />
            <Field
              component={TextField}
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
            />

            <Button disabled={isSubmitting} type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
