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
        // looks through every key/value pair on update object, saves each to userDetails
        var loopAndSave = () => {
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
        };
        async function saveThenSendBack() {
          await loopAndSave();
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
      }
    });
  });

  router.post('/personal', isAuthenticated, function(req, res) {
    var userId = req.body.userId;
    var updateObject = req.body;
    delete updateObject.userId;
    console.log(updateObject);

    User.findOne({ _id: userId }, function(err, user) {
      if (err) {
        return res.json({ error: err });
      } else if (!user) {
        return res.json({ error: 'User ' + userId + 'does not exist' });
      } else {
        // looks through every key/value pair on update object, saves each to user
        var loopAndSave = () => {
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
        };
        async function updateThenSendBack() {
          await loopAndSave();
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

        updateThenSendBack();
      }
    });
  });
  return router;
};
