import React, { useState } from 'react'

import './Publish.css'
import firebase from '../../services/firebase'
import PublishLogged from '../../components/Publish/PublishLogged'

const Publish = props => {
  const [form, setForm] = useState({
    title: {
      label: 'Title',
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      space: 'space'
    },
    description: {
      label: 'Description',
      value: '',
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
      space: 'space'
    },
    preview1: {
      label: 'Thumbnail',
      previewurl: '',
      resume: 0,
      thumburl: '',
      metadata: {}
    },
    preview2: {
      label: 'Original Image',
      previewurl: '',
      resume: 0,
      thumburl: '',
      metadata: {}
    },
    tags: {
      label: 'Tags',
      value: []
    },
    download: {
      label: 'Allow Download',
      value: '',
      checked: false,
      touched: false
    }
  })
  const [previewUrl2, setPreviewUrl2] = useState()
  const [resume, setResume] = useState(0)
  const storage = firebase.storage().ref()

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]
      // console.log(pickedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl2(reader.result)
        console.log('preview: ', typeof reader.result)
      }
      reader.readAsDataURL(pickedFile)
      const imgRef = storage.child(`${pickedFile.lastModified}${pickedFile.name}`)
      const resultRef = imgRef.put(pickedFile)
      resultRef.on('state_changed', (p) => {
        let progress = (p.bytesTransferred / p.totalBytes) * 100
        setResume(progress)
        console.log('result: ', progress)
      }, (error) => {
        console.log(error)
      }, async () => {
        const uploadURL = await resultRef.snapshot.ref.getDownloadURL()
        console.log('URL: ', uploadURL)
      })
      console.log('result: ', resultRef)
    }
  }

  const presKey = e => {
    if(e.key === 'Enter') {
      setForm({...form, tags: {value: [...form.tags.value, e.target.value]}})
      e.target.value = ''
    }
  }

  const inputChangeHandler = (event) => {
    if (event.target.name === 'download') {
      setForm({...form, download: {checked: !form.download.checked}})
    }
    const updateForm = {
      ...form,
      [event.target.name]: {
        ...form[event.target.name],
        value: event.target.value,
        // valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      }
    }
    setForm(updateForm)
  }

  const submitHandler = event => {
    event.preventDefault()
    console.log(form)
  }


  return <PublishLogged
    form={form}
    changed={event => inputChangeHandler(event)}
    submitPublish={submitHandler}
    pickedHandler={pickedHandler}
    previewUrl2={previewUrl2}
    resume2={resume}
    onPresKey={presKey} />
}

export default Publish
