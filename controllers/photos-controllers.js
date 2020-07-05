const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')

const getPhotos = (req, res, next) => {
  res.json({photos: 'get photos'})
}

exports.getPhotos = getPhotos
