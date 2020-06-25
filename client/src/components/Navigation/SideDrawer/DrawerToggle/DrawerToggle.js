import React from 'react'

import './DrawerToggle.css'

const DrawerToggle = props => (
  <button
    className="toggle-button"
    onClick={props.clicked}>
      <span className="toggle-button__bar"></span>
      <span className="toggle-button__bar"></span>
      <span className="toggle-button__bar"></span>
  </button>
)

export default DrawerToggle
