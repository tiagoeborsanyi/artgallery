import axios from 'axios'

export const likeHandler = async (token, vimageId, uid) => {
  try {
    const headers = {
      headers: { Authorization: 'token' }
    }
    const newArte = await axios.post(`/api/photos/like/${vimageId}`, { uid }, headers)
    if(newArte.data.photo.likes.filter(like => like.user.uid === uid).length > 0) {
      return {valid: true, art: newArte.data.photo.likes, error: false}
    } else {
      return {valid: false, art: newArte.data.photo.likes, error: false}
    }
    // setArte({...arte, likes: newArte.data.photo.likes})
  } catch(error) {
    console.log(error.response.data.message)
    return {valid: false, art: null, error: error.response.data.message}
    // setLike(like)
    // console.log('Erro: ', error.response.data.message)
  }
}
