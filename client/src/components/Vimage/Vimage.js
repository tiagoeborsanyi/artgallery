import React from 'react'

import './VimageCarrousel.css'
import './Vimage.css'

const Vimage = props => {
  return (
    <div className="vimage">
      <section className="vimage-carousel" aria-label="Gallery">
          <ol className="carousel__viewport">
            {props.arte ? props.arte.original_img.map((img, i) => (
              <li key={img}
                  id={`carousel__slide${i+1}`}
                  className="carousel__slide first"
                  style={{backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/${img}?alt=media')`}}>
                {(props.arte.original_img.length >= 2) ?
                  (<div className="carousel__snapper">
                    <a href={`#carousel__slide${ i === 0 ? props.arte.original_img.length : i}`}
                      className="carousel__prev">Go to last slide</a>
                    <a href={`#carousel__slide${props.arte.original_img.length === i+1 ? '1' : i+2}`}
                        className="carousel__next">Go to next slide</a>
                  </div>) : null}
                </li>
            )) : null}
            </ol>
      </section>
      <section className="vimage-thumb">
          <aside className="carousel__navigation">
              <ol className="carousel__navigation-list">
                <li className="carousel__navigation-item">
                  <div className="carousel__navigation-item__cover"></div>
                  <button to=''
                      className="carousel__navigation-button first">
                      <span className="material-icons">arrow_downward</span>
                  </button>
                </li>
              </ol>
          </aside>
      </section>
      <div className="vimage-title">
          <h1>Title</h1>
          <ul className="vimage-title__items">
              <li className="vimage-title__item">
                  <div className="vimage-title__item-icon">
                      <span className="material-icons">favorite</span>
                  </div>
              </li>
              <li className="vimage-title__item-icon">
                  <div className="vimage-title__item-marked">
                      <span className="material-icons marked-turned">turned_in</span>
                      <span className="material-icons marked-check">check</span>
                  </div>
              </li>
          </ul>
      </div>
      <div className="vimage__item-person">
        <img src={props.arte.creator.avatar} alt="person" />
        <span>{props.arte.creator.displayName}</span>
      </div>
      <div className="vimage-description">
        {props.arte.description ?
          (
            <div>
              <h1>Description</h1>
              <p>
                {props.arte.description}
              </p>
            </div>
          ) : null}

      </div>
      <div className="vimage-title__comments">
          <h1>Comments</h1>
      </div>
      <div className="vimage-form">
        <form>
            <div className="vimage-form-control first tooltip">
                <img src={props.autualUserIcon ? props.autualUserIcon : require('../../assets/person_icon_black.png')} alt="person" />
                <span className='tooltiptext'>Faça login</span>
                <input type="text" placeholder="ADD YOUR COMMENTS..." className={!props.isAuth ? 'disabled' : ''} disabled={!props.isAuth} />
            </div>
        </form>
      </div>
      <div className="vimage-coments">
        {props.arte.comment.length ?
        (<ul className="vimage-coments__items">
            <li>
                <div className="vimage__item-person comment">
                    <img src="../img//avatar-370-456322.webp" alt="person" />
                    <span>Tiago Emerick</span>
                </div>
                <div className="vimage__item-comment">
                    <p>This component of the description will need to refer directly to the artwork at hand. There's no perfect formula for this</p>
                </div>
            </li>
        </ul>) : <p>SEM COMENTARIOS</p>}
      </div>
  </div>
  )
}

export default Vimage
