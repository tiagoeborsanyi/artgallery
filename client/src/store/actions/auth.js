// import axios from 'axios'

import firebase from '../../services/firebase'
import * as actionTypes from './actionTypes'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId, email, displayName, photoURL) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    email: email,
    displayName: displayName,
    photoURL: photoURL
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logout = () => {
  // TEM QUE COLOCAR OS REMOVE() DO LOCALSTORAGE
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const auth = (email = '', password = '', isSignup) => {
  // Aqui eu faço a lógica de logar com login e senha n
  return dispatch => {
    console.log(!!email, password, isSignup)
  }
}

export const googleRedirect = (status) => {
  return {
    type: actionTypes.GOOGLE_REDIRECT,
    statusRedirect: status
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    dispatch(authStart())
    firebase.auth().onAuthStateChanged(async (user) => {
      // console.log('user: ', user)
      if (user) {
        const iT = await firebase.auth().currentUser.getIdToken(true)
        // console.log('idToken', iT, user)
        dispatch(authSuccess(
          iT,
          user.uid,
          user.email,
          user.displayName,
          user.photoURL
      ))
      } else {
        firebase.auth().signOut().then(() => {
          console.log('deslogou')
          dispatch(logout())
        })
      }
    })
  }
}
