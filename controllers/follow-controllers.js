const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')
const util = require('./utils')

const followHandler = (obj, typeFollow, idFollow) => {
  if (obj[typeFollow].filter(flw => flw.uid === idFollow).length > 0) {
    const removeIndex = obj[typeFollow].map(item => item.uid.toString()).indexOf(idFollow)
    obj[typeFollow].splice(removeIndex, 1)
    return obj
  } else {
    obj[typeFollow].push({
      user: obj._id.toString(),
      uid: idFollow
    })
    return obj
  }
}

const follow = async (req, res, next) => {
  const { uidFollow, uidFollowed } = req.body
  let userFollow
  let userFollowed

  userFollow = await util.auxFind(User, {uid: uidFollow}, 'Comment failed, for search user.', next)
  userFollowed = await util.auxFind(User, {uid: uidFollowed}, 'Comment failed, for search user.', next)

  const newFollow = followHandler(userFollow, 'followers', uidFollowed)
  const newFollowed = followHandler(userFollowed, 'following', uidFollow)

  await util.auxSave(newFollow, 'follow failed, please try again.', next)
  await util.auxSave(newFollowed, 'followed failed, please try again.', next)

  res.status(201).json({follow: newFollow, followed: newFollowed})

}

exports.follow = follow
