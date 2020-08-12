const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')
const userController = require('../controllers/users-controllers')
const userFollow = require('../controllers/follow-controllers')

// ROTAS AUTENTICADAS
router.get('/', checkAuth, userController.getUsers)

router.post('/follow', userFollow.follow)

router.get('/favorites', userController.getFavorites)

// ROTAS NAO AUTENTICADAS
router.post('/signupOrLogin', userController.signupOrLogin)

router.get('/userbyid/:userId', userController.getUserById)

module.exports = router
