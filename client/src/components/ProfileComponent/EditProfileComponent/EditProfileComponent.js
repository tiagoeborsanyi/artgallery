import React, {useState} from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './EditProfileComponent.css'
import { objEditProfile } from '../../../containers/Profile/objEditProfile'
import Input from '../../UI/Input/Input'
// import Button from '../../UI/Button/Button'

const EditProfileComponent = props => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const onEditorStateChange = e => {
    setEditorState(e)
  }

  return (
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
      <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      </div>
      <button>Update Information</button>
      <div>
        <p>EDIT PASSWORD</p>
        <span>(Change your password)</span>
      </div>
      <Input
        key={objEditProfile.password1.key}
        inputType={objEditProfile.password1.elementType}
        label={objEditProfile.password1.label}
        value={objEditProfile.password1.value}
        elementConfig={objEditProfile.password1.elementConfig}
        invalid={objEditProfile.password1.valid}
        shouldValidate={objEditProfile.password1.validation}
        touched={objEditProfile.password1.touched}
        classes={objEditProfile.password1.space}
        changed={() => {}} />
      <Input
        key={objEditProfile.password2.key}
        inputType={objEditProfile.password2.elementType}
        label={objEditProfile.password2.label}
        value={objEditProfile.password2.value}
        elementConfig={objEditProfile.password2.elementConfig}
        invalid={objEditProfile.password2.valid}
        shouldValidate={objEditProfile.password2.validation}
        touched={objEditProfile.password2.touched}
        classes={objEditProfile.password2.space}
        changed={() => {}} />
      <Input
        key={objEditProfile.password3.key}
        inputType={objEditProfile.password3.elementType}
        label={objEditProfile.password3.label}
        value={objEditProfile.password3.value}
        elementConfig={objEditProfile.password3.elementConfig}
        invalid={objEditProfile.password3.valid}
        shouldValidate={objEditProfile.password3.validation}
        touched={objEditProfile.password3.touched}
        classes={objEditProfile.password3.space}
        changed={() => {}} />
      <button>Update password</button>
      <div>Connect your social media</div>
    </form>
  )
}

export default EditProfileComponent
