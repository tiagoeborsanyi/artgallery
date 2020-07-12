import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Login.css'
import firebase from '../../../services/firebase'
import * as action from '../../../store/actions/index'
import { checkValidity } from '../../../shared/utility'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

const Login = props => {
  const [loading, setLoading] = useState(false)
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
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
      elementType: 'input',
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
  const [formisValid, setFormIsValid] = useState(false)

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
    let formIsValid = true
    for (let key in updateControls) {
      formIsValid = updateControls[key].valid && formIsValid
    }
    setControls(updateControls)
    setFormIsValid(formIsValid)
  }

  const submitHandler = event => {
    event.preventDefault()
    const { email, password } = controls
    props.onAuth(email['value'], password['value'], 'login')
  }

  const loginWithGoogleHandler = async () => {
    setLoading(true)
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
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
      imputType={formElement.config.elementType}
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
              <Button
                btnType='button-form active'
                disabled={!formisValid}>
                Log in
              </Button>
          </form>
          <p className='container-login__or'>or</p>
          <Button
            btnType='container-login-google'
            clicked={loginWithGoogleHandler}>
              { loading ?
              <Spinner form='form' />
              :
              <>
              <img src={require('../../../assets/icons8-google-logo-48.png')} alt='icon google' />
              <span>Continue with Google</span>
              </>}
          </Button>
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
