import React, { useState } from 'react'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

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
      <Toolbar drawerToggledClicked={sideDrawerToggleHandler} />
      <main>
        {props.children}
      </main>
    </React.Fragment>
  )
}

export default Layout
