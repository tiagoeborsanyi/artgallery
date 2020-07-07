import React from 'react'

import './Publish.css'
import PublishLogged from '../../components/Publish/PublishLogged'

const Publish = props => {
  const submitHandler = event => {
    event.preventDefault()
  }

  return <PublishLogged
    submitPublish={submitHandler} />
}

export default Publish
