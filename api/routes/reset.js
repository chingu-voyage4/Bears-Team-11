var express = require('express');
var router = express.Router();
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var User = require('../models/Users');

// This method will trigged after the user clicked the email link
router.get('/:token', function(req, res) {
  // console.log('token is ', req.params)
  // Checks if the token present and token not expired
  User.findOne(
    { resetToken: req.params.token, resetTokenExpires: { $gt: Date.now() } },
    function(err, user) {
      if (!user) {
        console.log('error', 'Password reset token is invalid or has expired.');
        return done({
          error: 'Password reset token is invalid or has expired.'
        });
      }
      // TODO: Should Create a reset page to give new password
      console.log({ user: user });
      res.send({ user: user });
    }
  );
});

// This will reset the password and sends the user conformation link
router.post('/:token', function(req, res) {
  //console.log('params are', req.params);
  async.waterfall(
    [
      function(done) {
        User.findOne(
          {
            resetToken: req.params.token,
            resetTokenExpires: { $gt: Date.now() }
          },
          function(err, user) {
            if (!user) {
              console.log(
                'error',
                'Password reset token is invalid or has expired.'
              );
              res.send({
                error: 'Password reset token is invalid or has expired.'
              });
            }

            user.password = req.body.password;
            user.resetToken = undefined;
            user.resetTokenExpires = undefined;
            // save the user
            user.save(function(err) {
              // TODO: Shuld be sent to home page after successfully logged in
              console.log('Changed password in the database');
              return done(err, user);
            });
          }
        );
      },
      function(user, done) {
        let smtpTransport = nodemailer.createTransport({
          host: 'smtp.sendgrid.net',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'apikey', // generated ethereal user
            pass:
              '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' // generated ethereal password
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'passwordreset@demo.com',
          subject: 'Your password has been changed',
          text:
            'Hello,\n\n' +
            'This is a confirmation that the password for your account ' +
            user.email +
            ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          res.send('Success! Your password has been changed.');
          done(err);
        });
      }
    ],
    function(err) {
      res.send('Password Reset is successfull');
    }
  );
});
module.exports = router;
