const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')
const user = require('../models/user')
const photo = require('../models/photo')

// ADD COMMENT
const addComment = async (req, res, next) => {
  const { pid } = req.params
  const { uid, content } = req.body
  let user
  let photo

  try {
    user = await User.findOne({ uid })
  } catch(error) {
    const err = new HttpError('Comment failed, for search user.', 500)
    return next(err)
  }

  try {
    photo = await Photo.findOne({ _id: pid })
  } catch(error) {
    const err = new HttpError('Comment failed, for search arte.', 500)
    return next(err)
  }

  if (photo) {
    const newComment = {
      user: user._id.toString(),
      content: content
    }
    photo.comment.unshift(newComment)
  }
  try {
    await photo.save()
  } catch(error) {
    const err = new HttpError('Comment failed, please try again.', 500)
    return next(err)
  }
  res.status(201).json({ photo })
}

// DELETE COMMENT
const deleteComment = async (req, res, next) => {
  const { pid, cid } = req.params
  const { uid } = req.body
  let user
  let photo

  try {
    user = await User.findOne({ uid })
  } catch(error) {
    const err = new HttpError('Delete comment failed, for search user.', 500)
    return next(err)
  }

  try {
    photo = await Photo.findOne({ _id: pid })
  } catch(error) {
    const err = new HttpError('Delete comment failed, for search arte.', 500)
    return next(err)
  }

  if (user._id.toString() !== cid) {
    const err = new HttpError('Delete comment failed.', 500)
    return next(err)
  }
  res.status(201).json({success: 'ok'})
}

exports.addComment = addComment
exports.deleteComment = deleteComment
