import React, { useEffect } from  'react'
import axios from 'axios'
import { connect } from 'react-redux'

import './ViewImage.css'

const ViewImage = props => {
  useEffect(() => {
    console.log(props)
  })
  return <div className='viewimage'>View Image</div>
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(ViewImage)
