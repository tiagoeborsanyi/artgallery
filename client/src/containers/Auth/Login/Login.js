import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Login.css'
import firebase from '../../../services/firebase'
import * as action from '../../../store/actions/index'
import { checkValidity } from '../../../shared/utility'
import Input from '../../../components/UI/Input/Input'

const Login = props => {
  const [controls, setControls] = useState({
    email: {
      elementConfig: {
        type: 'email',
        placeholder: 'Your email'
      },
      label: 'Email',
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false,
      space: 'space'
    },
    password: {
      elementConfig: {
        type: 'password',
        placeholder: 'Your password'
      },
      label: 'Password',
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false,
      space: ''
    }
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user: ', user)
      if (user) {
        const iT = firebase.auth().currentUser.getIdToken(true)
        console.log('idToken', iT)
      }
    })

  }, [])

  const inputChangeHandler = (event, controlName) => {
    const updateControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      }
    }
    setControls(updateControls)
  }

  const submitHandler = event => {
    event.preventDefault()
    const { email, password } = controls
    props.onAuth(email['value'], password['value'], 'login')
  }

  const loginWithGoogleHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  const logout = () => {
    firebase.auth().signOut().then(() => {
      console.log('deslogou')
    })
  }

  const formElementArray = []
  for (let key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key]
    })
  }
  let form = formElementArray.map(formElement => (
    <Input
      key={formElement.id}
      label={formElement.config.label}
      value={formElement.config.value}
      elementConfig={formElement.config.elementConfig}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      classes={formElement.config.space}
      changed={event => inputChangeHandler(event, formElement.id)} />
  ))

  return (
    <div className='container-L'>
      <h2 className='container-title'>Log in</h2>
      <div className='container-login'>
          <form onSubmit={submitHandler}>
              {form}
              <div className='login-form-control forgot-password'>
                  <Link to='/'>Forgot password?</Link>
              </div>
              <button className='button-login-form active'>Log in</button>
          </form>
          <p className='container-login__or'>or</p>
          <button className='container-login-google' onClick={loginWithGoogleHandler}>
              <img src={require('../../../assets/icons8-google-logo-48.png')} alt='icon google' />
              <span>Continue with Google</span>
          </button>
          <button onClick={logout}>
            logout
          </button>
      </div>
      <div className='container-login_new'>
          <p>New to DrawDry?</p>
          <Link to='/signup'>Sign up</Link>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup))
  }
}

export default connect(null, mapDispatchToProps)(Login)
