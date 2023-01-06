const Dog = require('../models/dog')

module.exports = {
    create,
    delete: deleteComment
}

function create(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
  
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;
  
      dog.comments.push(req.body);
      dog.save(function(err) {
        res.redirect(`/dogs/${dog._id}`);
      });
    });
  }


function deleteComment(req, res, next) {
  Dog.findOne({'comments._id': req.params.id}).then(function(dog) {
    const comment = dog.comments.id(req.params.id);
    if (!comment.user.equals(req.user._id)) return res.redirect(`/dogs/${dog._id}`);
    comment.remove();
    dog.save().then(function() {
      res.redirect(`/dogs/${dog._id}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}