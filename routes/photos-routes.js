const express = require('express')
const { check } = require('express-validator')

const checkAuth = require('../middleware/check-auth')
const router = express.Router()
const photoController = require('../controllers/photos-controllers')

router.get('/', (req, res, next) => {
  res.json({ photos: 'return same photos... '})
})

router.get('/photobyid', photoController.getPhotoById)

router.post(
  '/create-art',
  checkAuth,
  [
    check('title').not().isEmpty(),
    check('original_img').isArray({min: 1})
  ],
  photoController.createArt
  )

module.exports = router
