const express = require('express')
const router = express.Router()
const ideaController = require('../controllers/ideaController')


router.post('/add/:type', ideaController.addIdea)
router.get('/new/:topic/:count', ideaController.getNewIdea)
router.get('/own', ideaController.getOwnIdea)
router.get('/the/:id', ideaController.getTheIdea)
router.get('/saved', ideaController.getSavedIdea)
router.get('/liked', ideaController.getLikedIdea)


module.exports = router
