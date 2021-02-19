import React, { useContext, useState } from 'react'
import { MenuItem, FormControl, Select, InputLabel } from '@material-ui/core'
import { TodoContext } from '../context/TodoContext'

interface Props {
  selectedList: number
  handleChangeList: (event: React.ChangeEvent<{ value: unknown }>) => void
}

const ListSelect: React.FC<Props> = ({ selectedList, handleChangeList }) => {
  const [todoLists, setTodoLists] = useContext(TodoContext)

  return (
    <>
      <FormControl>
        <InputLabel id="todo-lists-select">List</InputLabel>
        <Select
          labelId="todo-lists-select-lael"
          id="todo-lists-select"
          value={selectedList}
          onChange={handleChangeList}
        >
          {todoLists?.map((list, index) => (
            <MenuItem key={list.id} value={index}>
              {list.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default ListSelect
