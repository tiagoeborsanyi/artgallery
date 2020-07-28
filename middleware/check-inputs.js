const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')

module.exports = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passe, please check your data.', 422))
  }
  next()
}
