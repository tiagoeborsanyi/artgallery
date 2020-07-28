import React, { useEffect, useState, useRef } from  'react'
import axios from 'axios'
import { connect } from 'react-redux'

import './ViewImage.css'
import firebase from '../../services/firebase'
import Vimage from '../../components/Vimage/Vimage'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'

const ViewImage = props => {
  const [load, setLoad] = useState(false)
  const [erro, setErro] = useState()
  const [arte, setArte] = useState()
  const [like, setLike] = useState(false)
  const [comments, setComments] = useState([])
  const [valueComment, setValueComment] = useState('')
  const [loadComment, setLoadComment] = useState(false)
  const isCancelled = useRef(false)

  const {vimageId} = props.match.params
  const {uid} = props
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/photos/photobyid/${vimageId}`)
        if (!isCancelled.current) {
          if(result.data.photo.likes.filter(like => like.user.uid === uid).length > 0) {
            setLike(true)
          }
          setArte(result.data.photo)
          setComments(result.data.photo.comment)
          setLoad(true)
        }
      } catch (error) {
        if (!isCancelled.current) {
          setErro(error.response.data.message)
          setLoad(true)
        }
      }

    }
    fetchData()
    return () => {
      isCancelled.current = true
    }
  }, [vimageId, uid])

  const downloadImageHandler = (img) => {
    const nImg = img.split('/o/')[1]
    const storage = firebase.storage().ref()
    storage.child(nImg).getDownloadURL().then(url => {
      const a = document.createElement("a");
      a.download = true;
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      a.href = url;
      a.ariaLabel = 'download'
      a.click();
    })

  }

  const onLikeHandler = async () => {
    try {
      const headers = {
        headers: { Authorization: props.token }
      }
      setLike(!like)
      const newArte = await axios.post(`/api/photos/like/${vimageId}`, { uid }, headers)
      if(newArte.data.photo.likes.filter(like => like.user.uid === uid).length > 0) {
        setLike(true)
      } else {
        setLike(false)
      }
      setArte({...arte, likes: newArte.data.photo.likes})
    } catch(error) {
      setLike(like)
      setErro(error.response.data.message)
      console.log('Erro: ', error.response.data.message)
    }
    console.log(arte)
  }

  const addCommentHandler = async (e) => {
    e.preventDefault()
    if (valueComment.length >= 15) {
      const objComment = {
        uid: props.uid,
        content: valueComment
      }
      const headers = {
        headers: { Authorization: props.token }
      }
      setLoadComment(true)
      try {
        const result = await axios.post(`/api/photos/comment/${vimageId}`, objComment, headers)
        if (result) {
          console.log(result)
          setComments([result.data.photo, ...comments])
          setLoadComment(false)
          setValueComment('')
        }
      } catch (error) {
        console.log(error.response)
        setLoadComment(false)
        setErro(error.response.data.message)
      }
    }
  }

  const changeCommentHandler = (e) => {
    setValueComment(e.target.value)
  }

  const commentDeleteHandler = async (id) => {
    const config = {
      headers: { Authorization: props.token },
      data: { uid: props.uid }
    }
    setLoadComment(true)
    try {
      const result = await axios.delete(`/api/photos/comment/${vimageId}/${id}`, config)
      if (result) {
        console.log(result)
        setLoadComment(false)
        setComments(result.data.photo.comment)
      }
    } catch(error) {
      setLoadComment(false)
      setErro(error.response.data.message)
    }
  }

  let vimage
  if (!load) {
    vimage = <Spinner />
  }
  if (load && arte) {
    vimage = <Vimage
      arte={arte}
      isAuth={props.isAuthenticated}
      downloadImage={downloadImageHandler}
      autualUserIcon={props.isAtualUserIcon}
      like={like}
      comments={comments}
      addComment={addCommentHandler}
      clickedLike={onLikeHandler}
      valueComment={valueComment}
      changeComment={changeCommentHandler}
      commentDelete={commentDeleteHandler}
      loadComments={loadComment} />
  }

  return (
    <React.Fragment>
      <Modal show={erro} modalClosed={() => setErro(null)}>
        <div className='vimage-modal-error'>
          {erro}
          <button  onClick={() => setErro(null)}>Close</button>
        </div>
      </Modal>
      {vimage}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isAtualUserIcon: state.auth.photoURL,
    uid: state.auth.userId,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(ViewImage)
