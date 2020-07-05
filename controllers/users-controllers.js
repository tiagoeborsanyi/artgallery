const HttpError = require('../models/http-error')
const User = require('../models/user')

const getUsers = (req, res, next) => {
  res.json({user: 'get user'})
}

const signup = (req, res, next) => {

}

const login = (req, res) => {

}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
