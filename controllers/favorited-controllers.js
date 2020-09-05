const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')

const favoritedArt = (req, res, next) => {
  res.json({favorited: 'favorites arts ok!!!'})
}

exports.favoritedArt = favoritedArt
