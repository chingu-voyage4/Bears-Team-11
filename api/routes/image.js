var express = require('express');

var  multer = require('multer');
var  multerS3 = require('multer-s3');
// credentials from aws
var aws_secret = require('../utils/s3_config.json');
var router = express.Router();
var AWS = require('aws-sdk');

AWS.config.update(aws_secret);
var s3 = new AWS.S3();

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
router.post('/profile', function (req,res) {
  console.log('Posting to profile');
  let fileName = req.query.userName;
  console.log(fileName);
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/profile',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, fileName);
      }
    })
  })

  var uploadingHandler = upload.single('image');
  uploadingHandler(req,res,function (err) {
    if(err){
      // file not uploaded to aws
      console.log(err);
      return  res.send({error: "Image Upload not successfull " + err.message});

    }else{
      console.log("succeefully uploaded");
      return res.send({imageURL: req.file.location});
    }
  })
});

// NOTE: Should have "projectId"
router.post('/project', function (req,res) {
  console.log('Posting to project');
  let fileName = req.query.projectId;
  console.log(fileName);
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/project',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, fileName);
      }
    })
  })

  var uploadingHandler = upload.single('image');
  uploadingHandler(req,res,function (err) {
    if(err){
      // file not uploaded to aws
      console.log(err);
      return  res.send({error: "Image Upload not successfull " + err.message});

    }else{
      console.log("succeefully uploaded");
      return res.send({imageURL: req.file.location});
    }
  })
});

// NOTE: Should have "revisionId"
router.post('/revision', function (req,res) {
  console.log('Posting to revision');
  let fileName = req.query.revisionId;
  console.log(fileName);
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/revision',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, fileName);
      }
    })
  })

  var uploadingHandler = upload.single('image');
  uploadingHandler(req,res,function (err) {
    if(err){
      // file not uploaded to aws
      console.log(err);
      return  res.send({error: "Image Upload not successfull " + err.message});

    }else{
      console.log("succeefully uploaded");
      return res.send({imageURL: req.file.location});
    }
  })
});

module.exports = router;
