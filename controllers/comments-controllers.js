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

  user = await util.auxFind(User, {uid}, 'Comment failed, for search user.', next)
  photo = await util.auxFind(Photo, {_id: pid}, 'Comment failed, for search arte.', next)

  if (photo) {
    const newComment = {
      user: user._id.toString(),
      user_uid: uid,
      content: content
    }
    photo.comment.unshift(newComment)
  }
  await util.auxSave(photo, 'Comment failed, please try again.', next)
  const resComment = {
    content: content,
    createdcomment: photo.comment[0].createcomment,
    user: user,
    user_uid: uid,
    _id: photo.comment[0]._id
  }

  res.status(201).json({photo: resComment})
}

// DELETE COMMENT
const deleteComment = async (req, res, next) => {
  const { pid, cid } = req.params
  const { uid } = req.body
  let photo

  photo = await util.auxFind(Photo, { _id: pid }, 'Delete comment failed, for search arte.')

  if (photo.comment.filter(cm => cm._id.toString() === cid && cm.user_uid === uid).length === 0) {
    const err = new HttpError('Não pode deleta seu comentario.', 500)
    return next(err)
  }
  const removeIndex = photo.comment.map(cm => cm._id.toString()).indexOf(cid)
  photo.comment.splice(removeIndex, 1)
  await util.auxSave(photo, 'Comment failed, please try again.', next)
  try {
    photo = await Photo.findById(pid).populate('creator').populate('comment.user')
  } catch (error) {
    const err = new HttpError('Something whent weong, could not find a art.', 500)
    return next(err)
  }
  res.status(201).json({photo})
}

exports.addComment = addComment
exports.deleteComment = deleteComment
