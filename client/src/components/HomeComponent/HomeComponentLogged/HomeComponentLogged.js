import React from 'react'
import { Link } from 'react-router-dom'

import './HomeComponentLogged.css'
import SearchArts from '../../UI/SearchArts/SearchArts'

const HomeComponentLogged = props => {
  return (
    <React.Fragment>
      <SearchArts />
      <div className='list-arts'>
        <div className='container-list-arts'>
          {props.images.map(image => (
            <div className='list-arts__item' key={image._id}>
              <Link to={`/vimage/${image._id}`}>
                <div className='featured-arts__image' style={{backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/${image.original_img[0]}?alt=media')`}}>
                    <div className='featured-arts__image-back'></div>
                </div>
              </Link>
              <div className='list-arts__item-icon'>
                  <div className='list-arts__item-svg'>
                      <span className='material-icons'>favorite</span>
                  </div>
                  <div className='list-arts__item-marked'>
                      <span className='material-icons marked-turned'>turned_in</span>
                      <span className='material-icons list-arts__marked-check'>check</span>
                  </div>
              </div>
              <p>{image.title}</p>
              <div className='list-arts__item-person'>
                  <img src={
                            image.creator.avatar ?
                            image.creator.avatar :
                            require('../../../assets/person.png')} alt='person' />
                  <Link to={`/profile/${image.creator.uid}`}><span>{image.creator.displayName ? image.creator.displayName : image.creator.email.split('@')[0]}</span></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomeComponentLogged
