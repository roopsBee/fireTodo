import React, { useContext, useState } from 'react'
import { Button } from '@material-ui/core'
import Popover from '@material-ui/core/Popover'
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks'
import NewListForm from './NewListForm'
import { HandleAddListType } from './clientRoutes/Todos'

interface Props {
  handleAddNewList: HandleAddListType
}

const AddNewList: React.FC<Props> = ({ handleAddNewList }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'add-new-list-popover',
  })

  return (
    <>
      <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
        New List
      </Button>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <NewListForm
          handleAddNewList={handleAddNewList}
          popupState={popupState}
        />
      </Popover>{' '}
    </>
  )
}

export default AddNewList
