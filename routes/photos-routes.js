const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({ photos: 'return same photos... '})
})

module.exports = router
