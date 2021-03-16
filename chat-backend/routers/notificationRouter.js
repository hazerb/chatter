const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationController')

router.get('/', notificationController.getNotifications)
router.delete('/delete/:id', notificationController.deleteNotification)

module.exports = router
