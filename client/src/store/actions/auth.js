// import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
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
  // Aqui eu faço a lógica de logar com login e senha
  return dispatch => {
    console.log(!!email, password, isSignup)
  }
}
