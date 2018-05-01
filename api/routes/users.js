var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/authentication');
var User = require('../models/Users');
var UserDetail = require('../models/UserDetails');

module.exports = function(passport) {
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
    UserDetail.findOne({ username: req.params.username }, function(
      err,
      details
    ) {
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

  /* POST deactivate User */
  router.post('/deactivate', function(req, res, next) {
    passport.authenticate('deactivateUser', function(err, user, info) {
      if (err) {
        return res.json({ error: err });
      }
      if (!user) {
        return res.json({ message: info.message });
      }
      if (user) {
        User.findOneAndUpdate(
          { username: user.username },
          { status: false },
          function(err, user) {
            if (err) {
              res.json({ error: err });
            }
            return res.json({
              user: user,
              message: 'Successfully deactivated user'
            });
          }
        );
      }
    })(req, res, next);
  });

  /* POST re-activate User */
  router.post('/activate', isAuthenticated, function(req, res) {
    User.findOneAndUpdate(
      { username: req.user.username },
      { status: true },
      function(err, user) {
        // In case of any error, return using the done method
        if (err) {
          return res.json({ error: err });
        }
        return res.json({
          user: user,
          message: 'Successfully re-activated user'
        });
      }
    );
  });

  /* POST Delete User */
  router.post('/delete', function(req, res, next) {
    passport.authenticate('deleteUser', function(err, user, info) {
      if (err) {
        return res.json({ error: err });
      }
      if (!user) {
        return res.json({ message: info.message });
      }
      User.findOneAndRemove({ username: user.username }, function(err, user) {
        if (err) {
          return res.json({ error: err });
        }
        return res.json({ message: 'Successfully deleted user' });
      });
    })(req, res, next);
  });

  router.post('/update/public', isAuthenticated, function(req, res) {
    var userId = req.body.userId;
    var updateObject = req.body;
    delete updateObject.userId;

    User.findOne({ _id: userId }, function(err, user) {
      if (err) {
        return res.json({ error: err });
      } else if (!user) {
        return res.json({ error: 'User ' + userId + 'does not exist' });
      } else {
        // looks through every key/value pair on update object, saves each to userDetails
        for (var key in updateObject) {
          UserDetails.findOneAndUpdate(
            { username: user.username },
            { [key]: updateObject[key] },
            { new: true },
            function(err, userDetail) {
              if (err) {
                return res.json({ error: err });
              } else if (!userDetail) {
                return res.json({ error: 'UserDetail does not exist' });
              }
            }
          );
        }
        // once loop is done, retrieve the userDetails again (assured that all fields have been updated)
        UserDetails.findOne({ username: user.username }, function(
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
              message: 'Successfully updated user details'
            });
          }
        });
      }
    });
  });

  router.post('/update/personal', isAuthenticated, function(req, res) {
    var userId = req.body.userId;
    var updateObject = req.body;
    delete updateObject.userId;

    User.findOne({ _id: userId }, function(err, user) {
      if (err) {
        return res.json({ error: err });
      } else if (!user) {
        return res.json({ error: 'User ' + userId + 'does not exist' });
      } else {
        // looks through every key/value pair on update object, saves each to user
        for (var key in updateObject) {
          User.findOneAndUpdate(
            { _id: user._id },
            { [key]: updateObject[key] },
            { new: true },
            function(err, user) {
              if (err) {
                return res.json({ error: err });
              } else if (!user) {
                return res.json({ error: 'User does not exist' });
              }
            }
          );
        }
        // once loop is done, retrieve the userDetails again (assured that all fields have been updated)
        UserDetails.findOne({ username: user.username }, function(
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
