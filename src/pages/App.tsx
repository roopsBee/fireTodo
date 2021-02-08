import React from 'react'
import { Router } from '@reach/router'
import DashboardPage from '../components/clientRoutes/Dashboard'
import Route from '../components/clientRoutes/Route'
import PrivateRoute from '../components/clientRoutes/PrivateRoute'
import ProfilePage from '../components/clientRoutes/Profile'

const App = () => {
  return (
    <Router basepath="/App">
      <Route path="/" component={DashboardPage} />
      <PrivateRoute path="/Profile" component={ProfilePage} />
    </Router>
  )
}

export default App
