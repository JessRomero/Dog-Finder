const express = require('express')
const router = express.Router()
const activitiesCtrl = require('../controllers/activities')
const isLoggedIn = require('../config/auth')

router.get('/activities/new', isLoggedIn, activitiesCtrl.new)
router.post('/activities', activitiesCtrl.create)
// router.delete('/activities', activitiesCtrl.delete)

module.exports = router