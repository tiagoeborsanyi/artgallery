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
        setArte(result.data.photo)
      }
    }
    fetchData()
    return () => {
      isCancelled.current = true
    }
  }, [vimageId, uid])

  const downloadImageHandler = (img) => {
    console.log('download: ', img)
  }

  const onLikeHandler = async () => {
    let newArte
    try {
      newArte = await axios.post(`/api/photos/like/${vimageId}`, { uid })
      setArte({...arte, likes: newArte.data.photo.likes})
    } catch(error) {
      console.log(error.message)
    }
    if(newArte.data.photo.likes.filter(like => like.user.uid === uid).length > 0) {
      setLike(true)
    } else {
      setLike(false)
    }
    console.log(arte)
  }

  let vimage = <p>loading</p>
  if (arte) {
    vimage = <Vimage
      arte={arte}
      isAuth={props.isAuthenticated}
      downloadImage={downloadImageHandler}
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
