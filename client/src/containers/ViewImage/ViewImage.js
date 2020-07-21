import React, { useEffect, useState, useRef } from  'react'
import axios from 'axios'
import { connect } from 'react-redux'

import './ViewImage.css'
import Vimage from '../../components/Vimage/Vimage'

const ViewImage = props => {
  const [arte, setArte] = useState()
  const [like, setLike] = useState(false)
  const isCancelled = useRef(false)

  const {vimageId} = props.match.params
  const {uid} = props
  useEffect(() => {
    // console.log(isCancelled)
    const fetchData = async () => {
      const result = await axios.get(`/api/photos/photobyid/${vimageId}`)
      if (!isCancelled.current) {
        console.log(result)
        if(result.data.photo.likes.filter(like => like.user.uid === uid).length > 0) {
          setLike(true)
        }
        setArte(result.data)
      }
    }
    fetchData()
    return () => {
      isCancelled.current = true
    }
  }, [vimageId, uid])

  const onLikeHandler = () => {
    console.log('clicked like')
  }

  let vimage = <p>loading</p>
  if (arte) {
    vimage = <Vimage
      arte={arte.photo}
      isAuth={props.isAuthenticated}
      autualUserIcon={props.isAtualUserIcon}
      like={like}
      clickedLike={onLikeHandler} />
  }

  return vimage
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isAtualUserIcon: state.auth.photoURL,
    uid: state.auth.userId
  }
}

export default connect(mapStateToProps)(ViewImage)
