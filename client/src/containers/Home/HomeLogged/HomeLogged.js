import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import * as action from '../../../store/actions/index'
import firebase from '../../../services/firebase'
import { likeHandler } from '../../../utils/likeHandler'
import Spinner from '../../../components/UI/Spinner/Spinner'
import HomeComponentLogged from '../../../components/HomeComponent/HomeComponentLogged/HomeComponentLogged'
import Modal from '../../../components/UI/Modal/Modal'

const HomeLogged = props => {
  const [images, setImages] = useState([])
  const [load, setLoad] = useState(false)
  const [erro, setErro] = useState()

  useEffect(() => {
    firebase.auth().getRedirectResult().then(async result => {
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
          setErro(err.response.data.message)
          props.onLoginGoogleRedirect(false)
          props.onLogout()
        }
      }
    })
    .catch(error => {
      setErro(error.response.data.message)
      props.onLoginGoogleRedirect(false)
      props.onLogout()
    })
  })

  useEffect(() => {
    let memoryLeak = true
    axios.get('/api/photos').then(result => {
      if (images.length === 0 && memoryLeak) {
        setImages(result.data.photos)
      }
    })
    .catch(error => {
      setErro(error.response.data.message)
    })

    return () => memoryLeak = false
  })

  const onLikeHandler = async (imageId) => {
    const obj = await likeHandler(props.token, imageId, props.uid)
    if(obj.error) {
      setErro(obj.error)
      return;
    }
    const updateImage = [...images]
    for (let key in images) {
      if (images[key]._id === imageId) {
        updateImage[key].likes = obj.art
        setImages(updateImage)
        return;
      }
    }
  }

  const choiceTags = async (arr) => {
    try {
      setLoad(true)
      const response = await axios.post('/api/photos', {tags: arr})
      if (response.status === 201) {
        // console.log(response.data)
        setImages(response.data.photos)
        setLoad(false)
      }
    } catch(err) {
      // console.log(err.response)
      setErro(err.response)
      setLoad(false)
    }
  }

  let content = <Spinner />

  if (!props.onGoogleRedirectStatus) {
    content = <HomeComponentLogged
                  images={images}
                  uid={props.uid}
                  token={props.token}
                  isAuth={props.isAuthenticated}
                  likeImage={onLikeHandler}
                  choiceTags={choiceTags}
                  load={load} />
  }

  return (
    <React.Fragment>
      <Modal show={erro} modalClosed={() => setErro(null)}>
        <div className='vimage-modal-error'>
          {erro}
          <button  onClick={() => setErro(null)}>Close</button>
        </div>
      </Modal>
      {content}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
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
