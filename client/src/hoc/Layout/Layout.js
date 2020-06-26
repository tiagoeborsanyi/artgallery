import React, { useState } from 'react'

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
        isAuth=''
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

export default Layout
