import React, { useState, createContext } from 'react'
import faunadb from 'faunadb'
import testData from '../testData'

interface Props {
  children?: any
}

type TodoListType = {
  name: string
  uid: string | null | undefined
  listId: object | undefined
  todos: TodoType[]
}

export type TodoType = {
  text: string
  priority: string
  todoId: {} | null | undefined
  done: boolean
}

type ContextValue = [
  TodoListType[],
  React.Dispatch<React.SetStateAction<[] | TodoListType[]>>
]

export const TodoContext = createContext<ContextValue | []>([])

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todoLists, setTodoLists] = useState<TodoListType[] | []>([])

  return (
    <TodoContext.Provider value={[todoLists, setTodoLists]}>
      {children}
    </TodoContext.Provider>
  )
}
