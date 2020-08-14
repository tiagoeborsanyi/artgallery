import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import * as action from '../../../store/actions/index'
import firebase from '../../../services/firebase'
import Spinner from '../../../components/UI/Spinner/Spinner'
import HomeComponentLogged from '../../../components/HomeComponent/HomeComponentLogged/HomeComponentLogged'

const HomeLogged = props => {
  useEffect(() => {
    firebase.auth().getRedirectResult().then(async result => {
      console.log(result)
      if (result.user) {
        props.onLoginGoogleRedirect(true)
        const objUser = {
          displayName: result.user.displayName,
          avatar: result.user.photoURL,
          email: result.user.email,
          uid: result.user.uid
        }
        try {
          const response = await axios.post('/api/users/signupOrLogin', objUser)
          if (response.status === 201) {
            props.onLoginGoogleRedirect(false)
          }
        } catch(err) {
          console.log(err.response)
          props.onLoginGoogleRedirect(false)
          props.onLogout()
        }
      }
    })
    .catch(error => {
      console.log(error)
      props.onLoginGoogleRedirect(false)
      props.onLogout()
    })
  })

  let content = <Spinner />
  if (!props.onGoogleRedirectStatus) {
    content = <HomeComponentLogged />
  }
  console.log('home logged....')
  return content
}

const mapStateToProps = state => {
  return {
    onGoogleRedirectStatus: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginGoogleRedirect: (status) => dispatch(action.googleRedirect(status)),
    onLogout: () => dispatch(action.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLogged)
