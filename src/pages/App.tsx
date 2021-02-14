import React from 'react'
import { Router } from '@reach/router'
import DashboardPage from '../components/clientRoutes/Dashboard'
import Route from '../components/clientRoutes/Route'
import PrivateRoute from '../components/clientRoutes/PrivateRoute'
import ProfilePage from '../components/clientRoutes/Profile'
import Todos from '../components/clientRoutes/Todos'

const App = () => {
  return (
    <Router>
      <Route path="/App" component={DashboardPage} />
      <PrivateRoute path="/App/Profile" component={ProfilePage} />
      <PrivateRoute path="/App/Todo" component={Todos} />
    </Router>
  )
}

export default App
