const Activity = require('../models/activity')
const Dog = require('../models/dog')

module.exports = {
    new: newActivity,
    create,
    selectBreed
}

function create(req, res) {
    const s = req.body.born;
    req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
    Activity.create(req.body, function (err, activity) {
        res.redirect('/activities/new');
    });
}

function newActivity(req, res) {
    Activity.find({}, function (err, activities) {
        res.render('activities/new', {
            title: 'Add Activity',
            activities
        });
    })
}

function selectBreed(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        dog.breed.push(req.body.activityId)
        dog.save(function(err) {
            res.redirect(`/dogs/${dog._id}`)
        })
    })
}