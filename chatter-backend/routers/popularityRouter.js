const express = require('express')
const router = express.Router()
const popularityController = require('../controllers/popularityController')


router.get('/topics', popularityController.getTopic)
router.get('/users', popularityController.getUser)

module.exports = router
