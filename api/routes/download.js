var express = require('express');
var aws_secret = require('../utils/s3_config.json');
var AWS = require('aws-sdk');
var router = express.Router();
AWS.config.update(aws_secret);
var s3 = new AWS.S3();

// GET for profile image
//@parms should send "userName" as a query parameter
//@returns aws url
router.get('/profile', function(req, res) {
  console.log('got the request for profile');

  var urlParams = {
    Bucket: 'project-match',
    Key: 'profile/' + req.query.userName
  };
  console.log(urlParams);
  s3.getSignedUrl('getObject', urlParams, function(err, url) {
    if (err) {
      res.json({ error: err.message });
    }
    console.log('the url of the image is', url);
    res.json({ url: url, message: 'Successfully retrieved profile image URL' });
  });
});

// GET for project images
//@parms should send "projectId" as a query parameter
//@returns aws urls
router.get('/project', function(req, res) {
  console.log('got the request for project');

  var getListObject = new Promise(function(resolve, reject) {
    console.log('getListObject()');
    var params = {
      Bucket: 'project-match',
      Delimiter: '/',
      Prefix: 'project/' + req.query.projectId + '/'
    };
    s3.listObjects(params, function(err, data) {
      if (err) {
        console.log('got error');
        reject(err);
      }
      console.log('got data');
      resolve(data.Contents);
    });
  });

  var geturlsArry = function(data) {
    return new Promise(function(resolve, reject) {
      console.log('geturlsArry()');

      var urls = [];

      for (var i = 0; i < data.length; i++) {
        var urlParams = { Bucket: 'project-match', Key: data[i].Key };
        s3.getSignedUrl('getObject', urlParams, function(err, url) {
          if (err) {
            return reject(err);
          }
          //console.log('the url of the image is', url);
          urls.push(url);
        });
      }

      setTimeout(() => {
        if (urls.length == data.length) {
          resolve(urls);
        }
      }, 100);
    });
  };

  // calls asynch functions for
  getListObject
    .then(function(data) {
      geturlsArry(data).then(function(urls) {
        res.json({
          urls: urls,
          message: 'Successfully retrieved project image URL'
        });
      });
    })
    .catch(function(err) {
      res.json({ error: err });
    });
});

module.exports = router;
