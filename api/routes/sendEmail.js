var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function(req, res) {
  let link = req.body.link;
  let to = req.body.email;
  let sender = req.body.user;
  let projectName = req.body.projectName;
  let projectId = req.body.projectId;
  let interestedParty = req.body.username;

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
    subject: 'Project Match - Join Request',
    text: `Hello,\n\nYou've got a request from ${sender} to join ${projectName}.\n\nYou can see their profile here: ${link}.\n\nTo accept the request, click: http://localhost:8080/api/projects/${projectId}/accept/${interestedParty}`
  };
  smtpTransport.sendMail(mailOptions, function(err) {
    if (err) {
      res.json({ error: err.message });
    }
    res.json('Success!');
  });
});

module.exports = router;
