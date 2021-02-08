import React, { useState, createContext } from 'react'

interface Props {
  children?: any
}

interface StateValue {
  todo: string
  priority: string
}

type ContextValue = [
  StateValue[],
  React.Dispatch<React.SetStateAction<[] | StateValue[]>>
]

export const TodoContext = createContext<ContextValue | []>([])

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<StateValue[] | []>([
    { todo: 'make house', priority: 'low' },
    { todo: 'make pizza', priority: 'high' },
    { todo: 'fly around earth', priority: 'medium' },
    { todo: 'make cake', priority: 'high' },
  ])

  return (
    <TodoContext.Provider value={[todos, setTodos]}>
      {children}
    </TodoContext.Provider>
  )
}
