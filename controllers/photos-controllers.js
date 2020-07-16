const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')

const getPhotos = (req, res, next) => {
  res.json({photos: 'get photos'})
}

const createArt = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(new HttpError('Invalid inputs passe, please check your data.', 422))
  }

  const {
    title,
    description,
    thumbnail,
    original_img,
    tags,
    download,
    creator
  } = req.body

  let user;
  try {
    user = await User.findOne({ uid: creator }).exec()
  } catch(error) {
    const err = new HttpError('Creating Art failed, please try again.', 500)
    return next(err)
  }

  const createdPhoto = new Photo({
    title,
    description,
    thumbnail,
    original_img,
    tags,
    download,
    favorited: [],
    comment: [],
    sell: false,
    creator: user._id,
  })

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdPhoto.save({ session: sess })
    user.arts.push(createdPhoto)
    await user.save({ session: sess })
    await sess.commitTransaction()
  } catch(error) {
    console.log(error)
    const err = new HttpError('Creating Art failed, please try again.', 500)
    return next(err)
  }

  res.status(201).json({photo: createdPhoto})
}

exports.getPhotos = getPhotos
exports.createArt = createArt
