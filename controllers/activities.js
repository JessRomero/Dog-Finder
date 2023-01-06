const Activity = require('../models/activity')
const Dog = require('../models/dog')

module.exports = {
    new: newActivity,
    create,
}

function create(req, res) {
    Activity.create(req.body, function (err, activity) {
        res.redirect('/activities/new');
    });
}

function newActivity(req, res) {
    Activity.find({}, function(err, activities) {
        res.render('activities/new',
            {title: 'Activities',
            activities
        });
    });
}

