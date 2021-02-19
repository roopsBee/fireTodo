import React, { useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, Container } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { PopupState } from 'material-ui-popup-state/hooks'
import { TodoContext } from '../context/TodoContext'
import { cloneDeep } from 'lodash'

interface Props {
  popupState: PopupState
}

const NewListForm: React.FC<Props> = ({ popupState }) => {
  const [todoLists, setTodoLists] = useContext(TodoContext)

  return (
    <Container>
      <Formik
        initialValues={{
          listName: '',
        }}
        onSubmit={async ({ listName }) => {
          console.log(listName)
          const name = listName
          const id = Math.floor(Math.random() * 10000)
          const uid = 123456
          const todos: [] = []
          const newList = { name, id, uid, todos }
          const updatedLists = cloneDeep(todoLists)
          if (updatedLists && setTodoLists) {
            updatedLists.push(newList)
            setTodoLists(updatedLists)
          } else {
            console.log('Unable to create new list')
          }

          const { close } = popupState
          close()
          try {
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
              name="listName"
              label="List Name"
              placeholder="Name..."
            />
            <Button variant="outlined" disabled={isSubmitting} type="submit">
              Create List
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default NewListForm
