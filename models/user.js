const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  displayName: { type: String, required: false },
  email: { type: String, required: true },
  uid: { type: String, required: false },
  avatar: { type: String, required: false },
  arts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Photo' }],
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }], // flollowers = seguidores
  following: [{ type: mongoose.Types.ObjectId, ref: 'User' }], // following = seguindo
  favorites: [{ type: mongoose.Types.ObjectId, ref: 'Photo' }],
  description: { type: String, required: false },
  createUser: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
