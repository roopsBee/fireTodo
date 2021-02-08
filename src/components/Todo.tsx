import React from 'react'
interface Props {
  todo: {
    todo: string
    priority: string
  }
}

const Todo: React.FC<Props> = ({ todo }) => {
  return <div></div>
}

export default Todo
