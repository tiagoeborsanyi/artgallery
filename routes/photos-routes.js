const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({ photos: 'return some photos... '})
})

module.exports = router
