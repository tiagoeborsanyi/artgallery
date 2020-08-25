import React, { useEffect, useState, useRef } from 'react'

import './SearchArts.css'

const SearchArts = props => {
  const [vFilter, setVFilter] = useState(false)
  let wrapper = useRef(false)

  useEffect(() => {
    document.addEventListener('click', () => {
      if (wrapper.current && vFilter) {
        setVFilter(false)
      }
    })
    return () => {
      wrapper.current = true
    }
  }, [wrapper, vFilter])

  return (
    <div className="search-arts">
      <div className="container-search-arts">
        <button
          className="search-arts__filter-button"
          onClick={() => {
            if(!!vFilter) {
              setVFilter(false)
              return;
            }
            setVFilter(true)
            wrapper.current = false;
          }}>
            Filter Arts
            <span className="material-icons">
                expand_more
            </span>
        </button>
        <div
          className="search-arts__filter-list"
          style={{display: vFilter ? 'block' : ''}}>
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
