import React, { useState, createContext } from 'react'
import testData from '../testData'

interface Props {
  children?: any
}

type TodoListType = {
  name: string
  uid: number
  id: number
  todos: TodoType[]
}

type TodoType = {
  text: string
  priority: string
  id: number
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
