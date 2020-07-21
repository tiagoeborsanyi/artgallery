const HttpError = require('../models/http-error')
const Photo = require('../models/photo')

const like = async (req, res, next) => {
  const { lid } = req.params
  const { user_id } = req.body

  let photo
  try {
    photo = await Photo.findOne({ _id: lid })
  } catch(error) {
    const err = new HttpError('Like Art failed, please try again.', 500)
    return next(err)
  }

  if (photo.likes.filter(like => like.user.toString() === user_id).length > 0) {
    const removeIndex = photo.likes.map(item => item.user.toString()).indexOf(user_id)
    photo.likes.splice(removeIndex, 1)
  } else {
    photo.likes.push({user: user_id})
  }

  try {
    await photo.save()
  } catch(error) {
    const err = new HttpError('Like Art failed, please try again.', 500)
    return next(err)
  }

  res.status(201).json({ photo: photo.toObject({ getters: true }) })
}

exports.like = like
