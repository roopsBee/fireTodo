/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
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
