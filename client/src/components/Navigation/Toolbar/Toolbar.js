import React from 'react'

import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItem from '../NavigationItem/NavigationItem'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = props => (
  <header className="main-header">
      <div className="main-header__content">
          <div className="main-header__content-mobile">
              <DrawerToggle clicked={props.drawerToggledClicked} />
              <div className="mobile-icon">
                <Logo />
              </div>
              <ul className="main-header__items">
                  <li className="main-header__item image">
                      <a href="#" className="main-header__brand">
                        <Logo />
                      </a>
                  </li>
                  <li className="main-header__item link-art">
                      <a href="#">Arts</a>
                  </li>
              </ul>
          </div>
          <nav className="main-nav">
              <ul className="main-nav__items">
                  <li className="main-nav__item search">
                      <input type="text" placeholder="Search" className="mobile-nav__item-input" />
                  </li>
                  <li className="main-nav__item">
                      <a href="#">Login</a>
                  </li>
                  <li className="main-nav__item link-publish">
                      <a href="#">Publish</a>
                  </li>
              </ul>
          </nav>
      </div>
  </header>
)

export default Toolbar
