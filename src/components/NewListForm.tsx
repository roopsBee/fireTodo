import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, Container } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { PopupState } from 'material-ui-popup-state/hooks'
import { HandleAddListType } from './clientRoutes/Todos'

interface Props {
  popupState: PopupState
  handleAddNewList: HandleAddListType
}

const NewListForm: React.FC<Props> = ({ popupState, handleAddNewList }) => {
  return (
    <Container>
      <Formik
        initialValues={{
          listName: '',
        }}
        onSubmit={async ({ listName }) => {
          try {
            const { close } = popupState
            close()
            await handleAddNewList(listName)
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
