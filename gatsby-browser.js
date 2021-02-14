/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'

import { TodoProvider } from './src/context/TodoContext'
import { AuthProvider } from './src/context/AuthContext'
import { FaunaProvider } from './src/context/FaunaContext'

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <FaunaProvider>
        <TodoProvider>{element}</TodoProvider>
      </FaunaProvider>
    </AuthProvider>
  )
}
