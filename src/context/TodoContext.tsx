import React, { useState, createContext } from 'react'

interface Props {
  children?: any
}

export type TodoListType = {
  name: string
  uid: {} | null | undefined
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
