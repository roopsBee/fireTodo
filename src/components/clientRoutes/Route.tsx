import React from 'react'
import { RouteComponentProps } from '@reach/router'

//
interface Props extends RouteComponentProps {
  component: React.FC
}

const Route: React.FC<Props> = ({ component: Component, ...rest }) => (
  <Component {...rest} />
)

export default Route
