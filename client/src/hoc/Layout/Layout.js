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

  return (
    <React.Fragment>
      <Toolbar
        isAuth={!props.isAuthenticated}
        drawerToggledClicked={sideDrawerToggleHandler}
        photoIcon={props.isPhotoIcon}
        uid={props.userId} />
      <SideDrawer
        isAuth={!props.isAuthenticated}
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
    isAuthenticated: state.auth.token !== null,
    isPhotoIcon: state.auth.photoURL,
    userId : state.auth.userId
  }
}

export default connect(mapStateToProps)(Layout)
