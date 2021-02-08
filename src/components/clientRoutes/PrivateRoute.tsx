import React from 'react'
import { WindowLocation } from '@reach/router'
import { RouteComponentProps, Redirect } from '@reach/router'

const isLoggedIn = () => {
  return false
}

interface Props extends RouteComponentProps {
  component: React.FC
  location?: WindowLocation
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  location,
  ...rest
}) => {
  const isAuth =
    !isLoggedIn() && location!.pathname !== `/Login/` ? false : true

  return isAuth ? (
    <Component {...rest} />
  ) : (
    <Redirect from={location?.pathname} to="/Login/" />
  )
}
export default PrivateRoute
