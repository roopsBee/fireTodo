import React, { useContext, useState } from 'react'
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

interface Props {
  handleDeleteList: () => void
}

const DeleteList: React.FC<Props> = ({ handleDeleteList }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleDelete = () => {
    setOpen(false)
    handleDeleteList()
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Delete List
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-delete-list-description"
        aria-describedby="confirm-delete-list-action"
      >
        <DialogTitle id="confirm-delete-list">{'Delete List'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-list-description">
            Are you sure you want to delete this list?
            <br />
            It cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteList
