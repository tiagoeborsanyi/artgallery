import React, { useEffect, useState, useRef } from  'react'
import axios from 'axios'
import { connect } from 'react-redux'

import './ViewImage.css'
import Vimage from '../../components/Vimage/Vimage'

const ViewImage = props => {
  const [arte, setArte] = useState()
  const isCancelled = useRef(false)

  const {vimageId} = props.match.params
  useEffect(() => {
    // console.log(isCancelled)
    const fetchData = async () => {
      const result = await axios.get(`/api/photos/photobyid/${vimageId}`)
      if (!isCancelled.current) {
        setArte(result.data)
      }
    }
    fetchData()
    return () => {
      isCancelled.current = true
    }
  }, [vimageId])

  let vimage = <p>loading</p>
  if (arte) {
    vimage = <Vimage
      arte={arte.photo} />
  }

  return vimage
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(ViewImage)
