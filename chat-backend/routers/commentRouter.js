const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')


router.post('/add', commentController.addComment)
router.get('/:ideaId', commentController.getComment)

module.exports = router
