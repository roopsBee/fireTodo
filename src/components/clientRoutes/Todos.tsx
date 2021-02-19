import React, { useContext, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Container,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { TodoContext } from '../../context/TodoContext'
import AddTodoForm from '../AddTodoForm'
import { cloneDeep } from 'lodash'
import ListSelect from '../ListSelect'
import AddNewList from '../AddNewList'
import { isEmpty } from 'lodash'

export type TodoValues = {
  text: string
  priority: 'low' | 'medium' | 'high'
}

const Todos = () => {
  const [todoLists, setTodoLists] = useContext(TodoContext)
  const [selectedList, setSelectedList] = useState(0)

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

  const handleDeleteTodo = () => {}

  return (
    <Container>
      {!isEmpty(todoLists) && (
        <>
          <AddTodoForm handleAddTodo={handleAddTodo} />
          <ListSelect
            selectedList={selectedList}
            handleChangeList={handleChangeList}
          />
        </>
      )}
      <AddNewList />
      {!isEmpty(todoLists) && (
        <List>
          {todoLists &&
            todoLists[selectedList].todos.map((todo) => (
              <ListItem key={todo.id}>
                <ListItemText primary={todo.text} secondary={todo.priority} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      // const newTodos = todos.filter(
                      //   (item) => item.todo !== todo.todo
                      // )
                      // setTodos
                      //   ? setTodos(newTodos)
                      //   : console.log('cannot setTodos')
                    }}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      )}
    </Container>
  )
}

export default Todos
