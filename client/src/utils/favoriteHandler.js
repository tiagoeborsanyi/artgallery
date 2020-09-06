import axios from 'axios'

export const favoriteHandler = async (token, vimageId, uid) => {
  try {
    const headers = {
      headers: { Authorization: token }
    }
    const newArte = await axios.post(`/api/photos/favorited/${vimageId}`, { uid }, headers)
    if(newArte.data.photo.favorited.filter(favorite => favorite.user.uid === uid).length > 0) {
      return {valid: true, art: newArte.data.photo.favorited, error: false}
    } else {
      return {valid: false, art: newArte.data.photo.favorited, error: false}
    }
  } catch(error) {
    console.log(error.response.data.message)
    return {valid: false, art: null, error: error.response.data.message}
  }
}
