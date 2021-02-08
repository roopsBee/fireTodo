/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'

import { TodoProvider } from './src/components/TodoContext'
import { AuthProvider } from './src/components/AuthContext'

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <TodoProvider>{element}</TodoProvider>
    </AuthProvider>
  )
}
