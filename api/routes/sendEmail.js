var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* For sending projec join request to the creator of the project
// @params: link = user profile link, 
*  email: the senders email id
*  user: the name of the user who is senidng 
*  projectName: name of the project the uer requesting to join
*/
router.post('/', function (req, res) {
  
  let link = req.body.link;
  let to = req.body.email;
  let sender = req.body.user;
  let projectName = req.body.projectName;
  console.log(link, to, sender, projectName);

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
    to: to,
    from: 'join_request@projectmatch.me',
    subject: 'join request from Project Match',  
    text:
      'Hello,\n\n' +
      'You have got a request from ' + sender + ', to join in your  ' +  projectName  + '  project'+ '\n\n' +
      'You can see user profile by clicking the link below' + '\n' +
       link + '\n'
  };
  smtpTransport.sendMail(mailOptions, function(err) {
    if(err){
      res.json({error: err.message});
    }
    res.json('Success!');
    
  });

});

module.exports = router;