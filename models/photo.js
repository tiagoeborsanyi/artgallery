const mongoose = require('mongoose')

const Schema = mongoose.Schema

const photoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  thumbnail: { type: String, required: false },
  original_img: { type: String, required: true },
  tags: { type: [String], required: false },
  download: { type: Boolean, required: true },
  create_date: { type: Date, default: Date.now },
  creator: { type: mongoose.Types.ObjectId, require: true, ref: 'User' }
})

module.exports = mongoose.model('Photo', photoSchema)
