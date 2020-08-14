import React from 'react'

import './SearchArts.css'

const SearchArts = props => {
  return (
    <div className="search-arts">
      <div className="container-search-arts">
        <button className="search-arts__filter-button">
            Filter Arts
            <span className="material-icons">
                expand_more
            </span>
        </button>
        <div className="search-arts__filter-list">
            <ul className="search-arts__filter-list__items">
                <li className="search-arts__filter-list__item">
                    <button>Arts</button>
                </li>
                <li className="search-arts__filter-list__item">
                    <button>Public</button>
                </li>
                <li className="search-arts__filter-list__item">
                    <button>Free</button>
                </li>
                <li className="search-arts__filter-list__item">
                    <button>Download</button>
                </li>
                <li className="search-arts__filter-list__item">
                    <button>$6</button>
                </li>
                <li className="search-arts__filter-list__item">
                    <button>Comics</button>
                </li>
                <li className="search-arts__filter-list__item">
                    <button>Cartoon</button>
                </li>
            </ul>
        </div>
        <div className="search-arts-result">
            <ul className="search-arts-result__items">
                <li className="search-arts-result__item">
                    <button>
                        <span className="material-icons">
                            close
                        </span>
                        All
                    </button>
                </li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchArts
