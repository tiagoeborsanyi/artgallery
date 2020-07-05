const HttpError = require('../models/http-error')
const User = require('../models/user')

const getUsers = async (req, res, next) => {
  console.log('req.uid: ', req.uid)
  let users;
  try {
    users = await User.find()
  } catch (error) {
    const err = new HttpError('Fetching users failed, please try again later.')
    return next(err)
  }
  res.json({ users: users.map(user => user.toObject({ getters: true }))})
}

const signupOrLogin = async (req, res, next) => {
  const { displayName, email, uid } = req.body
  let existingUser;
  try {
    existingUser = await User.findOne({ uid: req.uid })
  } catch (error) {

  }
}

exports.getUsers = getUsers
exports.signupOrLogin = signupOrLogin
