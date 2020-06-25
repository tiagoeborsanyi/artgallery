import React, { useState } from 'react'


const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  return (
    <React.Fragment>
      <main>
        {props.children}
      </main>
    </React.Fragment>
  )
}

export default Layout
