var express = require('express');

var multer = require('multer');
var multerS3 = require('multer-s3');
// credentials from aws
var aws_secret = require('../utils/s3_config.json');
var router = express.Router();
var AWS = require('aws-sdk');

AWS.config.update(aws_secret);
var s3 = new AWS.S3();

var Projects = require('../models/Projects');
var User = require('../models/Users');
var UserDetails = require('../models/UserDetails');
var Revisions = require('../models/Revisions');
/**
 * FOR USER
 */
// Saves image to the /profile folder in the 'project-match' bucket
// usage is post to /api/upload/profile?userName=USERNAME
// Html form should contain the image key "image"
/**
 * Retruns imageUrl if success
 * {
    "imageURL": "https://project-match.s3.amazonaws.com/profile/chingu2"
}
 */
router.post('/profile', function(req, res) {
  console.log('Posting to profile');
  let fileName = req.query.userName;
  console.log(fileName);
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/profile',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function(req, file, cb) {
        cb(null, fileName);
      }
    })
  });

  var uploadingHandler = upload.single('image');
  uploadingHandler(req, res, function(err) {
    if (err) {
      // file not uploaded to aws
      console.log(err);
      return res.json({
        error: 'Profile Image Upload not successfull ' + err.message
      });
    } else {
      console.log('Successfully uploaded profile pic');
      User.findOneAndUpdate(
        {
          username: req.query.userName
        },
        {
          profileImage: req.file.location
        },
        {
          new: true
        },
        function(err, user) {
          if (err || !user) {
            return res.json({
              error: 'Error in saving image urls to user: ' + err
            });
          } else {
            UserDetails.findOne(
              {
                username: user.username
              },
              function(err, userDetail) {
                if (err || !userDetail) {
                  return res.json({
                    error: 'Error in retreiving userDetails'
                  });
                } else {
                  return res.json({
                    user: user,
                    userDetail: userDetail,
                    imageURL: req.file.location,
                    message: 'Successfully saved profile image'
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

// NOTE: Should have "projectId"
router.post('/project', function(req, res) {
  console.log('Posting to project');
  let fileName = req.query.projectId;
  console.log(fileName);
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/project',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function(req, file, cb) {
        cb(null, fileName);
      }
    })
  });

  var uploadingHandler = upload.single('image');
  uploadingHandler(req, res, function(err) {
    if (err) {
      // file not uploaded to aws
      console.log(err);
      return res.json({
        error: 'Image Upload not successfull ' + err.message
      });
    } else {
      console.log('Successfully uploaded project image');
      Projects.findByIdAndUpdate(
        req.query.projectId,
        {
          images: [req.file.location]
        },
        {
          new: true
        },
        function(err, project) {
          if (err || !project) {
            return res.json({
              error: 'Error in saving image urls to project: ' + err
            });
          } else {
            return res.json({
              project: project,
              imageURL: req.file.location,
              message: 'Successfully saved project image'
            });
          }
        }
      );
    }
  });
});

// NOTE: Should have "revisionId"
router.post('/revision', function(req, res) {
  console.log('Posting to revision');

  var revision = new Revisions({
    revisionNumber: req.body.revisionNumber,
    finalVersion: req.body.finalVersion,
    imageURL: '',
    creator: req.body.creator,
    description: req.body.description
  });

  revision.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      let fileName = revision._id.toString();

      console.log('type of filename', typeof fileName);

      var upload = multer({
        storage: multerS3({
          s3: s3,
          bucket: 'project-match/revision',
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: function(req, file, cb) {
            console.log('file:', file);
            cb(null, fileName);
          }
        })
      });

      var uploadingHandler = upload.single('image');
      uploadingHandler(req, res, function(err) {
        if (err) {
          // file not uploaded to aws
          return res.send({
            error: 'Image Upload not successfull ' + err.message
          });
        } else {
          Revisions.findByIdAndUpdate(
            revision._id,
            {
              imageURL: req.file.location
            },
            {
              new: true
            },
            function(err, revision) {
              if (err || !revision) {
                res.json({
                  error: 'Error in uploading revision images: ' + err
                });
              } else {
                return res.json({
                  revision: revision,
                  imageURL: req.file.location,
                  message: 'Successfully saved revision image'
                });
              }
            }
          );
        }
      });
    }
  });
});

module.exports = router;
