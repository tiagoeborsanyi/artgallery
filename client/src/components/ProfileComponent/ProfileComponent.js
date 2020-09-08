import React from 'react'
import { Link, Route } from 'react-router-dom'

import './ProfileComponent.css'
import Artes from './Artes/Artes'
import FavoritesComponent from './FavoritesComponent/FavoritesComponent'
import Button from '../UI/Button/Button'

const ProfileComponent = props => {
  const actived = props.location.pathname.split('/')[props.location.pathname.split('/').length-1]
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
                        <h1>
                          {
                            props.user.displayName ?
                              props.user.displayName :
                              props.user.email.split('@')[0]
                          }
                        </h1>
                        <div className='profile-info__text-lineone-mobile'>
                          {props.currentUid === props.user.uid ?
                          <Link className="text-lineone__button edit-profile" to='/'>Edit Profile</Link>
                          : props.follower ?
                          <button
                            className="text-lineone__button"
                            onClick={() => props.onFollower(props.user.uid)}>
                              <span className="material-icons">person</span>
                              <span className="material-icons check">done</span>
                          </button>
                          :
                          <button
                            className="text-lineone__button follow"
                            onClick={() => props.onFollower(props.user.uid)}>
                              SEGUIR
                          </button>}
                          <Button btnType='like'>
                            <span className="material-icons more-actions__profile">more_horiz</span>
                          </Button>
                        </div>
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
                                <span>Following</span>
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
            <div className='profile-info--mobile'>
              <ul className="profile-info--mobile__items">
                  <li className="profile-info--mobile__item">
                      <p>{props.user.arts.length}</p>
                      <span>publish</span>
                  </li>
                  <li className="profile-info--mobile__item">
                      <p>{props.user.followers.length}</p>
                      <span>Followers</span>
                  </li>
                  <li className="profile-info--mobile__item">
                      <p>{props.user.following.length}</p>
                      <span>Follows</span>
                  </li>
              </ul>
            </div>
            <div className="profile-menu">
                <ul className="profile-menu__items">
                    <li className={`profile-menu__item ${props.location.pathname.split('/').length === 3 ? 'active' : ''}`}>
                        <Link to={{
                          pathname: `${props.match.url}`,
                          state: { fromArtes: true }
                        }}>
                            <span className="material-icons">view_module</span>
                            <p>Arts</p>
                        </Link>
                    </li>
                    {props.currentUid === props.user.uid ?
                    (<><li className="profile-menu__item">
                        <Link to='/'>
                            <span className="material-icons">storage</span>
                            <p>Files</p>
                        </Link>
                    </li>
                    <li className={`profile-menu__item ${actived === 'favorites' ? 'active' : ''}`}>
                        <Link to={{
                          pathname: `${props.match.url+"/favorites"}`,
                          state: { fromFavorites: true }
                        }} >
                            <span className="material-icons">bookmarks</span>
                            <p>Favorites</p>
                        </Link>
                    </li></>)
                    : null}
                </ul>
            </div>
            <>
              <Route path={props.match.url+"/favorites"} component={() => <FavoritesComponent {...props} />} />
              <Route path={props.match.url+"/"} exact component={() => <Artes {...props} />} />
            </>
        </div>
    </React.Fragment>
  )
}

export default ProfileComponent
