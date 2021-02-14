import React, { useContext, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
  TextField,
  Container,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import { TodoContext } from '../../context/TodoContext'

const Todos = () => {
  const [todos, setTodos] = useContext(TodoContext)
  const [newTodo, setNewTodo] = useState('')

  const handleNewTodoClick = () => {
    console.log(newTodo)
    const addTodo = { todo: newTodo, priority: 'low', id: 5 }
    if (todos && setTodos) {
      setTodos([addTodo, ...todos])
    }
  }

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value)
  }

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={9}>
            <TextField
              fullWidth
              onChange={handleNewTodoChange}
              value={newTodo}
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleNewTodoClick}>Add Todo</Button>
          </Grid>
          <List>
            {todos &&
              todos.map((todo) => (
                <ListItem key={todo.todo}>
                  <ListItemText primary={todo.todo} secondary={todo.priority} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        const newTodos = todos.filter(
                          (item) => item.todo !== todo.todo
                        )
                        setTodos
                          ? setTodos(newTodos)
                          : console.log('cannot setTodos')
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
        </Grid>
      </Container>
    </>
  )
}

export default Todos
