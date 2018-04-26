var express = require('express');
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws_secret = require('../utils/s3_config.json');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.update(aws_secret);
var s3 = new AWS.S3();
var Project = require('../models/Projects');
var User = require('../models/Users');
var UserDetails = require('../models/UserDetails');
const app = express();

router.post('/project', function(req, res, next) {
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/project/' + req.query.projectId,
      metadata: function(req, file, cb) {
        console.log('req=' + req);
        console.log('file=' + file);
        cb(null, { fieldName: file.fieldname });
      },
      key: function(req, file, cb) {
        var name = Date.now().toString();
        switch (file.mimetype) {
          case 'image/jpeg':
            name += '.jpeg';
            break;
          case 'image/png':
            name += '.png';
            break;
        }
        cb(null, name);
      }
    })
  });

  // .array uploads multiple images
  var uploadingHandler = upload.array('projectImages');

  uploadingHandler(req, res, function(err) {
    if (err) {
      console.log(err);
      res.json({ error: 'Error in uploading image: ' + err });
    } else {
      console.log(req.query.projectId);
      console.log('Uploaded project image successfully');

      var getListObject = new Promise(function(resolve, reject) {
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
          console.log(data.Contents);
          resolve(data.Contents);
        });
      });

      var geturlsArry = function(data) {
        return new Promise(function(resolve, reject) {
          var urls = [];

          for (var i = 0; i < data.length; i++) {
            var endpoint = 'https://project-match.s3.us-east-2.amazonaws.com/';
            urls.push(endpoint + data[i].Key);
            //   var urlParams = { Bucket: 'project-match', Key: data[i].Key };
            //   s3.getSignedUrl('getObject', urlParams, function (err, url) {
            //     if (err) {
            //       return reject(err);
            //     }
            //     urls.push(url);
            //   });
          }

          setTimeout(() => {
            if (urls.length == data.length) {
              resolve(urls);
            }
          }, 100);
        });
      };

      // calls async functions for
      getListObject
        .then(function(data) {
          geturlsArry(data).then(function(urls) {
            Project.findByIdAndUpdate(
              { _id: req.query.projectId },
              { images: urls },
              { new: true },
              function(err, project) {
                if (err) {
                  return res.json({ error: err });
                } else if (!project) {
                  return res.json({ error: 'Project not found' });
                } else {
                  res.json({
                    urls: urls,
                    project: project,
                    message:
                      'Successfully uploaded and saved project image URL to project'
                  });
                }
              }
            );
          });
        })
        .catch(function(err) {
          res.json({ error: err });
        });
    }
  });
});

// getListObject
//   .then(function (data) {
//     geturlsArry(data).then(function (urls) {
//       Project.findByIdAndUpdate(
//         { _id: req.query.projectId },
//         { images: urls },
//         { new: true },
//         function (err, project) {
//           if (err) {
//             return res.json({ error: err });
//           } else if (!project) {
//             return res.json({ error: 'Project not found' });
//           } else {
//             res.json({
//               urls: urls,
//               project: project,
//               message:
//                 'Successfully uploaded and saved project image URL to project'
//             });
//           }
//         }
//       );
//     });
//   })
//   .catch(function (err) {
//     res.json({ error: err });
//   });
//     }

router.post('/profile', function(req, res) {
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/profile',
      key: function(req, file, callback) {
        console.log('The file location is ' + file.location);
        callback(null, req.query.fileName + '.jpg');
      }
    })
  });

  var uploadingHandler = upload.single('profile');
  uploadingHandler(req, res, function(err) {
    if (err) {
      // file not uploaded to aws
      console.log(err);
      res.json({ error: 'Error in uploading image: ' + err });
    } else {
      console.log('succeessfully uploaded');
      var urlParams = {
        Bucket: 'project-match',
        Key: 'profile/' + req.query.userId
      };
      console.log(urlParams);
      s3.getSignedUrl('getObject', urlParams, function(err, url) {
        if (err) {
          res.json({ error: err.message });
        }
        User.findByIdAndUpdate(
          { _id: req.query.userId },
          { profileImage: url },
          { new: true },
          function(err, user) {
            if (err) {
              return res.json({ error: err });
            } else if (!user) {
              return res.json({ error: 'User not found' });
            } else {
              UserDetails.findOne({ username: user.username }, function(
                err,
                userDetail
              ) {
                if (err) {
                  return res.json({ error: err });
                } else if (!UserDetail) {
                  return res.json({ error: 'Could not find userDetail' });
                } else {
                  res.json({
                    url: url,
                    user: user,
                    userDetail: userDetail,
                    message:
                      'Successfully uploaded and saved profile image URL to project'
                  });
                }
              });
            }
          }
        );
      });
    }
  });
});

module.exports = router;
