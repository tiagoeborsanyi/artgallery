import React from 'react'
import { Link } from 'react-router-dom'

import './ProfileComponent.css'

const ProfileComponent = props => {
  return (
    <React.Fragment>
      <div className="profile">
            <div className="profile-info">
                <div className="profile-info__image">
                    <img src={
                            props.user.avatar ?
                            props.user.avatar :
                            require('../../assets/person.png')}
                          alt="avatar"
                          style={{background:'rgba(0,0,0,.2)'}} />
                </div>
                <div className="profile-info__text">
                    <div className="profile-info__text-lineone">
                        <h1>{props.user.displayName ? props.user.displayName : props.user.email.split('@')[0]}</h1>
                        {props.currentUid === props.user.uid ?
                        <Link to='/'>Edit Profile</Link>
                        :
                        <button className="text-lineone__button">
                            <span className="material-icons">person</span>
                            <span className="material-icons check">done</span>
                        </button>}
                    </div>
                    <div className="profile-info__text-linetwo">
                        <ul className="text-linetwo__items">
                            <li className="text-linetwo__item">
                                <p>{props.user.arts.length}</p>
                                <span>publish</span>
                            </li>
                            <li className="text-linetwo__item">
                                <p>{props.user.followers.length}</p>
                                <span>Followers</span>
                            </li>
                            <li className="text-linetwo__item">
                                <p>{props.user.following.length}</p>
                                <span>Follows</span>
                            </li>
                        </ul>
                    </div>
                    <div className="profile-info__text-linethree">
                        <h2>Tiago Emerick</h2>
                        <p>
                            Exemplo de conteudo exibido pelo draft.js
                        </p>
                    </div>
                </div>
            </div>
            <div className="profile-menu">
                <ul className="profile-menu__items">
                    <li className="profile-menu__item active">
                        <a href="#">
                            <span className="material-icons">view_module</span>
                            <p>Arts</p>
                        </a>
                    </li>
                    <li className="profile-menu__item">
                        <a href="#">
                            <span className="material-icons">storage</span>
                            <p>Files</p>
                        </a>
                    </li>
                    <li className="profile-menu__item">
                        <a href="#">
                            <span className="material-icons">bookmarks</span>
                            <p>Favorites</p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="list-arts">
                <div className="container-list-arts">
                  {props.user.arts.length ? props.user.arts.map(art =>
                    <div className="list-arts__item" key={art._id}>
                        <Link to={`/vimage/${art._id}`}>
                            <div
                              className="featured-arts__image"
                              style={{backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/${art.original_img[0]}?alt=media')`}}>
                                <div className="featured-arts__image-back"></div>
                                <div className="profile-art__icon">
                                    <span className="material-icons favorite">favorite</span>
                                    <span className="profile-art__icon-number">{art.likes.length ? art.likes.length : ''}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                  ): <p className='list-arts__not-images'>Not images...</p>}
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default ProfileComponent
