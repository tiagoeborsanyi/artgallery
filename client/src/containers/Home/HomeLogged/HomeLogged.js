import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import * as action from '../../../store/actions/index'
import firebase from '../../../services/firebase'
import { likeHandler } from '../../../utils/likeHandler'
import Spinner from '../../../components/UI/Spinner/Spinner'
import HomeComponentLogged from '../../../components/HomeComponent/HomeComponentLogged/HomeComponentLogged'

const HomeLogged = props => {
  const [images, setImages] = useState([])

  useEffect(() => {
    firebase.auth().getRedirectResult().then(async result => {
      // console.log(result)
      if (result.user) {
        props.onLoginGoogleRedirect(true)
        const objUser = {
          displayName: result.user.displayName,
          avatar: result.user.photoURL,
          email: result.user.email,
          uid: result.user.uid
        }
        try {
          const response = await axios.post('/api/users/signupOrLogin', objUser)
          if (response.status === 201) {
            props.onLoginGoogleRedirect(false)
          }
        } catch(err) {
          console.log(err.response)
          props.onLoginGoogleRedirect(false)
          props.onLogout()
        }
      }
    })
    .catch(error => {
      console.log(error)
      props.onLoginGoogleRedirect(false)
      props.onLogout()
    })
  })

  useEffect(() => {
    let memoryLeak = true
    axios.get('/api/photos').then(result => {
      if (images.length === 0 && memoryLeak) {
        console.log('photos: ', result)
        setImages(result.data.photos)
      }
    })
    .catch(error => console.log(error.response))

    return () => memoryLeak = false

  })

  const onLikeHandler = async (imageId) => {
    // console.log(images)
    const obj = await likeHandler(props.token, imageId, props.uid)
    const updateImage = [...images]
    for (let key in images) {
      // console.log(key)
      if (images[key]._id === imageId) {
        updateImage[key].likes = obj.art
        setImages(updateImage)
        return;
      }
    }
  }

  let content = <Spinner />
  if (!props.onGoogleRedirectStatus) {
    content = <HomeComponentLogged
                  images={images}
                  uid={props.uid}
                  likeImage={onLikeHandler} />
  }
  // console.log('home logged....')
  return content
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    onGoogleRedirectStatus: state.auth.loading,
    uid: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginGoogleRedirect: (status) => dispatch(action.googleRedirect(status)),
    onLogout: () => dispatch(action.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLogged)
