const Dog = require('../models/dog')
const Activity = require('../models/activity');

module.exports = {
    index,
    show,
    new: newDog,
    create,
    addToDog,
    edit,
    update,
    delete: deleteDog
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
   
    const dog = new Dog(req.body)
    dog.save(function (err) {
        if (err) {
            return res.redirect('dogs/new')
        } 
        res.redirect(`/dogs`)
    })
}

function addToDog(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        dog.activity.push(req.body.activity)
        dog.save(function(err) {
            res.redirect(`/dogs/${dog._id}`)
        })
    })
}

function edit(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        res.render('dogs/edit', { title: 'Edit', dog})
    })
}

async function update(req, res, next) {
    try {
       const filter = {_id:req.params.id}
       let dog = await Dog.findOneAndUpdate(filter, { color: req.body.color })
       dog.save((err) => {return res.redirect(`/dogs/${dog._id}`)}) 
    } catch { (err) => {
        console.warn(err.message)
    }   
    }
}

function deleteDog(req, res) {
    Dog.findByIdAndDelete(req.params.id, function(err, dog) {
        res.redirect('/')
    })
}
