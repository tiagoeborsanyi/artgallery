import React, { useState, useEffect } from 'react'
import JSZip from 'jszip'
import uid from 'uid'

import './Input.css'
import './input-image.css'
import './input-switch.css'
import './input-textarea.css'
import './input-tags.css'
import Spinner from '../Spinner/Spinner'

const Input = props => {
  const [files, setFiles] = useState([])
  const [previewUrl, setPreviewUrl] = useState([])
  const [imageValid, setImageValid] = useState('')
  const zip = new JSZip()
  let inputElement = null
  let classValid = ''

  if (props.invalid && props.shouldValidate && props.touched) {
    classValid = 'invalid'
  }

  useEffect(() => {
    if (!files || files.length > 5) {
      setImageValid('imageValid')
      return;
    }
    const arr = []
    let count = 1
    files.forEach((file) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
          arr.push(fileReader.result)
          if (files.length === count || count === 5) {
            setPreviewUrl(arr)
            setImageValid('')
          }
          count++
        }
      fileReader.readAsDataURL(file)
    })
    return () => {
      setPreviewUrl([])
    }
  }, [files]);

  const pickedHandler = (event, typeimg) => {
      let pickedFile;
      let pickedFiltered = [];
      const newUid = uid();
      if (event.target.files && event.target.files.length >= 1) {
        pickedFile = event.target.files;
        [...pickedFile].forEach(async (file, i) => {
          if (file.type.split('/')[0] !== 'image') {
            setImageValid('imageValid')
          } else {
            pickedFiltered.push(file)
            console.log(file)
            zip.folder(`images-${newUid}`).file(file.name, file)
          }
          if (i === ([...pickedFile].length-1) && pickedFiltered.length >= 0) {
            setFiles(pickedFiltered)
            props.onPicked(pickedFiltered, typeimg);
            const promise = await zip.generateAsync({ type: 'uint8array' })
            // console.log(promise)
            props.onPicked(promise, 'zip')
          }
        })
      }
  };

  switch (props.inputType) {
    case ('input'):
      inputElement = (
        <div className={`input-form-control ${props.classes}`}>
          <label>{props.label} <span>{props.elementConfig.subtitle}</span></label>
          <input
            className={classValid}
            value={props.value}
            name={props.name}
            onChange={props.changed}
            {...props.elementConfig} />
        </div>
      )
    break
    case ('input-image'):
      inputElement = (
        <div className="input-form-control-flexline space">
          <div className={`newart-form-control form-control-input__mobile-desktop space`}>
            <label>{props.label} <span>{props.elementConfig.subtitle}</span></label>
            <div
              className="newart-image__preview"
              style={{width: props.elementConfig.width, height: props.elementConfig.height}}>
              <input
                className="newart-image__input"
                style={{width: props.elementConfig.width, height: props.elementConfig.height}}
                type="file"
                accept=".jpg,.png,.jpeg"
                multiple={props.elementConfig.selectimg}
                onChange={event => pickedHandler(event, props.elementConfig.width)} />
                <div
                  className="newart-image__img"
                  style={{
                    width: props.elementConfig.width,
                    height: props.elementConfig.height,
                    backgroundImage: `url(${!props.elementConfig.selectimg ? previewUrl[0] : ''})`}}
                  >{(!props.elementConfig.selectimg && props.loadFileThumb && previewUrl.length) ? <Spinner form='form' /> : ''}</div>
                <div className="newart-image__change" style={{width: props.elementConfig.width, height: props.elementConfig.height}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width={props.elementConfig.svgWidth} height={props.elementConfig.svgHeight}><path d="M0 0h24v24H0z" fill="none" /><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" /></svg>
                  <span>Choose File...</span>
                  <span className={`textImage ${imageValid}`}>{props.elementConfig.extratext && props.elementConfig.extratext}</span>
                </div>
                <div className="newart-image__hover" style={{width: props.elementConfig.width, height: props.elementConfig.height}}></div>
            </div>
          </div>
          <div className={`newart-form-control__container-result space`}>
            {props.elementConfig.selectimg ? previewUrl.map((p, i) => (
            <div
            key={i}
            className="newart-image__img-result"
            style={{backgroundImage: `url(${p})`}}
            >{props.loadfile ? <Spinner form='form' /> : null}</div>)) : null}
          </div>
        </div>
      )
    break
    case ('tags'):
      inputElement = (
        <div className="newart-tags">
          <div className="input-form-control space">
            <label>{props.label} <span>(Optional)</span></label>
            <input
              type="text"
              name="tags"
              placeholder={props.elementConfig.placeholder}
              onKeyDown={props.onPresKey} />
          </div>
          <ul className="newart-tags-result__items">
            {props.elementConfig.content.map((tag, index) => (
              <li className="newart-tags-result__item" key={index} onClick={() => props.removeTag(index)}>
                <button>
                  <span className="material-icons">
                    close
                  </span>
                  <span>{tag}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )
      break;
      case ('textarea'):
        inputElement = (
          <div className="newart-form-control textarea space">
            <label>{props.label}</label>
            <textarea value={props.value} onChange={props.changed}></textarea>
          </div>
        )
      break;
      case ('checkbox-switch'):
        inputElement = (
          <div className="input-form-control space">
            <label>{props.label}</label>
            <label className="switch">
              <input
                type={props.elementConfig.type}
                defaultChecked={props.elementConfig.checked}
                onChange={props.changed} />
                <span className="slider round"  style={{margin: '0'}}></span>
            </label>
          </div>
        )
      break;
      default:
        inputElement = (
          <div className={`input-form-control ${props.classes}`}>
            <label>{props.label}</label>
            <input
              className={classValid}
              value={props.value}
              name={props.name}
              onChange={props.changed}
              {...props.elementConfig} />
          </div>
        )
  }

  return inputElement
}

export default Input
