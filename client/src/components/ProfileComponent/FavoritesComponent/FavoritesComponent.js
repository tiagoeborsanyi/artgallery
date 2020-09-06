import React from 'react'
import { Link } from 'react-router-dom'

const FavoritesComponent = props => {
  // console.log(props)
  return (
    <div className="list-arts">
      <div className="container-list-arts">
        {props.user.favorites.length ? props.user.favorites.map(art =>
          <div className="list-arts__item" key={art.art._id}>
            <Link to={`/vimage/${art.art._id}`}>
              <div
                className="featured-arts__image"
                style={{backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/${art.art.original_img[0]}?alt=media')`}}>
                  <div className="featured-arts__image-back"></div>
                  <div className="profile-art__icon">
                    <span className="material-icons favorite">favorite</span>
                    <span className="profile-art__icon-number">{art.art.likes.length ? art.art.likes.length : ''}</span>
                  </div>
              </div>
            </Link>
          </div>
        ): <p className='list-arts__not-images'>Not images...</p>}
      </div>
    </div>
  )
}

export default FavoritesComponent
