import React from 'react'
import { Formik, Form, FormikHelpers, Field } from 'formik'
import { Button } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'
import firebaseApp from '../firebaseApp'
import { navigate } from 'gatsby'

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords don't match")
    .required('Required'),
})

interface Props {}

interface Values {
  password: string
  confirmPassword: string
  email: string
}

function SignUp(props: Props) {
  const {} = props

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (
          { email, password }: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          try {
            const userCredentials = await firebaseApp
              .auth()
              .createUserWithEmailAndPassword(email, password)
            console.log(userCredentials)
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
