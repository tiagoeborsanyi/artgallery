import React from 'react'

import './InputImage.css'

const InputImage = props => {
  return (
    <div className={`newart-form-control space ${props.addClassFormControl}`}>
      <label>{props.title} <span>{props.subtitle}</span></label>
      <div className="newart-image__preview" style={{width: props.width, height: props.height}}>
        <input
          className="newart-image__input"
          style={{width: props.width, height: props.height}}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={props.pickedHandler}
          name={props.name} />
          <div className="newart-image__img" style={{width: props.width, height: props.height, backgroundImage: `url(${props.previewUrl})`}}></div>
          <div className="newart-image__change" style={{width: props.width, height: props.height}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width={props.svgWidth ? props.svgWidth : "48px"} height={props.svgHeight ? props.svgHeight : "48px"}><path d="M0 0h24v24H0z" fill="none" /><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" /></svg>
            <span>Choose File...</span>
          </div>
          <div className="newart-image__hover" style={{width: props.width, height: props.height}}></div>
      </div>
      <progress value={props.resume} max="100">{props.resume}%</progress>
    </div>
  )
}

export default InputImage
