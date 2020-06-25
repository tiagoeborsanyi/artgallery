import React from 'react'

import './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItem from '../NavigationItem/NavigationItem'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = props => {
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <nav className="mobile-nav">
        <div className="mobile-nav__user">
            <img src="./img/person.png" alt="icon user" />
            <p>tiagoeborsanyi</p>
        </div>
        <div className="mobile-nav__info">
            <div className="mobile-nav__info-content">
                <span>100</span>
                <p>ARTS</p>
            </div>
            <div className="mobile-nav__info-divider"></div>
            <div className="mobile-nav__info-content">
                <span>10M</span>
                <p>FOLLOWERS</p>
            </div>
        </div>
        <ul className="mobile-nav__items">
            <li className="mobile-nav__item">
                <span className="material-icons">account_box</span>
                <a href="#">My profile</a>
            </li>
            <li className="mobile-nav__item">
                <span className="material-icons">bookmark</span>
                <a href="#">Saved</a>
            </li>
            <li className="mobile-nav__item">
                <span className="material-icons">publish</span>
                <a href="#">Publish</a>
            </li>
            <li className="mobile-nav__item">
                <span className="material-icons">sensor_door</span>
                <a href="#">Logout</a>
            </li>
        </ul>
      </nav>
    </React.Fragment>
  )
}

export default SideDrawer
