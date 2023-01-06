const Activity = require('../models/activity')
const Dog = require('../models/dog')

module.exports = {
    new: newActivity,
    create,
    // delete: deleteActivity
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

// function deleteActivity(req, res, next) {
//     Activity.find({}, function(err, activities) {
//       if (!activity.user.equals(req.user._id)) return res.redirect(`/dogs/${dog._id}`);
//       activity.remove();
//       activity.save().then(function() {
//         res.redirect(`/dogs/${dog._id}`);
//       }).catch(function(err) {
//         return next(err);
//       });
//     });
//   }
