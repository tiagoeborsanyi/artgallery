const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')

const getPhotos = (req, res, next) => {
  res.json({photos: 'get photos'})
}

const createArt = (req, res, nex) => {
  console.log(req.body)
  res.json({art: 'ok'})
}

exports.getPhotos = getPhotos
exports.createArt = createArt
