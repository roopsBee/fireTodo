import React from 'react'
import { Formik, Form, Field } from 'formik'
import {
  Button,
  Grid,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { Select } from 'formik-material-ui'
import { TodoValues } from './clientRoutes/Todos'

interface Props {
  handleAddTodo: (arg0: TodoValues) => void
}

const AddTodo: React.FC<Props> = ({ handleAddTodo }) => {
  return (
    <>
      <Formik
        initialValues={{
          text: '',
          priority: 'low',
        }}
        onSubmit={async ({ text, priority }: TodoValues) => {
          try {
            await handleAddTodo({ text, priority })
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={8}>
                <Field
                  component={TextField}
                  fullWidth
                  name="text"
                  label="Todo"
                  placeholder="todo..."
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <InputLabel htmlFor="priority">Priority</InputLabel>
                  <Field
                    component={Select}
                    name="priority"
                    inputProps={{
                      id: 'priority',
                    }}
                  >
                    <MenuItem value={'low'}>Low</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'high'}>High</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Button variant="outlined" disabled={isSubmitting} type="submit">
                Add new todo
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AddTodo
