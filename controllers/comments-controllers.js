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
      content: content,
      likes: []
    }
    photo.comment.unshift(newComment)
  }
  await util.auxSave(photo, 'Comment failed, please try again.', next)
  const resComment = {
    content: content,
    likes: [],
    createcomment: photo.comment[0].createcomment,
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

  photo = await util.auxFind(Photo, { _id: pid }, 'Delete comment failed, for search arte.', next)

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

const likeComment = async (req, res, next) => {
  const { pid, cid } = req.params
  const { uid } = req.body
  let user
  let photo
  let comment

  user = await util.auxFind(User, {uid}, 'Like comment failed, for search user.', next)
  photo = await util.auxFind(Photo, {_id: pid}, 'Like comment failed, for search arte.', next)

  comment = photo.comment.map(c => {
    if(c._id.toString() === cid) {
      return c
    }
  })[0]
  // console.log(comment)

  if (comment.likes.filter(like => like.user.toString() === user._id.toString()).length > 0) {
    const removeIndex = comment.likes.map(item => item.user.toString()).indexOf(user._id.toString())
    comment.likes.splice(removeIndex, 1)
  } else {
    comment.likes.push({user: user._id.toString()})
  }
  photo.comment.map((c, i) => {
    if(c._id.toString() === cid) {
      photo.comment[i] = comment
    }
  })
  await util.auxSave(photo, 'Comment failed, please try again.', next)

  const resComment = {
    content: comment.content,
    likes: comment.likes,
    createcomment: comment.createcomment,
    user: user,
    user_uid: uid,
    _id: comment._id
  }

  res.json({ photo: resComment })
}

exports.addComment = addComment
exports.deleteComment = deleteComment
exports.likeComment = likeComment
