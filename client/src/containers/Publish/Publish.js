import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

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
  const [loadFile, setLoadFile] = useState(false)
  const [loadFileThumb, setLoadFileThumb] = useState(false)
  const storage = firebase.storage().ref()

  useEffect(() => {
    let formIsValid = true
    const arrImages = pathImages.original_img.length
      for (let key in publishForm) {
        formIsValid = publishForm[key].valid && formIsValid && arrImages
      }
      setFormIsValid(formIsValid)
  }, [publishForm, pathImages])

  const presKey = e => {
    if(e.key === 'Enter' && e.target.value.length >= 2) {
      setPublishForm({
        ...publishForm,
        tags: {
          ...publishForm.tags,
          value: '',
          valid: true,
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

  const removeTagHandler = (id) => {
    if (id !== 0) {
      const updateTags = publishForm
      const newListTags = updateTags.tags.elementConfig.content.filter((tag, i) => id !== i)
      setPublishForm({
        ...publishForm,
        tags: {
          ...publishForm.tags,
          elementConfig: {
            ...publishForm.tags.elementConfig,
            content: newListTags
          }
        }
      })
    }
  }

  const filesHandler = (controlFiles, typeimg) => {
    if (typeimg === '140px') {
      setLoadFileThumb(true)
      setFiles({
        ...files,
        thumb: controlFiles
      })
      pickedHandler(controlFiles, 'thumb')
    } else {
      setLoadFile(true)
      setFiles({
        ...files,
        original_img: controlFiles
      })
      pickedHandler(controlFiles, 'original')
    }
  }

  const pickedHandler = (pickedFile, type) => {
    const promises = []
    setFormIsValid(false)
    Array.from(pickedFile).forEach(file => {
      const uploadTask = storage.child(`${file.lastModified}${file.name}`).put(file)
      promises.push(uploadTask)
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            // console.log(`Progress: ${progress}%`);
           }
        },
        error => console.log(error),
        async () => {
          // const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
          // promises.push(downloadURL)
        }
      )
    })
    Promise.all(promises)
      .then(() => {
        if (type === 'thumb') {
          setLoadFileThumb(false)
          setPathImages({
            ...pathImages,
            thumb: promises
          })
          let formIsValid = true
          for (let key in publishForm) {
            formIsValid = publishForm[key].valid && formIsValid
          }
          setFormIsValid(formIsValid)
        } else {
          setLoadFile(false)
          setPathImages({
            ...pathImages,
            original_img: promises
          })
          let formIsValid = true
          for (let key in publishForm) {
            formIsValid = publishForm[key].valid && formIsValid
          }
          setFormIsValid(formIsValid)
        }
      })
      .catch(err => console.log(err))
  }

  const inputChangeHandler = (event, controlName) => {
    if (controlName === 'download') {
      setPublishForm({
        ...publishForm,
        download: {
          ...publishForm.download,
          elementConfig : {
            type: 'checkbox',
            checked: !publishForm.download.elementConfig.checked
          }
        }
      })
      return
    }
    const updatepublishForm = {
      ...publishForm,
      [controlName]: {
        ...publishForm[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, publishForm[controlName].validation),
        touched: true
      }
    }
    setPublishForm(updatepublishForm)
  }

  const submitHandler = async () => {
    if (!!pathImages.original_img.length && props.isAuthenticated) {
      const updatePathImages = []
      pathImages.original_img.map(arr => updatePathImages.push(`${Object.create(arr).snapshot.ref.location.bucket}/o/${Object.create(arr).snapshot.ref.location.path}`))
      const finalObjForm = {
        title: publishForm.title.value,
        description: publishForm.description.value,
        thumbnail: pathImages.thumb.length ?
          `${Object.create(pathImages.thumb[0]).snapshot.ref.location.bucket}/o/${Object.create(pathImages.thumb[0]).snapshot.ref.location.path}`
          :
          '',
        original_img: updatePathImages,
        tags: publishForm.tags.elementConfig.content,
        download: publishForm.download.elementConfig.checked,
        creator: props.email
      }
      const headers = {
        headers: { Authorization: props.token }
      }
      axios.post('/api/photos/create-art', finalObjForm, headers)
        .then(response => {
          if (response.status === 201) {
            props.history.push(`/vimage/${response.data.photo._id}`)
          }
        })
        .catch(error => console.log(error.message))
    } else {
      console.log('tem que adicionar imagens')
    }
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
        loadfile={loadFile}
        loadFileThumb={loadFileThumb}
        onPresKey={presKey}
        removeTag={removeTagHandler}
        onPicked={filesHandler}
        changed={event => inputChangeHandler(event, formElement.id)} />
  ))

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="container-newart-title">New Art</h1>
        <div className="container-newart">
          <form onSubmit={e => e.preventDefault()}>
            <div className={''}>
              {form}
            </div>
            <Button
              type='submit'
              btnType='button-form active'
              disabled={!formisValid}
              clicked={submitHandler}>
                Publish Art
            </Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    email: state.auth.email
  }
}

export default connect(mapStateToProps)(Publish)
