import React from 'react'

import './HomeUnlogged.css'

const HomeUnlogged = props => {
  return (
    <React.Fragment>
      <div className="homeunlogged-banner-info">
        <div className="homeunlogged-banner-info__content">
            <h1 className="homeunlogged-banner-info__content-title">Post your art, build your portfólio</h1>
            <p className="homeunlogged-banner-info__content-text">
              DrawDry is home to a community of creators who publish their illustrations every day.
            </p>
            <p className="homeunlogged-banner-info__content-text last">
              We’re sure you’ll find an illustration or your favorite creator
            </p>
            <a href="#" className="homeunlogged-banner-info__content-link">see the best arts</a>
        </div>
        </div>
        <div className="homeunlogged-featured-arts">
          <div className="homeunlogged-featured-arts__content">
              <div className="homeunlogged-featured-arts__title">
                <h2>Featured stories</h2>
                <p>See all</p>
              </div>
              <div className="homeunlogged-featured-arts__images">
                <div className="homeunlogged-featured-arts__image first"></div>
                <div className="homeunlogged-featured-arts__image second"></div>
                <div className="homeunlogged-featured-arts__image third"></div>
                <div className="homeunlogged-featured-arts__image fourth"></div>
              </div>
          </div>
      </div>
      <div className="homeunlogged-temp-text">
          <p>ewfewewew</p>
          <p>frewewtew</p>
      </div>
    </React.Fragment>
  )
}

export default HomeUnlogged
