const Dog = require('../models/dog')
const Activity = require('../models/activity');

module.exports = {
    index,
    show,
    new: newDog,
    create
}

function index(req, res) {
    Dog.find({}, function (err, dogs) {
        res.render('dogs/index', { title: 'Dog Finder', dogs })
    })
}

function show(req, res) {
    Dog.findById(req.params.id)
        .populate('breed')
        .exec(function (err, dogs) {
            // Performer.find({}).where('_id').nin(movie.cast) <-- Mongoose query builder
            // Native MongoDB approach
            Activity.find(
                { _id: { $nin: dog.breed } },
                function (err, activities) {
                    console.log(dog)
                    res.render('dogs/show', { title: 'Dog Information', dog, activities })
                }
            )
        })
}

function newDog(req, res) {
    res.render('dogs/new', { title: 'Add Dog' })
}

function create(req, res) {
    // convert nowShowing's checkbox of nothing or "on" to boolean
    req.body.addToList = !!req.body.addToList
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    const dog = new Dog(req.body)
    dog.save(function (err) {
        // one way to handle errors
        if (err) return res.redirect('dogs/new')
        console.log(dog)
        res.redirect(`/dogs/${dog._id}`)
    })
}