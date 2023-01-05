const express = require('express')
const router = express.Router()
// You Do - Require the yet to be created reviews controller 
const commentsCtrl = require('../controllers/comments')

// You Do - Define the Route below
router.post('/dogs/:id/comments', commentsCtrl.create)

// You Do - Define the Route below
router.delete('/comments/:id', commentsCtrl.delete)

module.exports = router