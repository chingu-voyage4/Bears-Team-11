var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/authentication');
var User = require('../models/Users');
var UserDetails = require('../models/UserDetails');
const { OAuth2Client } = require('google-auth-library');

module.exports = function(passport) {
  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.send('Welcome to the index page');
  });

  /* POST New User */
  router.post('/signup', function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
      if (err) {
        return next(err);
      } else if (!user) {
        return res.json({
          error: info.message
        });
      } else {
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          var newUserDetails = new UserDetails({
            _id: user._id,
            username: user.username
          });
          newUserDetails.save(function(err, userDetail) {
            if (err) {
              console.log('Error in saving newUserDetails: ' + err);
              throw err;
            }
            return res.json({
              user: user,
              userDetail: userDetail,
              message: info.message
            });
          });
        });
      }
    })(req, res, next);
  });

  /* Handle Login POST */
  router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
      if (err) {
        return res.json({
          error: err
        });
      }
      if (!user) {
        return res.json({
          message: info.message
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        UserDetails.findOne(
          {
            username: user.username
          },
          function(err, userDetail) {
            if (err) {
              return res.json({
                error: err
              });
            }
            return res.json({
              user: user,
              userDetail: userDetail,
              message: info.message
            });
          }
        );
      });
    })(req, res, next);
  });

  // GOOGLE LOGIN ROUTE
  router.post('/googlelogin', function(req, res) {
    const CLIENT_ID =
      '634604962663-247j6obodp1clln54de1469euufj6vdj.apps.googleusercontent.com';
    const client = new OAuth2Client(CLIENT_ID);

    let idToken = req.body.idToken;

    // https://developers.google.com/identity/sign-in/web/backend-auth
    // verify tokenID
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: CLIENT_ID
      });
      let payload = ticket.getPayload();
      let userid = payload['sub'];
      let email = payload['email'];
      let given_name = payload['given_name'];
      let family_name = payload['family_name'];
      let profilePic = payload['picture'];
      let username = given_name + '_' + family_name;

      let returnedObject = {
        userid: userid,
        email: email,
        given_name: given_name,
        family_name: family_name,
        profilePic: profilePic,
        username: username
      };
      return returnedObject;
    }
    // verify token ID
    verify()
      .then(function(googlePayload) {
        return User.findOne(
          {
            googleId: googlePayload.userid
          },
          function(err, user) {
            if (err) {
              return res.json({
                error: err
              });
            } else if (user) {
              // existing user , send back existing user data
              UserDetails.findOne(
                {
                  googleId: user.googleId
                },
                function(err, userDetail) {
                  if (err) {
                    return res.json({
                      error: err
                    });
                  } else if (userDetail) {
                    req.logIn(user, function(err) {
                      if (err) {
                        console.log(err);
                        return next(err);
                      }
                      return res.json({
                        user: user,
                        userDetail: userDetail,
                        message: 'Successfully logged in with Google'
                      });
                    });
                  }
                }
              );
            } else {
              // user not found, make new user and userDetails collection
              var newUser = new User();
              newUser.firstName = googlePayload.given_name;
              newUser.lastName = googlePayload.family_name;
              newUser.email = googlePayload.email;
              newUser.profileImage = googlePayload.profilePic;
              newUser.googleId = googlePayload.userid;
              newUser.username =
                googlePayload.given_name + '_' + googlePayload.family_name;

              // save the user
              newUser.save(function(err, user) {
                if (err) {
                  throw err;
                } else {
                  var newUserDetails = new UserDetails({
                    googleId: googlePayload.userid,
                    username: newUser.username,
                    _id: newUser._id
                  });

                  newUserDetails.save(function(err, userDetail) {
                    if (err) {
                      throw err;
                    }
                    // send back user and userDetails
                    req.logIn(user, function(err) {
                      if (err) {
                        return next(err);
                      }
                      return res.json({
                        user: user,
                        userDetail: userDetail,
                        message: 'Sucessfully registered with Google'
                      });
                    });
                  });
                }
              });
            }
          }
        );
      })
      .catch(console.error);
  });

  /* Handle Logout */
  router.get('/logout', function(req, res, next) {
    req.logout();
    res.json({
      message: 'Successfully Logged Out'
    });
  });

  router.get('/users', function(req, res) {
    return User.find({}, function(err, users) {
      if (err) {
        return res.json({
          error: 'Error in retrieving users: ' + err
        });
      } else {
        return res.json({
          users: users,
          message: 'Successfully retrieved all users'
        });
      }
    });
  });

  return router;
};
