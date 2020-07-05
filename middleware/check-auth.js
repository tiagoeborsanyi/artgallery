const HttpError = require('../models/http-error')

module.exports = (req, res, next) => {
  console.log('passando pelo check-auth')
  return next()
}
