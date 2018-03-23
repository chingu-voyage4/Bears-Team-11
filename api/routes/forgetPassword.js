var express = require('express');
var router = express.Router();
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var User = require('../models/Users');


// TODO: Should be implemented 
router.get('/',function(req,res){
    res.send('Forget Password');
});

router.post('/', function(req,res){
    
    // To make async functions in the serease;
    async.waterfall([
        // this first method will create 20 char token
        function(done){
            crypto.randomBytes(20,function(err,buff){
                var token = buff.toString('hex');
                done(err,token);
            });
        },
        // saves token in the database
        function(token,done){
            User.findOne({email:req.body.email}, function(err,user){
                if(!user){
                    console.log("user is not present in the database");
                    done(err)
                }
                user.resetToken = token;
                // 30 min token expiration time;
                user.resetTokenExpires = Date.now() + 1800000 

                user.save(function(err){
                    console.log("Succeefully saved the token in the database")
                    done(err,token,user);
                });
            });
        },
        // sends password reset link with token to user email
        /**
         * NOTE: change the port & secure if we changed to secure HTTPS connection
         */
        function(token,user,done){
            // connect to mail provider with auth
            let smtpTransport = nodemailer.createTransport({
                host: 'smtp.sendgrid.net',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'apikey', // SendGrid Email api
                    pass: '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' // generated ethereal password
                }
              });

              // creates mail body
              /**  
               * NOTE: Change the text later
               */
              var mailOptions = {
                to: user.email,
                from: 'password@projectmatch.com',
                subject: 'Password Reset',
                text: 'You are receiving this because you  have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                  'http://' + req.headers.host + '/api' +'/reset/' + token + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
              };
              
              smtpTransport.sendMail(mailOptions,function(err){
                  console.log('email hasbeens sent to ' + user.email)
                  done(err,'done');
              });
        },
    ], function(err){
        // Handle the success or failure 
        if(err) return next(err);
        console.log('Password reset successfull');
        res.send('Password reset successfull');
    });
});
module.exports = router;