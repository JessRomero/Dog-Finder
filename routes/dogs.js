var express = require('express');
var router = express.Router();
const dogsCtrl = require('../controllers/dogs');
const isLoggedIn = require('../config/auth');

// GET /movies - show all movied
router.get('/', dogsCtrl.index);

// GET /movies/new - new movie form
router.get('/new', isLoggedIn, dogsCtrl.new);

// GET /movies/id - show details of a single movie
router.get('/:id', dogsCtrl.show);

// POST /movies - add new movie
router.post('/', isLoggedIn, dogsCtrl.create);

module.exports = router;
