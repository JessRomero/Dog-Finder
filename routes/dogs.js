var express = require('express');
var router = express.Router();
const dogsCtrl = require('../controllers/dogs');
const isLoggedIn = require('../config/auth');


router.get('/', dogsCtrl.index);

router.get('/new', isLoggedIn, dogsCtrl.new);

router.get('/:id', dogsCtrl.show);

router.get('/:id/edit', dogsCtrl.edit);

router.post('/', isLoggedIn, dogsCtrl.create);

router.post('/:id/activities', dogsCtrl.addToDog);

router.put('/:id', isLoggedIn, dogsCtrl.update);

router.delete('/:id', isLoggedIn, dogsCtrl.delete);

module.exports = router;
