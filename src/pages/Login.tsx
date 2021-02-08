import React from 'react'
import { Formik, Form, FormikHelpers, Field } from 'formik'
import { Button } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'
import { navigate } from 'gatsby'
import firebaseApp from '../firebaseApp'

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

interface Props {}

interface Values {
  password: string
  email: string
}

function SignUp(props: Props) {
  const {} = props

  return (
    <div>
      <h1>Log In</h1>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (
          { password, email }: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          try {
            const userCredential = await firebaseApp
              .auth()
              .signInWithEmailAndPassword(email, password)
            console.log(userCredential)
            navigate('/App/')
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
