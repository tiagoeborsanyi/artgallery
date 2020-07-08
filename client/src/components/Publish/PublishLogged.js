import React from 'react'

import './PublishLogged.css'
import Input from '../UI/Input/Input'
import InputImage from '../UI/InputImage/InputImage'

const PublishLogged = props => {
  console.log(props.form.download.checked)
  return (
    <React.Fragment>
      <div className="container">
        <h1 className="container-newart-title">New Art</h1>
        <div className="container-newart">
          <form onSubmit={props.submitPublish}>
            <Input
              classes={props.form.title.space}
              label={props.form.title.label}
              name="title"
              value={props.form.title.value}
              changed={props.changed}
              // Include element configs
               />
            <div className="newart-form-control-flexline space">
              <InputImage
                addClassFormControl="input-file"
                title={props.form.preview1.label}
                name="preview1"
                subtitle="280x350"
                height="175px"
                width="140px"
                pickedHandler={props.pickedHandler}
                previewUrl={props.form.preview1.previewurl}
                resume={props.form.preview1.resume} />
              <div className="newart-form-control textarea space">
                <label>{props.form.description.label}</label>
                <textarea name="description" value={props.form.description.value} onChange={props.changed}></textarea>
              </div>
            </div>
            <InputImage
              title={props.form.preview2.label}
              name="preview2"
              subtitle="(Original size image)"
              svgWidth="100px"
              svgHeight="100px"
              height="270px"
              width="220px"
              pickedHandler={props.pickedHandler}
              previewUrl={props.form.preview2.previewurl}
              resume={props.form.preview2.resume} />
            <div className="newart-tags">
              <div className="newart-form-control space">
                <label>{props.form.tags.label} <span>(Optional)</span></label>
                <input type="text" name="tags" placeholder="Press 'Enter' after each tag." onKeyDown={props.onPresKey} />
              </div>
                <ul className="newart-tags-result__items">
                  {props.form.tags.value.map((tag, index) => (
                    <li className="newart-tags-result__item" key={index}>
                      <button>
                        <span className="material-icons">
                          close
                        </span>
                          {tag}
                      </button>
                    </li>
                  ))}
                  <li className="newart-tags-result__item">
                    <button>
                      <span className="material-icons">
                        close
                      </span>
                        All
                    </button>
                  </li>
                </ul>
              </div>
              <div className="newart-form-control space">
                <label>{props.form.download.label}</label>
                <label className="switch">
                  <input type="checkbox" name="download" defaultChecked={props.form.download.checked} onChange={props.changed} />
                    <span className="slider round"></span>
              </label>
            </div>
            <button className="button-newart-form active">Publish Art</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PublishLogged
