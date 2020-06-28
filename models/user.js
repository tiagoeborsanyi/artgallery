const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  uid: { type: String, required: true },
  createUser: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
