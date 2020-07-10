const mongoose = require('mongoose')

const Schema = mongoose.Schema

const photoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  thumbnail: { type: String, required: false },
  original_img: [{ type: String, required: true }],
  tags: [String],
  download: { type: Boolean, required: true },
  favorited: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  comment: { type: [{
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true},
    createcomment: { type: Date, default: Date.now }
  }], required: false },
  sell: { type: Boolean, required: false },
  creator: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
  createphoto: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Photo', photoSchema)
