import React, { useContext } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { TodoContext } from './TodoContext'

const Todos = () => {
  const [todos, setTodos] = useContext(TodoContext)
  return (
    <List>
      {todos &&
        todos.map((todo) => (
          <ListItem
            key={todo.todo}
            button
            onClick={() => {
              const newTodos = todos.filter((item) => item.todo !== todo.todo)
              setTodos ? setTodos(newTodos) : console.log('cannot setTodos')

              console.log('click')
            }}
          >
            <ListItemText primary={todo.todo} secondary={todo.priority} />
          </ListItem>
        ))}
    </List>
  )
}

export default Todos
