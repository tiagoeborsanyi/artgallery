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
  const [pathImages, setPathImages] = useState({
    thumb: '',
    original_img: []
  })
  const [files, setFiles] = useState({
    thumb: '',
    original_img: []
  })
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

  const filesHandler = (controlFiles, typeimg) => {
    console.log(controlFiles, typeimg)
    if (typeimg === '140px') {
      setFiles({
        ...files,
        thumb: controlFiles
      })
      // console.log(files)
      pickedHandler(controlFiles[0], 'thumb')
    } else {
      setFiles({
        ...files,
        original_img: controlFiles
      })
      pickedHandler(controlFiles, 'original')
    }
  }

  const pickedHandler = (pickedFile, type) => {
    const promises = []
    Array.from(pickedFile).forEach(file => {
      const uploadTask = storage.child(`${file.lastModified}${file.name}`).put(file)
      // promises.push(uploadTask)
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            console.log(`Progress: ${progress}%`);
           }
        },
        error => console.log(error),
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
          promises.push(downloadURL)
        }
      )
    })
    Promise.all(promises)
      .then(() => {
        if (type === 'thumb') {
          setPathImages({
            ...pathImages,
            thumb: promises
          })
        } else {
          console.log(promises)
          setPathImages({
            ...pathImages,
            original_img: promises
          })
        }
      })
      .catch(err => console.log(err))
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

  const submitHandler = async event => {
    event.preventDefault()
    console.log(pathImages)

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
