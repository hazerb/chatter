const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController')


router.post('/like', likeController.like)
router.post('/dislike', likeController.dislike)
router.post('/save', likeController.save)
router.get('/:id', likeController.isActioned)
router.delete('/notLike/:id/:ownerId', likeController.notLike)
router.delete('/notDislike/:id/:ownerId', likeController.notDislike)

module.exports = router
