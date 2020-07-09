import React, { useState } from 'react'

import './Publish.css'
import firebase from '../../services/firebase'
import { checkValidity } from '../../shared/utility'
import { objForm } from './objForm'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

const Publish = props => {
  const [publishForm, setPublishForm] = useState(objForm)
  const [formisValid, setFormIsValid] = useState(false)
  const [files, setFiles] = useState()
  const storage = firebase.storage().ref()

  const presKey = e => {
    if(e.key === 'Enter' && e.target.value.length >= 2) {
      setPublishForm({
        ...publishForm,
        tags: {
          ...publishForm.tags,
          value: '',
          elementConfig: {
            content: [
              ...publishForm.tags.elementConfig.content,
              e.target.value
            ],
            placeholder: 'Press "Enter" after each tag.'
          }
        }
      })
      e.target.value = ''
    }
  }

  const filesHandler = (controlFiles) => {
    console.log(controlFiles)
  }

  const pickedHandler = (event, name) => {
    let pickedFile;
    let objImg = []
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]
      const imgRef = storage.child(`${pickedFile.lastModified}${pickedFile.name}`)
      const resultRef = imgRef.put(pickedFile)
      resultRef.on('state_changed', (p) => {
        let progress = (p.bytesTransferred / p.totalBytes) * 100
        objImg.push(progress)
      }, (error) => {
        console.log(error)
      }, async () => {
        const uploadURL = await resultRef.snapshot.ref.getDownloadURL()
        objImg.push(uploadURL)
        // console.log('URL: ', uploadURL)
      })
      // console.log('result: ', resultRef)
      objImg.push(resultRef)
    }
    return objImg
  }

  const inputChangeHandler = (event, controlName) => {
    const updatepublishForm = {
      ...publishForm,
      [controlName]: {
        ...publishForm[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, publishForm[controlName].validation),
        touched: true
      }
    }
    let formIsValid = true
    for (let key in updatepublishForm) {
      formIsValid = updatepublishForm[key].valid && formIsValid
    }
    setPublishForm(updatepublishForm)
    setFormIsValid(formIsValid)
  }

  const submitHandler = event => {
    event.preventDefault()
    console.log(publishForm)
  }

  const formElementArray = []
  for (let key in publishForm) {
    formElementArray.push({
      id: key,
      config: publishForm[key]
    })
  }

  let form = formElementArray.map(formElement => (
      <Input
        key={formElement.id}
        inputType={formElement.config.elementType}
        label={formElement.config.label}
        value={formElement.config.value}
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        classes={formElement.config.space}
        onPresKey={presKey}
        onPicked={filesHandler}
        changed={event => inputChangeHandler(event, formElement.id)} />
  ))

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="container-newart-title">New Art</h1>
        <div className="container-newart">
          <form onSubmit={submitHandler}>
            <div className={''}>
              {form}
            </div>
            <Button
              btnType='button-form active'
              disabled={!formisValid}>
                Publish Art
            </Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Publish
