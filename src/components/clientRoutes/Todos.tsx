import React, { useContext, useState, useEffect, RefObject } from 'react'
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
import faunadb from 'faunadb'
import { TodoContext } from '../../context/TodoContext'
import { cloneDeep, isEmpty } from 'lodash'
import AddTodoForm from '../AddTodoForm'
import DeleteList from '../DeleteList'
import AddNewList from '../AddNewList'
import ListSelect from '../ListSelect'
import { TodoType } from '../../context/TodoContext'
import { FaunaContext } from '../../context/FaunaContext'

type HandleDeleteTodoType = (todo: TodoType) => void

type HandleCheckboxToggleType = (todo: TodoType, index: number) => void

export type HandleAddListType = (listName: string) => void

export type TodoValues = {
  text: string
  priority: 'low' | 'medium' | 'high'
}

const Todos = () => {
  const [fauna, setFauna] = useContext(FaunaContext)
  const [todoLists, setTodoLists] = useContext(TodoContext)
  const [selectedList, setSelectedList] = useState(0)
  const q = faunadb.query
  const client = fauna?.client

  useEffect(() => {}, [todoLists])

  const handleChangeList = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedList(event.target.value as number)
  }

  const handleAddTodo = async ({ text, priority }: TodoValues) => {
    try {
      if (fauna && setTodoLists && todoLists) {
        const res: { ref: {} } | undefined = await client?.query(
          q.Call(q.Function('createTodo'), [
            text,
            priority,
            todoLists[selectedList].listId,
          ])
        )

        const newTodo = {
          text,
          todoId: res?.ref,
          done: false,
          priority,
        }

        const updatedLists = cloneDeep(todoLists)
        updatedLists[selectedList].todos.push(newTodo)
        setTodoLists(updatedLists)

        console.log('Created todo', newTodo)
      }
    } catch (error) {}
  }

  const handleDeleteList = async () => {
    try {
      if (todoLists && setTodoLists) {
        const listRef = todoLists[selectedList].listId!

        const res = await client?.query(
          q.Call(q.Function('deleteList'), listRef)
        )

        const updatedLists = cloneDeep(todoLists)
        updatedLists?.splice(selectedList, 1)
        setSelectedList(0)
        setTodoLists(updatedLists)
        console.log(res)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddNewList: HandleAddListType = async (listName) => {
    try {
      if (fauna && setTodoLists && todoLists) {
        const res: { ref: {} } | undefined = await client?.query(
          q.Call(q.Function('createList'), listName)
        )

        const newList = {
          name: listName,
          listId: res?.ref,
          uid: fauna.idRef,
          todos: [],
        }

        const updatedLists = cloneDeep(todoLists)

        updatedLists.push(newList)
        setTodoLists(updatedLists)
        setSelectedList(todoLists?.length)

        console.log('Created list', newList)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteTodo: HandleDeleteTodoType = async (todo) => {
    try {
      if (todoLists && setTodoLists) {
        const res = await client?.query(
          q.Call(q.Function('deleteTodo'), todo.todoId!)
        )

        console.log(res)

        const newTodos = todoLists[selectedList].todos.filter(
          (item) => item.todoId !== todo.todoId
        )
        const updatedLists = cloneDeep(todoLists)
        updatedLists[selectedList].todos = newTodos
        setTodoLists(updatedLists)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCheckboxToggle: HandleCheckboxToggleType = async (
    { done, todoId },
    index
  ) => {
    try {
      if (todoLists && setTodoLists) {
        const res: { done: boolean } | undefined = await client?.query(
          q.Call(q.Function('todoToggleDone'), todoId!)
        )
        console.log(res)

        const updatedLists = cloneDeep(todoLists)
        updatedLists[selectedList].todos[index].done = res!.done
        setTodoLists(updatedLists)
      }
    } catch (error) {
      console.error(error)
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
                <ListItem key={JSON.stringify(todo.todoId)}>
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
