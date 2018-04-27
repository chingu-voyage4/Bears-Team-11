var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var UserDetail = require('../models/UserDetails');

router.get('/:username/profile/picture', function(req, res) {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) {
      res.status(404).send({
        error: 'Not Found'
      });
    } else {
      user.profileImage === ''
        ? res.json({ profileImage: 'http://via.placeholder.com/50x50' })
        : res.json({ profileImage: user.profileImage });
    }
  });
});

router.get('/:username/profile', function(req, res) {
  UserDetail.findOne({ username: req.params.username }, function(err, details) {
    console.log(details);
    if (err) {
      res.status(404).send({
        error: 'Not Found: ' + err
      });
    } else {
      res.json(details);
    }
  });
});

module.exports = router;
