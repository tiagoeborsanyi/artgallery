const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  photoURL: { type: String, required: false },
  uid: { type: String, required: true },
  followers: { type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] },
  following: { type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] },
  favorites: { type: mongoose.Types.ObjectId, require: false, ref: 'Photo' },
  description: { type: String, required: false },
  createUser: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
