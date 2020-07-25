const express = require('express')
const { check } = require('express-validator')

const checkAuth = require('../middleware/check-auth')
const router = express.Router()
const photoController = require('../controllers/photos-controllers')
const likeController = require('../controllers/likes-controllers')
const commentsController = require('../controllers/comments-controllers')

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

// LIKE (auth route)
router.post('/like/:lid', likeController.like)

// FAVORITE (auth route)

// COMMENTS (auth routes)
router.post('/comment/:pid', commentsController.addComment)
router.delete('/comment/:pid/:cid', commentsController.deleteComment)

module.exports = router
