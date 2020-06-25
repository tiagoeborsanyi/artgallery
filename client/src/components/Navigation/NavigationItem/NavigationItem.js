import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavigationItem.css'

const NavigationItem = props => (
  <li className={props.classes}>
    {props.item ? <NavLink
                    to={props.link}
                    exact
                    className={props.classesLink}>{props.children}</NavLink>
                : <input type='text' placeholder='Search' className={props.classesInput} />}
  </li>
)

export default NavigationItem
