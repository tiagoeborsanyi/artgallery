import React from 'react'

import './PublishLogged.css'
import Input from '../UI/Input/Input'
import InputImage from '../UI/InputImage/InputImage'

const PublishLogged = props => {
  const presKey = e => {
    if(e.key === 'Enter') {
      console.log(e.target.value)
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="container-newart-title">New Art</h1>
        <div className="container-newart">
          <form onSubmit={props.submitPublish}>
            <Input
              classes="space"
              label="Title"
              value=""
              changed={() => {}}
              // Include element configs
               />
            <div className="newart-form-control-flexline space">
              <InputImage
                addClassFormControl="input-file"
                title="Thumbnail"
                subtitle="280x350"
                height="175px"
                width="140px"
                pickedHandler={props.pickedHandler}
                previewUrl={props.previewUrl1}
                resume={0} />
              <div className="newart-form-control textarea space">
                <label>Description</label>
                <textarea></textarea>
              </div>
            </div>
            <InputImage
              title="Original Image"
              subtitle="(Original size image)"
              svgWidth="100px"
              svgHeight="100px"
              height="270px"
              width="220px"
              pickedHandler={props.pickedHandler}
              previewUrl={props.previewUrl2}
              resume={props.resume2} />
            <div className="newart-tags">
              <div className="newart-form-control space">
                <label>Tags <span>(Optional)</span></label>
                <input type="text" placeholder="Press 'Enter' after each tag." onKeyDown={presKey} />
              </div>
                <ul className="newart-tags-result__items">
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
                <label>Allow Download?</label>
                <label className="switch">
                  <input type="checkbox" />
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
