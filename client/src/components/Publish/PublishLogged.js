import React from 'react'

import './PublishLogged.css'

const PublishLogged = props => {
  return (
    <React.Fragment>
      <div className="container">
        <h1 className="container-newart-title">New Art</h1>
        <div className="container-newart">
          <form>
            <div className="newart-form-control space">
              <label>Title</label>
              <input type="text" />
            </div>
            <div className="newart-form-control-flexline space">
              <div className="newart-form-control input-file space">
                <label>Thumbnail <span>280x350</span></label>
                <div className="image-preview">
                  <input className="image-preview__input" type="file" accept=".jpg,.png,.jpeg" />
                    <div className="image-preview__img"></div>
                    <div className="image-preview__change">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none" /><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" /></svg>
                      <span>Choose File...</span>
                    </div>
                    <div className="image-preview__hover"></div>
                </div>
              </div>
              <div className="newart-form-control textarea space">
                <label>Description</label>
                <textarea></textarea>
              </div>
            </div>
            <div className="newart-form-control original-image space">
              <label>Original Image <span>(Original size image)</span></label>
              <div className="original-image__preview">
                <input className="original-image__input" type="file" accept=".jpg,.png,.jpeg" />
                  <div className="original-image__img"></div>
                  <div className="original-image__change">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="100px" height="100px"><path d="M0 0h24v24H0z" fill="none" /><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" /></svg>
                    <span>Choose File...</span>
                  </div>
                  <div className="original-image__hover"></div>
              </div>
            </div>
            <div className="newart-tags">
              <div className="newart-form-control space">
                <label>Tags <span>(Optional)</span></label>
                <input type="text" placeholder="Press 'Enter' after each tag." />
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
