const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const User = require('../models/user')
const Photo = require('../models/photo')
const util = require('./utils')

const favoritedArt = async (req, res, next) => {
  const { pid } = req.params
  const { uid } = req.body
  let user
  let photo

  user = await util.auxFind(User, {uid}, 'Favorited failed, for search user.', next)
  photo = await util.auxFind(Photo, {_id: pid}, 'Favorited failed, for search arte.', next)

  if (photo.favorited.filter(favorite => favorite.user.toString() === user._id.toString()).length > 0) {
    const removeIndex = photo.favorited.map(item => item.user.toString()).indexOf(user._id.toString())
    // tem que arrumar isso aqui pra quando for tirar a arte da coleção de fotos tem que tirar a arte do array de favoritados do usuario também
    // Tenho que acrecentar um campo na coleção de usuario dentro do array de favorites pra eu ter controler sobre esse array pra poder remover
    const removeIndexUser = user.favorites.map(item => item.art.toString()).indexOf(pid)
    console.log(removeIndexUser)
    photo.favorited.splice(removeIndex, 1)
    user.favorites.splice(removeIndexUser, 1)
  } else {
    photo.favorited.push({user: user._id.toString()})
    user.favorites.push({art: photo._id.toString()})
  }

  await util.auxSave(photo, 'Failed save arte favorite', next)

  await util.auxSave(user, 'Failed save art favorited for user', next)

  let newPhoto
  try {
    newPhoto = await Photo.findById(pid).populate('creator').populate('favorited.user', 'uid')
  } catch (error) {
    const err = new HttpError('Something whent weong, could not find a art.', 500);
    return next(err);
  }

  res.status(201).json({ photo: newPhoto.toObject({ getters: true }) })
}

exports.favoritedArt = favoritedArt
