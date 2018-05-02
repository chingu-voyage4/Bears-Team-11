var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/authentication');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Project = require('../models/Projects');
var UserDetails = require('../models/UserDetails');
var Comment = require('../models/Comments');
var Revision = require('../models/Revisions');
var Marker = require('../models/Markers');
var User = require('../models/Users');

module.exports = function(passport) {
  // retrieves all projects
  router.post('/', function(req, res) {
    var query = req.body.query;
    var options = req.body.options;

    if (query && query.searchTerm) {
      var queryToRegex = new RegExp(query.searchTerm, 'i');
      query = delete query.searchTerm;
      query = Object.assign({}, query, {
        $or: [
          {
            name: {
              $regex: queryToRegex
            }
          },
          {
            description: {
              $regex: queryToRegex
            }
          },
          {
            category: {
              $regex: queryToRegex
            }
          },
          {
            tags: {
              $regex: queryToRegex
            }
          }
        ]
      });
    }

    // console.log(JSON.stringify(query));
    // console.log(options);
    Project.paginate(
      query === undefined || query === {} ? {} : query,
      options,
      function(err, result) {
        if (err) {
          return res.json({
            error: 'Error retrieving project: ' + err
          });
        } else {
          res.json({
            projects: result,
            message: 'Succesfully retrieved projects'
          });
        }
      }
    );
  });

  // retrieves project by id
  router.get('/:id', function(req, res) {
    Project.findOne(
      {
        _id: req.params.id
      },
      function(err, project) {
        if (err || !project) {
          res.json({
            error: 'Error in retrieving project: ' + err
          });
        } else {
          res.json({
            message: 'Successfully retrieved project',
            project: project
          });
        }
      }
    );
  });

  // get team thumbnails
  router.get('/:id/team/thumbnails', function(req, res) {
    UserDetails.find(
      {
        projects: {
          $in: [req.params.id]
        }
      },
      function(err, userDetails) {
        if (err) {
          console.log(err);
        } else {
          var usernames = userDetails.map(userdetail => {
            return userdetail.username;
          });
          User.find(
            {
              username: {
                $in: usernames
              }
            },
            function(err, user) {
              if (err) {
                console.log(err);
              } else {
                var thumbnailsURLs = user.map(data => {
                  return data.profileImage;
                });
                res.json({
                  message:
                    'Team successfully found for project ' + req.params.id,
                  thumbnailsURLs
                });
              }
            }
          );
        }
      }
    );
  });

  // TODO: Add authorization and validation
  // add comment to a project
  router.post('/:id/comment', function(req, res) {
    var comment = new Comment({
      creator: req.body.username,
      comment: req.body.comment,
      project: req.params.id
    });

    comment.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: 'Comment successfully added to project ' + req.params.id,
          comment
        });
      }
    });
  });

  // get comments for a project
  router.get('/:id/comments', function(req, res) {
    Comment.find(
      {
        project: req.params.id
      },
      function(err, comments) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            message:
              'Comment successfully retreived for poject ' + req.params.id,
            comments
          });
        }
      }
    );
  });

  // TODO: Add authorization and validation
  // add revision to project
  router.post('/:id/revision', function(req, res) {
    var revision = new Revision({
      revisionNumber: req.body.revisionNumber,
      finalVersion: req.body.finalVersion,
      imageURL: req.body.imageURL,
      creator: req.body.creator,
      description: req.body.description,
      project: req.params.id
    });

    revision.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: 'Revision successfully added to project ' + req.params.id
        });
      }
    });
  });

  // get revisions for a project
  router.get('/:id/revisions', function(req, res) {
    Revision.find(
      {
        project: req.params.id
      },
      function(err, revisions) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            message:
              'Revisions successfully retrieved for project ' + req.params.id,
            revisions
          });
        }
      }
    );
  });

  // get revision for a project
  router.get('/revision/:revisionId', function(req, res) {
    Revision.findOne(
      {
        _id: req.params.revisionId
      },
      function(err, revision) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            message:
              'Revision successfully retrieved for project ' + req.params.id,
            revision
          });
        }
      }
    );
  });

  // TODO: Add authorization and validation
  // add marker to a revision
  router.post('/revision/:revisionId/marker', function(req, res) {
    var marker = new Marker({
      type: req.body.type,
      creator: req.body.creator,
      revision: req.params.revisionId,
      x: req.body.x,
      y: req.body.y,
      width: req.body.width,
      height: req.body.height
    });

    marker.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message:
            'Marker successfully added to revision ' + req.params.revisionId,
          marker
        });
      }
    });
  });

  // delete marker
  router.delete('/revision/marker/:markerId', function(req, res) {
    console.log(req.params.markerId);
    Marker.findOneAndRemove(
      {
        _id: req.params.markerId
      },
      function(err, marker) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            message: `Marker ${req.params.markerId} successfully deleted`,
            marker
          });
        }
      }
    );
  });

  // get markers for revisions
  router.get('/revision/:revisionId/markers', function(req, res) {
    Marker.find(
      {
        revision: req.params.revisionId
      },
      function(err, markers) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            message:
              'Markers successfully retrieved for revision ' +
              req.params.revisionId,
            markers
          });
        }
      }
    );
  });

  // update marker
  // - position
  // - dimension
  // - reolvedness
  router.put('/revision/marker/:markerId', function(req, res) {
    Marker.findOneAndUpdate(
      {
        _id: req.params.markerId
      },
      req.body,
      { new: true },
      function(err, marker) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            message: `Marker ${req.params.markerId} successfully updated`,
            marker
          });
        }
      }
    );
  });

  // TODO: Add authorization and validation
  // add comment to marker
  router.post('/revision/marker/:markerId/comment', function(req, res) {
    var comment = new Comment({
      creator: req.body.creator,
      comment: req.body.comment,
      marker: req.params.markerId
    });

    comment.save(function(err) {
      console.log(req.body);
      console.log(comment);
      if (err) {
        console.log(err);
      } else {
        res.json({
          message:
            'Comment successfully added to marker ' + req.params.markerId,
          comment
        });
      }
    });
  });

  // get comments for a marker
  router.get('/revision/markers/:markerId/comments', function(req, res) {
    Comment.find(
      {
        marker: req.params.markerId
      },
      function(err, comments) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            message:
              'Comment successfully retreived for marker ' + req.params.id,
            comments
          });
        }
      }
    );
  });

  // join team
  router.get('/:projectId/accept/:username', function(req, res) {
    // add user to team
    Project.findByIdAndUpdate(
      req.params.projectId,
      {
        $push: {
          team: req.params.username
        }
      },
      function(err, project) {
        if (err) {
          console.log(err);
        } else {
          // add project to user
          UserDetails.findOneAndUpdate(
            { username: req.params.username },
            {
              $push: {
                projects: mongoose.Types.ObjectId(req.params.prpojectId)
              }
            },
            function(err, user) {
              if (err) {
                console.log(err);
              } else {
                res.status(200);
              }
            }
          );
        }
      }
    );
  });

  return router;
};
