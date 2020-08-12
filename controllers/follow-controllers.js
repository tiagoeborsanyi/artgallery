const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')
const util = require('./utils')

const follow = async (req, res, next) => {
  const { uidFollow, uidFollowed } = req.body
}

exports.follow = follow
