const admin = require('firebase-admin')

const HttpError = require('../models/http-error')

module.exports = async (req, res, next) => {
  try {
    const adminCheckAuth = await admin.auth().verifyIdToken(req.body.idToken)
    if (adminCheckAuth) {
      // console.log(adminCheckAuth)
      req.uid = adminCheckAuth.uid
      next()
    }
  } catch (error) {
    const err = new HttpError('Invalid token', 403)
    return next(err)
  }
}
