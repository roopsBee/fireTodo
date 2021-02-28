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
  Button,
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
import { v4 as uuid } from 'uuid'
import { TodoListType } from '../../context/TodoContext'

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

  const handleAddNewList: HandleAddListType = async (listName) => {
    try {
      if (fauna && setTodoLists && todoLists) {
        const res: { ref: {} } | undefined = await client?.query(
          q.Call('createList', [listName, fauna.idRef!])
        )
        console.log(res)

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

  const handleAddTodo = async ({ text, priority }: TodoValues) => {
    try {
      if (fauna && setTodoLists && todoLists) {
        const todoId = uuid()
        const res = await client?.query(
          q.Call('createTodo', [
            text,
            priority,
            todoLists[selectedList].listId,
            todoId,
          ])
        )

        const newTodo = {
          text,
          todoId: todoId,
          done: false,
          priority,
        }

        const updatedLists = cloneDeep(todoLists)
        updatedLists[selectedList].todos.push(newTodo)
        setTodoLists(updatedLists)

        console.log('Created todo', newTodo)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteList = async () => {
    try {
      if (todoLists && setTodoLists) {
        const listRef = todoLists[selectedList].listId!

        const res = await client?.query(
          q.Call(q.Function('deleteList'), [listRef, fauna?.idRef])
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

  const handleDeleteTodo: HandleDeleteTodoType = async (todo) => {
    try {
      if (todoLists && setTodoLists) {
        const res = await client?.query(
          q.Call(q.Function('deleteTodo'), [
            todo.todoId!,
            todoLists[selectedList].listId,
          ])
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
    { done },
    index
  ) => {
    try {
      if (todoLists && setTodoLists) {
        const updatedLists = cloneDeep(todoLists)
        updatedLists[selectedList].todos[index].done = !done
        setTodoLists(updatedLists)

        const res: { done: boolean } | undefined = await client?.query(
          q.Call(q.Function('todoToggleDone'), [
            index,
            todoLists[selectedList].listId,
            !done,
          ])
        )
        console.log(res)

        updatedLists[selectedList].todos[index].done = res!.done
        setTodoLists(updatedLists)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleGetLists = async () => {
    try {
      if (todoLists && setTodoLists && FaunaContext) {
        const idRef = fauna!.idRef!

        const res: TodoListType[] | undefined = await client?.query(
          q.Let(
            {
              user: q.Get(idRef),
              lists: q.Map(q.Select(['data', 'lists'], q.Var('user')), (list) =>
                q.Get(list)
              ),
            },
            q.Map(q.Var('lists'), (list) => ({
              name: q.Select(['data', 'name'], list),
              uid: q.Select(['data', 'userId'], list),
              listId: q.Select('ref', list),
              todos: q.Select(['data', 'todos'], list),
            }))
            // { lists: q.Var('lists') }
          )
        )
        console.log('got lists', res)
        if (res) {
          setTodoLists(res)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <AddNewList handleAddNewList={handleAddNewList} />
      <Button onClick={handleGetLists}>Get Lists</Button>
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
