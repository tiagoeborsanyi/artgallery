const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')
const userController = require('../controllers/users-controllers')

router.get('/', checkAuth, userController.getUsers)

module.exports = router
