import React from 'react'

import './SideDrawer.css'
import NavigationItem from '../NavigationItem/NavigationItem'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = props => {
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <nav className={`mobile-nav ${props.open ? 'open' : 'close'}`} onClick={props.closed}>
        <div className="mobile-nav__user">
            <img src={require('../../../assets/person.png')} alt="icon user" />
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
          <NavigationItem
            classes='mobile-nav__item'
            item='link'
            link='/'
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
            classes='mobile-nav__item'
            item='link'
            link='/'
            icon='icon'
            iconContent='publish'>
            Publish
          </NavigationItem>
          <NavigationItem
            classes='mobile-nav__item'
            item='link'
            link='/'
            icon='icon'
            iconContent='sensor_door'>
            Logout
          </NavigationItem>
        </ul>
      </nav>
    </React.Fragment>
  )
}

export default SideDrawer
