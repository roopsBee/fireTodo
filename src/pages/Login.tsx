import React, { useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { FaunaContext } from '../context/FaunaContext'
import login from '../utils/login'
import { AuthContext } from '../context/AuthContext'
import loginSchema from '../components/yupSchemas/loginSchema'

interface Values {
  password: string
  email: string
}

function SignUp() {
  const faunaContext = useContext(FaunaContext)
  const user = useContext(AuthContext)

  return (
    <div>
      <h1>Log In</h1>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        validationSchema={loginSchema}
        onSubmit={async ({ password, email }: Values) => {
          try {
            await login({ email, password, user, faunaContext })
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
            <Button disabled={isSubmitting} type="submit">
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
