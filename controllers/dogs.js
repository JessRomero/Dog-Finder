const Dog = require('../models/dog')
const Activity = require('../models/activity');

module.exports = {
    index,
    show,
    new: newDog,
    create,
    addToDog
}

function index(req, res) {
    Dog.find({}, function (err, dogs) {
        res.render('dogs/index', { title: 'Dog Finder', dogs })
    })
}

function show(req, res) {
    Dog.findById(req.params.id)
        .populate('activity')
        .exec(function (err, dog) {
            Activity.find({}, function(err, activities){
                res.render('dogs/show', { title: 'Dog Information', dog, activities })
            })
        })
}

function newDog(req, res) {
    res.render('dogs/new', { title: 'Add Dog' })
}

function create(req, res) {
    req.body.user = req.user._id
    req.body.userName = req.user.user
    req.body.userAvatar = req.user.avatar
    // req.body.activity = !!req.body.activity
    // for (let key in req.body) {
    //     if (req.body[key] === '') delete req.body[key]
    // }
    const dog = new Dog(req.body)
    dog.save(function (err) {
        if (err) {
            return res.redirect('dogs/new')
        } 
        console.log(dog)
        res.redirect(`/dogs`)
    })
}

function addToDog(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        dog.activity = req.body.activity
        dog.save(function(err) {
            res.redirect(`/dogs/${dog._id}`)
        })
    })
}