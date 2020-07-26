const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')

const like = async (req, res, next) => {
  const { pid } = req.params
  const { uid } = req.body
  let user
  let photo

  try {
    user = await User.findOne({ uid })
  } catch(error) {
    const err = new HttpError('Like Art failed, please try again.', 500)
    return next(err)
  }

  try {
    photo = await Photo.findOne({ _id: pid })
  } catch(error) {
    const err = new HttpError('Like Art failed, please try again.', 500)
    return next(err)
  }

  if (photo.likes.filter(like => like.user.toString() === user._id.toString()).length > 0) {
    const removeIndex = photo.likes.map(item => item.user.toString()).indexOf(user._id.toString())
    photo.likes.splice(removeIndex, 1)
  } else {
    photo.likes.push({user: user._id.toString()})
  }

  try {
    await photo.save()
  } catch(error) {
    const err = new HttpError('Like Art failed, please try again.', 500)
    return next(err)
  }

  let newPhoto
  try {
    newPhoto = await Photo.findById(pid).populate('creator').populate('likes.user')
  } catch (error) {
    const err = new HttpError('Something whent weong, could not find a art.', 500);
    return next(err);
  }

  res.status(201).json({ photo: newPhoto.toObject({ getters: true }) })
}

exports.like = like
