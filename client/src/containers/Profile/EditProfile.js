import React, { useState } from 'react'

import './EditProfile.css'
import EditProfileComponent from '../../components/ProfileComponent/EditProfileComponent/EditProfileComponent'
import { checkValidity } from '../../shared/utility'
import { objEditProfile } from './objEditProfile'
import Button from '../../components/UI/Button/Button'

const EditProfile = props => {
  const [editProfileForm, setEditProfileForm] = useState(objEditProfile)
  const [formisValid, setFormIsValid] = useState(false)

  const inputChangeHandler = (event, controlName) => {
    const updatepublishForm = {
      ...editProfileForm,
      [controlName]: {
        ...editProfileForm[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, editProfileForm[controlName].validation),
        touched: true
      }
    }
    setEditProfileForm(updatepublishForm)
  }


  return (
    <React.Fragment>
      <div className='container'>
        <h1 className="container-newart-title">Edit profile</h1>
        <div className="container-newart">
          <div className='editProfile-avatar'>
            <div className='editProfile-avatar-img'></div>
          </div>
          <div className='editProfile-form'>
            <EditProfileComponent />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EditProfile
