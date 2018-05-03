var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/authentication');
var User = require('../models/Users');
var UserDetails = require('../models/UserDetails');

module.exports = function(passport) {
  router.post('/public', isAuthenticated, function(req, res) {
    var userId = req.body.userId;
    var updateObject = req.body;
    delete updateObject.userId;

    User.findOne({ _id: userId }, function(err, user) {
      if (err) {
        return res.json({ error: err });
      } else if (!user) {
        return res.json({ error: 'User ' + userId + 'does not exist' });
      } else {
        UserDetails.findOneAndUpdate(
          { username: user.username },
          updateObject,
          { new: true },
          function(err, userDetail) {
            if (err) {
              return res.json({ error: err });
            } else if (!userDetail) {
              return res.json({ error: 'UserDetail does not exist' });
            } else {
              return res.json({
                user: user,
                userDetail: userDetail,
                message: 'Successfully updated user details'
              });
            }
          }
        );
      }
    });
  });

  router.post('/personal', isAuthenticated, function(req, res) {
    var userId = req.body.userId;
    var updateObject = req.body;
    delete updateObject.userId;
    console.log(updateObject);

    User.findByIdAndUpdate(userId, updateObject, { new: true }, function(
      err,
      user
    ) {
      if (err) {
        return res.json({ error: err });
      } else if (!user) {
        return res.json({ error: 'User ' + userId + 'does not exist' });
      } else {
        // once loop is done, retrieve the userDetails again
        return UserDetails.findOne({ username: user.username }, function(
          err,
          userDetail
        ) {
          if (err) {
            return res.json({ error: err });
          } else if (!userDetail) {
            return res.json({ error: 'UserDetail does not exist' });
          } else {
            return res.json({
              user: user,
              userDetail: userDetail,
              message: 'Successfully updated user personal details'
            });
          }
        });
      }
    });
  });
  return router;
};
