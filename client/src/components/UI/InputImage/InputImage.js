import React, { useState } from 'react'

import './InputImage.css'
import firebase from '../../../services/firebase'

const InputImage = props => {
  const [previewUrl, setPreviewUrl] = useState()
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
        setPreviewUrl(reader.result)
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
        setResume(0)
        setPreviewUrl('')
      })
      // console.log('result: ', resultRef)
    }
  }

  return (
    <div className={`newart-form-control space ${props.addClassFormControl}`}>
      <label>{props.title} <span>{props.subtitle}</span></label>
      <div className="newart-image__preview" style={{width: props.width, height: props.height}}>
        <input
          className="newart-image__input"
          style={{width: props.width, height: props.height}}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler} />
          <div className="newart-image__img" style={{width: props.width, height: props.height, backgroundImage: `url(${previewUrl})`}}></div>
          <div className="newart-image__change" style={{width: props.width, height: props.height}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width={props.svgWidth ? props.svgWidth : "48px"} height={props.svgHeight ? props.svgHeight : "48px"}><path d="M0 0h24v24H0z" fill="none" /><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" /></svg>
            <span>Choose File...</span>
          </div>
          <div className="newart-image__hover" style={{width: props.width, height: props.height}}></div>
      </div>
      <progress value={resume} max="100">{resume}%</progress>
    </div>
  )
}

export default InputImage
