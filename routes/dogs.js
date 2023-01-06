var express = require('express');
var router = express.Router();
const dogsCtrl = require('../controllers/dogs');
const isLoggedIn = require('../config/auth');


router.get('/', dogsCtrl.index);

router.get('/new', isLoggedIn, dogsCtrl.new);

router.get('/:id', dogsCtrl.show);

router.post('/', isLoggedIn, dogsCtrl.create);

router.post('/:id/activites', dogsCtrl.addToDog);

module.exports = router;
