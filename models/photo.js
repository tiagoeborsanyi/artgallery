const mongoose = require('mongoose')

const Schema = mongoose.Schema

const photoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  thumbnail: { type: String, required: false },
  original_img: [{ type: String, required: true }],
  tags: [String],
  download: { type: Boolean, required: true },
  favorited: [{
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
  }],
  comment: [{
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    user_uid: { type: String, required: true },
    content: { type: String, required: true},
    likes: [{
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      uid: { type: String, required: false}
    }],
    createcomment: { type: Date, default: Date.now }
  }],
  likes: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}],
  sell: { type: Boolean, required: false },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  createphoto: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Photo', photoSchema)
