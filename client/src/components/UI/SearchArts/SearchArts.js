import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import './SearchArts.css'

const SearchArts = props => {
  const [sValue, setSValue] = useState('')
  const [tags, setTags] = useState([])
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

  const onSearchHandler = event => {
    setSValue(event.target.value)
    const valor = event.target.value
    // const temp = 2000;
    // setTimeout(() => {
      axios.get(`https://drawdry-3f5b8.firebaseio.com/tags.json?orderBy="tag"&startAt="${valor}"&endAt="${valor}\uf8ff"`).then(res => {
        // console.log(res.data)
        const newTag = []
        for (let key in res.data) {
          newTag.push(res.data[key].tag)
        }
        setTags(newTag)
        console.log(newTag)
      })
      .catch(err => console.log(err.response))
    // }, temp);

  }

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
          style={{display: vFilter ? 'block' : ''}}
          onClick={() => wrapper.current = false}>
            <form className='search-arts__form'>
              <div className='search-arts__form-group'>
                <input
                  type='search'
                  className='search-arts__form-group--input'
                  placeholder='Search tags for arts'
                  value={sValue}
                  onChange={onSearchHandler} />
                <label className='search-arts__form-group--label'>Search tags</label>
              </div>
            </form>
            <ul className="search-arts__filter-list__items">
              {tags.map(t => (
                <li className="search-arts__filter-list__item" key={t}>
                  <button>{t}</button>
                </li>
              ))}
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
