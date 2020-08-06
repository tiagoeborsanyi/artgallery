import React from 'react'

import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItem from '../NavigationItem/NavigationItem'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import DrawerOffline from '../SideDrawer/DrawerOffline/DrawerOffline'

const Toolbar = props => {
  return (
    <header className="main-header">
        <div className="main-header__content">
            <div className="main-header__content-mobile">
              {!props.isAuth ?
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
                  link='/arts'>
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
                    classes='main-nav__item login'
                    item='link'
                    link='/login'>
                    Login
                  </NavigationItem> :
                  null }
                  { !props.isAuth ?
                  <div className="main-header__photo-icon">
                    <button
                      className="main-header__photo-icon-button">
                      <img src={props.photoIcon ? props.photoIcon : require('../../../assets/person.png')} alt="" className={!props.photoIcon ? 'icon-not-logged' : ''} />
                    </button>
                    <div className={`main-header__photo-icon-content`}>
                      <ul className="main-header__photo-icon-content__items">
                      <NavigationItem
                          classes='main-nav__item'
                          item='link'
                          link={`/profile/${props.uid}`}
                          icon='icon'
                          iconContent='account_box'>
                          My Profile
                        </NavigationItem>
                        <NavigationItem
                          classes='mobile-nav__item'
                          item='link'
                          link='/'
                          icon='icon'
                          iconContent='bookmark'>
                          Saved
                        </NavigationItem>
                        <NavigationItem
                          classes='main-nav__item'
                          item='link'
                          link='/logout'
                          icon='icon'
                          iconContent='sensor_door'>
                            Logout
                        </NavigationItem>
                      </ul>
                    </div>
                  </div> :
                  null }
                  <NavigationItem
                    classes='main-nav__item link-publish'
                    item='link'
                    link='/publish'>
                    Publish
                  </NavigationItem>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Toolbar
