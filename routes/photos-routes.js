const express = require('express')
const { check } = require('express-validator')

const checkAuth = require('../middleware/check-auth')
const router = express.Router()
const photoController = require('../controllers/photos-controllers')
const likeController = require('../controllers/likes-controllers')

router.get('/', (req, res, next) => {
  res.json({ photos: 'return same photos... '})
})

router.get('/photobyid/:pid', photoController.getPhotoById)

router.post(
  '/create-art',
  checkAuth,
  [
    check('title').not().isEmpty(),
    check('original_img').isArray({min: 1})
  ],
  photoController.createArt
  )

// LIKE
router.post('/like/:lid', likeController.like)


module.exports = router
