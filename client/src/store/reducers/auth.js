import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  token: null,
  userId: null,
  email: null,
  displayName: null,
  photoURL: null,
  error: null,
  loading: false,
  loadingWithEmail: false,
  authRediretPath: '/'
}

const loadEmail = (state, action) => {
  return updateObject(state, {
    loadingWithEmail: true
  })
}

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    googleRedirectStatus: false
  })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    email: action.email,
    displayName: action.displayName,
    photoURL: action.photoURL,
    error: null,
    loading: false,
    loadingWithEmail: false
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    loadingWithEmail: false
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    email: null,
    displayName: null,
    photoURL: null,
    loading: false,
    loadingWithEmail: false,
    authRediretPath: '/'
  })
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRediretPath: action.path })
}

const googleRedirect = (state, action) => {
  return updateObject(state, {
    loading: action.statusRedirect
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_EMAIL: return loadEmail(state, action)
    case actionTypes.AUTH_START: return authStart(state, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAIL: return authFail(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
    case actionTypes.GOOGLE_REDIRECT: return googleRedirect(state, action)
    default: return state
  }
}

export default reducer
