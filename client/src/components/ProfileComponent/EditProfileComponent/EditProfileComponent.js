import React from 'react'

import './EditProfileComponent.css'
import { objEditProfile } from '../../../containers/Profile/objEditProfile'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

const EditProfileComponent = props => (
  <form onSubmit={e => e.preventDefault()}>
    <Input
      key={objEditProfile.displayName.key}
      inputType={objEditProfile.displayName.elementType}
      label={objEditProfile.displayName.label}
      value={objEditProfile.displayName.value}
      elementConfig={objEditProfile.displayName.elementConfig}
      invalid={objEditProfile.displayName.valid}
      shouldValidate={objEditProfile.displayName.validation}
      touched={objEditProfile.displayName.touched}
      classes={objEditProfile.displayName.space}
      changed={() => {}} />
    <p>EDIT PASSWORD</p>
    <Button
      type='submit'
      btnType='button-form active'
      disabled={true}
      clicked={() => {}}>
      Save
    </Button>
  </form>
)

export default EditProfileComponent
