import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
// import { connect } from 'react-redux'

// import * as actions from './store/actions/index'
import Layout from './hoc/Layout/Layout'
import HomeUnlogged from './containers/Home/HomeUnlogged/HomeUnlogged'
import Login from './containers/Auth/Login/Login'
import Signup from './containers/Auth/Signup/Signup'
import Logout from './containers/Auth/Logout/Logout'

const App = props => {

  let routes = (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/' exact component={HomeUnlogged} />
      <Redirect to='/' />
    </Switch>
  )

  if (false) {
    routes = (
      <Switch>
        <route path='/logout' component={Logout} />
        <Route path='/' exact render={() => <p>logado</p>} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  )
}

export default withRouter(App)
