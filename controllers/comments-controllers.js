const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')
const util = require('./utils')


// ADD COMMENT
const addComment = async (req, res, next) => {
  const { pid } = req.params
  const { uid, content } = req.body
  let user
  let photo

  user = await util.auxFind(User, {uid}, 'Comment failed, for search user.')
  photo = await util.auxFind(Photo, {_id: pid}, 'Comment failed, for search arte.')

  if (photo) {
    const newComment = {
      user: user._id.toString(),
      content: content
    }
    photo.comment.unshift(newComment)
  }
  await util.auxSave(photo, 'Comment failed, please try again.')

  res.status(201).json({ photo })
}

// DELETE COMMENT
const deleteComment = async (req, res, next) => {
  const { pid, cid } = req.params
  const { uid } = req.body
  let user
  let photo

  user = await util.auxFind(User, {uid}, 'Delete comment failed, for search user.')
  photo = await util.auxFind(Photo, { _id: pid }, 'Delete comment failed, for search arte.')
  console.log(user, photo)
  if (user._id.toString() !== cid) {
    const err = new HttpError('Delete comment failed.', 500)
    return next(err)
  }
  res.status(201).json({success: 'ok'})
}

exports.addComment = addComment
exports.deleteComment = deleteComment
