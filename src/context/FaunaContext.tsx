import React, { createContext, useState, useEffect, useContext } from 'react'
import * as faunadb from 'faunadb'
import { isEmpty } from 'lodash'
import { AuthContext } from './AuthContext'
import login from '../utils/login'

interface Props {
  children?: any
}

type StateValue = {
  secret?: string | null
  client?: faunadb.Client | null
  idRef?: string | null
  email?: string | null
  userName?: string | null
}

export type ContextValue =
  | [StateValue, React.Dispatch<React.SetStateAction<StateValue>>]
  | []

export const FaunaContext = createContext<ContextValue>([])

export const FaunaProvider: React.FC<Props> = ({ children }) => {
  const user = useContext(AuthContext)

  const [faunaState, setFaunaState] = useState<StateValue>({})

  useEffect(() => {
    console.log('faunaState updated', faunaState)
  }, [faunaState])

  useEffect(() => {
    if (user && isEmpty(faunaState)) {
      login({ user, faunaContext: [faunaState, setFaunaState] })
    }
  }, [user])

  return (
    <FaunaContext.Provider value={[faunaState, setFaunaState]}>
      {children}
    </FaunaContext.Provider>
  )
}
