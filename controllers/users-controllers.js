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

const getUser = (req, res, next) => {

}

const signupOrLogin = async (req, res, next) => {
  const { displayName, avatar, email, uid } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (error) {
    const err = new HttpError('Signup failed, please try again later.', 500)
    return next(err)
  }

  if (existingUser) {
    res.status(201).json({ user: 'exist user, ok' })
  } else {
    const createUser = new User({
      displayName,
      email,
      uid,
      avatar,
      likes: [],
      arts: [],
      followers: [],
      following: [],
      favorites: []
    })
    try {
      await createUser.save()
    } catch (error) {
      console.log(error)
      const err = new HttpError('create user failed', 500)
      return next(err)
    }
    res.status(201).json({user: createUser.displayName, email: createUser.email})
  }
}

const getFollowers = (req, res, next) => {

}

const getFollowing = (req, res, next) => {

}

const getFavorites = (req, res, next) => {

}

exports.getUsers = getUsers
exports.getUser = getUser
exports.signupOrLogin = signupOrLogin
exports.getFollowers = getFollowers
exports.getFollowing = getFollowing
exports.getFavorites = getFavorites
