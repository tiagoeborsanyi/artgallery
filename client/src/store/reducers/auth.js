// import * as actionTypes from '../actions/actionTypes'
// import { updateObject } from '../../shared/utility'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRediretPath: '/'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state
  }
}

export default reducer
