// import axios from 'axios'

import firebase from '../../services/firebase'
import * as actionTypes from './actionTypes'

export const loadWithEmail = () => {
  return {
    type: actionTypes.LOAD_EMAIL
  }
}

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

export const auth = (name = '', email = '', password = '', isSignup = false) => {
  // Aqui eu faço a lógica de logar com login e senha n
  return dispatch => {
    dispatch(loadWithEmail())
    if (isSignup) {
      console.log(name, email, password, isSignup)
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {
          console.log(error)
          dispatch(authFail(error))
        })
    } else {
      console.log(email, password)
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
          console.log(error)
          dispatch(authFail(error))
        })
    }
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
