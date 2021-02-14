import React, { useContext, useEffect } from 'react'
import { navigate, Redirect, WindowLocation } from '@reach/router'
import { RouteComponentProps } from '@reach/router'
import { AuthContext } from '../../context/AuthContext'

interface Props extends RouteComponentProps {
  component: React.FC
  location?: WindowLocation
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  location,
  ...rest
}) => {
  const user = useContext(AuthContext)

  return user ? <Component {...rest} /> : <>You are not logged in</>
}
export default PrivateRoute
