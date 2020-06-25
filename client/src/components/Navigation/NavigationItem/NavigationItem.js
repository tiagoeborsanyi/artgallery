import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavigationItem.css'

const NavigationItem = props => (
  <li className="">
    <NavLink to={props.link} exact />
  </li>
)

export default NavigationItem
