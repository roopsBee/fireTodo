import React, { useContext, useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Container,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  ListItemIcon,
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { TodoContext } from '../../context/TodoContext'
import { cloneDeep, isEmpty } from 'lodash'
import AddTodoForm from '../AddTodoForm'
import DeleteList from '../DeleteList'
import AddNewList from '../AddNewList'
import ListSelect from '../ListSelect'
import { TodoType } from '../../context/TodoContext'

type HandleDeleteTodoType = (todo: TodoType) => void

type HandleCheckboxToggleType = (todo: TodoType, index: number) => void

export type HandleAddListType = (listName: string) => void

export type TodoValues = {
  text: string
  priority: 'low' | 'medium' | 'high'
}

const Todos = () => {
  const [todoLists, setTodoLists] = useContext(TodoContext)
  const [selectedList, setSelectedList] = useState(0)

  useEffect(() => {}, [todoLists])

  const handleChangeList = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedList(event.target.value as number)
  }

  const handleAddTodo = ({ text, priority }: TodoValues) => {
    if (todoLists && setTodoLists) {
      const id = Math.floor(Math.random() * 10000)
      const uid = 123456
      const done = false
      const newTodo = { text, priority, id, uid, done }

      const updatedLists = cloneDeep(todoLists)
      updatedLists[selectedList].todos.push(newTodo)
      setTodoLists(updatedLists)
    } else {
      console.log('Could not update list')
    }
  }

  const handleDeleteList = () => {
    if (todoLists && setTodoLists) {
      const updatedLists = cloneDeep(todoLists)
      updatedLists?.splice(selectedList, 1)
      setSelectedList(0)
      setTodoLists(updatedLists)
    }
  }

  const handleAddNewList: HandleAddListType = (listName) => {
    const name = listName
    const id = Math.floor(Math.random() * 10000)
    const uid = 123456
    const todos: [] = []
    const newList = { name, id, uid, todos }
    const updatedLists = cloneDeep(todoLists)
    if (updatedLists && setTodoLists && todoLists) {
      updatedLists.push(newList)
      setTodoLists(updatedLists)
      setSelectedList(todoLists?.length)
    } else {
      console.log('Unable to create new list')
    }
  }

  const handleDeleteTodo: HandleDeleteTodoType = (todo) => {
    if (todoLists && setTodoLists) {
      const newTodos = todoLists[selectedList].todos.filter(
        (item) => item.id !== todo.id
      )
      const updatedLists = cloneDeep(todoLists)
      updatedLists[selectedList].todos = newTodos
      setTodoLists(updatedLists)
    }
  }

  const handleCheckboxToggle: HandleCheckboxToggleType = ({ done }, index) => {
    if (todoLists && setTodoLists) {
      const doneToggledValue = (done = !done)
      const updatedLists = cloneDeep(todoLists)
      updatedLists[selectedList].todos[index].done = doneToggledValue
      setTodoLists(updatedLists)
    }
  }

  return (
    <Container>
      <AddNewList handleAddNewList={handleAddNewList} />
      {!isEmpty(todoLists) && (
        <>
          <AddTodoForm handleAddTodo={handleAddTodo} />
          <DeleteList handleDeleteList={handleDeleteList} />
          <ListSelect
            selectedList={selectedList}
            handleChangeList={handleChangeList}
          />
        </>
      )}

      {!isEmpty(todoLists) && (
        <List>
          {todoLists &&
            todoLists[selectedList].todos.map((todo, index) => {
              const checkboxLabelId = `checkbox-list-label-${todo.text}`
              return (
                <ListItem key={todo.id}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.done}
                      inputProps={{ 'aria-labelledby': checkboxLabelId }}
                      onChange={() => handleCheckboxToggle(todo, index)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={checkboxLabelId}
                    primary={todo.text}
                    secondary={todo.priority}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => handleDeleteTodo(todo)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
        </List>
      )}
    </Container>
  )
}

export default Todos
