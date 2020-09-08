import React, { useEffect, Suspense } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from './store/actions/index'
import Spinner from './components/UI/Spinner/Spinner'
import Layout from './hoc/Layout/Layout'
import HomeLogged from './containers/Home/HomeLogged/HomeLogged'
import HomeUnlogged from './containers/Home/HomeUnlogged/HomeUnlogged'
import Login from './containers/Auth/Login/Login'
import Signup from './containers/Auth/Signup/Signup'
import Logout from './containers/Auth/Logout/Logout'
import Publish from './containers/Publish/Publish'
import ViewImage from './containers/ViewImage/ViewImage'
import PublishNotLogged from './components/Publish/PublishNotLogged/PublishNotLogged'
import Profile from './containers/Profile/Profile'
import EditProfile from './containers/Profile/EditProfile'

const App = props => {

  const { onTryAutoSignup } = props
  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes = null

  if (props.isAuthenticated  && true) {
    routes = (
      <Switch>
        <Route path='/publish' component={Publish} />
        <Route path='/logout' component={Logout} />
        <Route path='/vimage/:vimageId' component={ViewImage} />
        <Route path='/profile/:profileUId' component={Profile} />
        <Route path='/edit-profile/:profileUId' component={EditProfile} />
        <Route path='/arts' component={HomeLogged} />
        <Route path='/' exact component={HomeUnlogged} />
        <Redirect to='/arts' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/publish' component={PublishNotLogged} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/vimage/:vimageId' component={ViewImage} />
        <Route path='/profile/:profileUId' component={Profile} />
        <Route path='/arts' component={HomeLogged} />
        <Route path='/' exact component={HomeUnlogged} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>{props.isLoading ? <Spinner /> : routes}</Suspense>
      </Layout>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isLoading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
