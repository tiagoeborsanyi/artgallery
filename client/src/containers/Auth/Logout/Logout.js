import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actions from '../../../store/actions/index'
import firebase from '../../../services/firebase'

const Logout = props => {
  const { onLogout } = props

  useEffect(() => {
    firebase.auth().signOut().then(() => {
      console.log('deslogou')
      onLogout()
    })
  }, [onLogout])

  return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
