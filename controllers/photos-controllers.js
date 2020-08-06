const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')

const getPhotos = (req, res, next) => {
  res.json({photos: 'get photos'})
}

const getPhotoById = async (req, res, next) => {
  const photoId = req.params.pid

  let photo
  try {
    photo = await Photo.findById(photoId).populate('creator').populate('likes.user').populate('comment.user')
  } catch (error) {
    const err = new HttpError('Something whent weong, could not find a art.', 500)
    return next(err)
  }

  if (!photo) {
    const err = new HttpError('Could not find a art for the provided id.', 404)
    return next(err)
  }
  res.status(201).json({ photo: photo.toObject({ getters: true }) })
}

const createArt = async (req, res, next) => {
  const {
    title,
    description,
    thumbnail,
    original_img,
    tags,
    download,
    link_download,
    creator
  } = req.body

  let user
  try {
    // Aqui eu tenho que pegar o uid de req.uid, que o middleware me retorna
    user = await User.findOne({ email: creator }).exec()
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
    link_download,
    favorited: [],
    comment: [],
    likes: [],
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
exports.getPhotoById = getPhotoById
exports.createArt = createArt
