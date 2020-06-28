import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Signup.css'
import firebase from '../../../services/firebase'
import * as action from '../../../store/actions/index'
import { checkValidity } from '../../../shared/utility'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'

const Signup = props => {
  const [controls, setControls] = useState({
    name: {
      elementConfig: {
        type: 'text',
        placeholder: 'Your name'
      },
      label: 'Name',
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      space: 'space'
    },
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
    confirmEmail: {
      elementConfig: {
        type: 'email',
        placeholder: 'Your email'
      },
      label: 'Confirm Email',
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
      space: 'space'
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
    const { name, email, confirmEmail, password } = controls
    props.onAuth(
      name['value'],
      email['value'],
      confirmEmail['value'],
      password['value'],
      'signup'
    )
  }

  const loginWithGoogleHandler = () => {
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
    <div className="container-S">
      <h2 className="container-signup-title">Sign up</h2>
      <div className="container-signup">
          <Button
            btnType='container-login-google'
            clicked={loginWithGoogleHandler}>
              <img src={require('../../../assets/icons8-google-logo-48.png')} alt='icon google' />
              <span>Continue with Google</span>
          </Button>
          <div className="container-signup__or-divider">
              <div className="container-signup__or-line"></div>
              <p className="container-signup__or">or</p>
          </div>
          <form onSubmit={submitHandler}>
              {form}
              <Button
                btnType='button-form active'
                disabled={!formisValid}>
                Log in
              </Button>
          </form>
          <div className="container-signup-terms">
              <p>
                  By sign up, you agree to DrawDry
                  <Link to='/'>Terms of Use</Link>, <Link to='/'>Privacy Policy</Link>
                  and <Link to='/'>Cookie Policy</Link>
              </p>
          </div>
      </div>
      <div className="container-signup_new">
          <p>Already have an account?</p>
          <Link to='/login'>Log in</Link>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup))
  }
}

export default connect(null, mapDispatchToProps)(Signup)
