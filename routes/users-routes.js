const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')
const userController = require('../controllers/users-controllers')

router.get('/', checkAuth, userController.getUsers)

router.post('/signupOrLogin', userController.signupOrLogin)

router.get('/userbyid/:userId', userController.getUserById)

router.get('/followers', userController.getFollowers)

router.get('/following', userController.getFollowing)

router.get('/favorites', userController.getFavorites)

module.exports = router
