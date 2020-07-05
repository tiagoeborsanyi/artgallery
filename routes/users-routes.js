const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')
const userController = require('../controllers/users-controllers')
const { route } = require('./photos-routes')

router.get('/', checkAuth, userController.getUsers)

router.get('/uid', checkAuth, userController.getUser)

router.post('/signupOrLogin', userController.signupOrLogin)

router.get('/getFollowers', userController.getFollowers)

router.get('/following', userController.getFollowing)

router.get('favorites', userController.getFavorites)

module.exports = router
