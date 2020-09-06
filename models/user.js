const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  displayName: { type: String, required: false },
  email: { type: String, required: true },
  uid: { type: String, required: false },
  avatar: { type: String, required: false },
  arts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Photo' }],
  followers: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    uid: { type: String, required: false}
  }], // flollowers = seguidores
  following: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    uid: { type: String, required: false}
  }], // following = seguindo
  favorites: [{
    art: { type: mongoose.Types.ObjectId, ref: 'Photo' }
  }],
  description: { type: String, required: false },
  createUser: { type: Date, default: Date.now }
})

// Quando clicar em segui eu tenho que adicionar o uid da pessoa que cliquei em folloing no meu
// e adicionar meu uid no followers da pessoa que cliquei :)

module.exports = mongoose.model('User', userSchema)
