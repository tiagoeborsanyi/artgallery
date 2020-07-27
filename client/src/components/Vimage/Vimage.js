import React from 'react'

import './VimageCarrousel.css'
import './Vimage.css'
import Button from '../UI/Button/Button'

const Vimage = props => {
  // console.log(props.comments)
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
                {props.arte ? props.arte.original_img.map((img, i) => (
                  <li
                    key={img}
                    className="carousel__navigation-item"
                    style={{backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/${img}?alt=media')`}}>
                    <div className="carousel__navigation-item__cover"></div>
                    {(props.isAuth && props.arte.download) ?
                    (<button
                        onClick={() => props.downloadImage(img)}
                        className="carousel__navigation-button">
                        <span className="material-icons">arrow_downward</span>
                    </button>) :
                    (<button className="carousel__navigation-button"></button>)}
                  </li>
                )) : null}
              </ol>
          </aside>
      </section>
      <div className="vimage-title">
        <div className="vimage-title__content">
          <h1>{props.arte.title}</h1>
          <span>{props.arte.likes.length > 0 ? `${props.arte.likes.length} LIKE` : null}</span>
        </div>
        <ul className="vimage-title__items tooltip">
            {!props.isAuth ? <span className='tooltiptext'>Faça login</span> : null}
            <li className="vimage-title__item" style={{display: 'flex'}}>
              {!props.isAuth ?
              (<div className="vimage-title__item-icon not-logged">
                  <span
                    className={`material-icons`}
                    >
                    favorite
                  </span>
                </div>)
              :
              <Button
                clicked={props.clickedLike}
                btnType='like'>
                <div className="vimage-title__item-icon">
                  <span
                    className={`material-icons ${props.like && 'active'}`}
                    >
                    favorite
                  </span>
                </div>
              </Button>}
            </li>
            <li className="vimage-title__item-icon">
            {!props.isAuth ?
              <div className="vimage-title__item-marked not-logged">
                  <span className="material-icons marked-turned">turned_in</span>
                  <span className="material-icons marked-check">check</span>
              </div>
              :
              <Button
                clicked={()=>{}}
                btnType='like'>
                <div className="vimage-title__item-marked">
                  <span className="material-icons marked-turned">turned_in</span>
                  <span className="material-icons marked-check">check</span>
                </div>
              </Button>}
            </li>
        </ul>
      </div>
      <div className="vimage__item-person avatar-creator">
        <img src={
            props.arte.creator.avatar ?
            props.arte.creator.avatar :
            require('../../assets/person.png')}
            className={!props.arte.creator.avatar ? 'avatar-not-logged' : ''}
            alt="person" />
        <span>
          {
            props.arte.creator.displayName ?
            props.arte.creator.displayName :
            props.arte.creator.email.split('@')[0]
          }
        </span>
      </div>
      <div className="vimage-description">
        {props.arte.description ?
          (
            <>
              <h1>Description</h1>
              <p>
                {props.arte.description}
              </p>
            </>
          ) : null}

      </div>
      <div className="vimage-title__comments">
          <h1>Comments</h1>
      </div>
      <div className="vimage-form">
        <form onSubmit={props.addComment}>
            <div className="vimage-form-control first tooltip">
                <img src={props.autualUserIcon ? props.autualUserIcon : require('../../assets/person_icon_black.png')} alt="person" />
                {!props.isAuth ? <span className='tooltiptext'>Faça login</span> : null}
                <input
                  type="text"
                  placeholder="ADD YOUR COMMENTS..."
                  className={!props.isAuth ? 'disabled' : ''}
                  disabled={!props.isAuth}
                  value={props.valueComment}
                  onChange={props.changeComment} />
            </div>
        </form>
      </div>
      <div className="vimage-coments">
        {props.comments.length ?
        (<ul className="vimage-coments__items">
          {props.comments.map(cmt => (
            <li key={cmt._id}>
              <div className="vimage__item-person comment">
                <div className='user-comments'>
                  <img
                    src={
                      cmt.user.avatar ?
                      cmt.user.avatar :
                      require('../../assets/person.png')}
                      className={!cmt.user.avatar ? 'avatar-not-logged' : ''}
                    alt="person" />
                  <span>{cmt.user.displayName ? cmt.user.displayName : cmt.user.email.split('@')[0]}</span>
                </div>
                <div className='more-comments'>
                  <span className="material-icons">more_vert</span>
                </div>
              </div>
              <div className="vimage__item-comment">
                  <p>{cmt.content}</p>
              </div>
            </li>
          ))}

        </ul>) :
        <div className='vimage-comments__not'>
          <p>SEM COMENTARIOS</p>
        </div>}
      </div>
  </div>
  )
}

export default Vimage
