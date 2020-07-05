import React from 'react'

import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItem from '../NavigationItem/NavigationItem'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import DrawerOffline from '../SideDrawer/DrawerOffline/DrawerOffline'

const Toolbar = props => (
  <header className="main-header">
      <div className="main-header__content">
          <div className="main-header__content-mobile">
            {props.isAuth ?
            <div className="main-header__content-mobile-auth">
              <DrawerToggle clicked={props.drawerToggledClicked} />
              <div className="mobile-icon">
                <Logo />
              </div>
            </div>
            :
            <div className="main-header__content-mobile-auth">
              <DrawerOffline />
            </div>}
            <ul className="main-header__items">
              <NavigationItem
                classes='main-header__item image'
                item='link'
                link='/'
                classesLink='main-header__brand'>
                <Logo />
              </NavigationItem>
              <NavigationItem
                classes='main-header__item'
                item='link'
                link='/'>
                Arts
              </NavigationItem>
            </ul>
          </div>
          <nav className="main-nav">
              <ul className="main-nav__items">
                <NavigationItem
                  classes='main-nav__item search' />
                { props.isAuth ?
                <NavigationItem
                  classes='main-nav__item'
                  item='link'
                  link='/login'>
                  Login
                </NavigationItem> :
                null }
                <NavigationItem
                  classes='main-nav__item link-publish'
                  item='link'
                  link='/'>
                  Publish
                </NavigationItem>
                { !props.isAuth ?
                <NavigationItem
                  classes='main-nav__item'
                  item='link'
                  link='/logout'>
                  Logout
                </NavigationItem> :
                null }
              </ul>
          </nav>
      </div>
  </header>
)

export default Toolbar
