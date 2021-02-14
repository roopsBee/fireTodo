import React, { useState, createContext } from 'react'

interface Props {
  children?: any
}

interface StateValue {
  todo: string
  priority: string
  id: number
}

type ContextValue = [
  StateValue[],
  React.Dispatch<React.SetStateAction<[] | StateValue[]>>
]

export const TodoContext = createContext<ContextValue | []>([])

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<StateValue[] | []>([
    { todo: 'make house', priority: 'low', id: 1 },
    { todo: 'make pizza', priority: 'high', id: 2 },
    { todo: 'fly around earth', priority: 'medium', id: 3 },
    { todo: 'make cake', priority: 'high', id: 4 },
  ])

  return (
    <TodoContext.Provider value={[todos, setTodos]}>
      {children}
    </TodoContext.Provider>
  )
}
