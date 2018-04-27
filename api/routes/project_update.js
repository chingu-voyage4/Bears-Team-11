var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/authentication');
var Project = require('../models/Projects');
var Tags = require('../models/Tags');
var User = require('../models/Users');

module.exports = function(passport) {
  // update project
  router.post('/update/:id', isAuthenticated, function(req, res) {
    console.log('_id=' + req.params.id);
    var projectId = req.params.id;
    var updateBody = req.body;
    delete updateBody._id;
    delete updateBody.images;

    Project.findOne({ _id: projectId }, function(err, project) {
      if (err) {
        return res.json({ error: err });
      } else if (!project) {
        return res.json({ error: 'Project does not exist: ' + err });
      } else {
        console.log('looping through updateBody');
        // loop through every key/value pair on updateBody, saves each to userDetails
        var updateEachKey = () => {
          for (var key in updateBody) {
            Project.findByIdAndUpdate(
              projectId,
              { [key]: updateBody[key] },
              { new: true },
              function(err, updatedObject) {
                if (err || !updatedObject) {
                  return res.json({
                    error: 'Could not update project: ' + err
                  });
                }
              }
            );
          }
        };
        async function updateThenReturn() {
          await updateEachKey();

          await Project.findById(projectId, function(err, project) {
            if (err || !project) {
              return res.json({ error: 'Error in retrieving project: ' + err });
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
          });
        }

        updateThenReturn();
      }
    });
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
