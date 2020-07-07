import React, { useState } from 'react'

import './Publish.css'
import firebase from '../../services/firebase'
import PublishLogged from '../../components/Publish/PublishLogged'

const Publish = props => {
  const [previewUrl2, setPreviewUrl2] = useState()
  const [isValid, setIsValid] = useState(false);
  const [resume, setResume] = useState(0)
  const storage = firebase.storage().ref()

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]
      // console.log(pickedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl2(reader.result)
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
  const submitHandler = event => {
    event.preventDefault()
  }


  return <PublishLogged
    submitPublish={submitHandler}
    pickedHandler={pickedHandler}
    previewUrl2={previewUrl2}
    resume2={resume} />
}

export default Publish
