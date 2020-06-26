import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import HomeUnlogged from './containers/Home/HomeUnlogged/HomeUnlogged'
import Login from './containers/Auth/Login/Login'

const App = props => {

  let routes = (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/' exact component={HomeUnlogged} />
      <Redirect to='/' />
    </Switch>
  )

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  )
}

export default App
