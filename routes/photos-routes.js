const express = require('express')
const router = express.Router()
const { check, body } = require('express-validator')

const checkAuth = require('../middleware/check-auth')
const checkInputs = require('../middleware/check-inputs')
const photoController = require('../controllers/photos-controllers')
const likeController = require('../controllers/likes-controllers')
const commentsController = require('../controllers/comments-controllers')


/*

  NOT LOGGED ROUTES

*/
// PHOTOS/IMAGES/ARTS
router.get('/', photoController.getPhotos)

router.post('/', photoController.filterFotosByTag)

router.get('/photobyid/:pid', photoController.getPhotoById)






/*

  AUTH ROUTES

*/
router.post(
  '/create-art',
  checkAuth,
  [
    check('title').not().isEmpty(),
    check('original_img').isArray({min: 1})
  ],
  checkInputs,
  photoController.createArt
  )

// LIKE (auth route)
router.post(
  '/like/:pid',
  checkAuth,
  [
    check('uid').not().isEmpty()
  ],
  checkInputs,
  likeController.like)

// FAVORITE (auth route)
// GET FAVORITES BY USER - ADD FAVIRITES BY USER
// router.get('/favorites/:pid')
// router.post()

// COMMENTS (auth routes)
router.post(
  '/comment/:pid',
  checkAuth,
  [
    check('uid').not().isEmpty(),
    check('content').not().isEmpty()
  ],
  checkInputs,
  commentsController.addComment)
router.delete(
  '/comment/:pid/:cid',
  checkAuth,
  [
    body('uid').not().isEmpty()
  ],
  checkInputs,
  commentsController.deleteComment)
router.post(
  '/comment/like/:pid/:cid',
  checkAuth,
  [
    check('uid').not().isEmpty()
  ],
  checkInputs,
  commentsController.likeComment)

module.exports = router
