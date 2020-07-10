const express = require('express')

const router = express.Router()
const photoController = require('../controllers/photos-controllers')

router.get('/', (req, res, next) => {
  res.json({ photos: 'return same photos... '})
})

router.post('/create-art', photoController.createArt)

module.exports = router
