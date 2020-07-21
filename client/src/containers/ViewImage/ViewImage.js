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
        console.log(result)
        setArte(result.data)
      }
    }
    fetchData()
    return () => {
      isCancelled.current = true
    }
  }, [vimageId])

  const onLikeHandler = () => {

  }

  let vimage = <p>loading</p>
  if (arte) {
    vimage = <Vimage
      arte={arte.photo}
      isAuth={props.isAuthenticated}
      autualUserIcon={props.isAtualUserIcon}
      clickedLike={onLikeHandler} />
  }

  return vimage
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isAtualUserIcon: state.auth.photoURL
  }
}

export default connect(mapStateToProps)(ViewImage)
