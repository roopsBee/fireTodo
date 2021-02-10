import React from 'react'

const browser = typeof window !== 'undefined' && window

const NotFound = () => {
  return browser && <div>404</div>
}

export default NotFound
