import React, { useState } from 'react'
import { connect } from 'react-redux'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  }
  console.log(props.isAuthenticated)
  return (
    <React.Fragment>
      <Toolbar
        isAuth={!props.isAuthenticated}
        drawerToggledClicked={sideDrawerToggleHandler} />
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler} />
      <main>
        {props.children}
      </main>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)
