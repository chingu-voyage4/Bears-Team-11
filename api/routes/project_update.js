var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/authentication');
var Project = require('../models/Projects');
var Tags = require('../models/Tags');
var User = require('../models/Users');

module.exports = function(passport) {
  // update project
  router.post('/:id', isAuthenticated, function(req, res) {
    var projectId = req.params.id;
    var updateBody = req.body;
    updateBody.modifiedAt = Date.now();
    delete updateBody._id;
    delete updateBody.images;

    Project.findOneAndUpdate(
      { _id: projectId },
      updateBody,
      { new: true },
      function(err, project) {
        if (err) {
          return res.json({ error: err });
        } else if (!project) {
          return res.json({ error: 'Project does not exist: ' + err });
        } else {
          // check through array of tags and save new ones in collection
          if (project.tags) {
            project.tags.forEach(tag => {
              saveTag(tag);
            });
          }
          res.json({
            project: project,
            message: 'Project saved successfully'
          });
        }
      }
    );
  });

  return router;
};

saveTag = tagName => {
  Tags.findOne({ tagName: tagName }, function(err, tag) {
    if (err) {
      console.log('Error in retrieving tag: ' + err);
    } else if (!tag) {
      var newTag = new Tags({ tagName: tagName });
      newTag.save(function(err) {
        if (err) {
          console.log('Error in saving tag: ' + err);
        }
      });
    }
  });
};
