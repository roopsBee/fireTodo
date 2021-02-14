import React, { createContext, useState, useEffect } from 'react'
import * as faunadb from 'faunadb'

interface Props {
  children?: any
}

type StateValue = {
  secret?: string | null
  client?: faunadb.Client | null
}

export type ContextValue =
  | [StateValue, React.Dispatch<React.SetStateAction<StateValue>>]
  | []

export const FaunaContext = createContext<ContextValue>([])

export const FaunaProvider: React.FC<Props> = ({ children }) => {
  const [faunaState, setFaunaState] = useState<StateValue>({
    secret: null,
    client: null,
  })

  useEffect(() => {
    if (faunaState.secret) {
      const client = new faunadb.Client({
        secret: faunaState.secret,
      })
      setFaunaState({ client, ...faunaState })
    } else {
      setFaunaState({ client: null, secret: null })
    }
  }, [faunaState.secret])

  return (
    <FaunaContext.Provider value={[faunaState, setFaunaState]}>
      {children}
    </FaunaContext.Provider>
  )
}
