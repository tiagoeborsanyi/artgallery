const HttpError = require('../models/http-error')

const auxFind = async (obj, aux, message, next) => {
  try {
    return await obj.findOne(aux)
  } catch(error) {
    const err = new HttpError(message, 500)
    return next(err)
  }
}

const auxSave = async (obj, message, next) => {
  try {
    await obj.save()
  } catch(error) {
    const err = new HttpError(message, 500)
    return next(err)
  }
}

exports.auxFind = auxFind
exports.auxSave = auxSave
