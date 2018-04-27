var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var isAuthenticated = require('../utils/authentication');
var mongoosePaginate = require('mongoose-paginate');
var Project = require('../models/Projects');
var Tags = require('../models/Tags');
var Categories = require('../models/Categories');
var UserDetails = require('../models/UserDetails');
var Comment = require('../models/COmments');
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
          { name: { $regex: queryToRegex } },
          { description: { $regex: queryToRegex } },
          { category: { $regex: queryToRegex } },
          { tags: { $regex: queryToRegex } }
        ]
      });
    }

    console.log(JSON.stringify(query));
    console.log(options);
    Project.paginate(
      query === undefined || query === {} ? {} : query,
      options,
      function(err, result) {
        if (err) {
          return res.json({ error: 'Error retrieving project: ' + err });
        } else {
          res.json({
            projects: result,
            message: 'Succesfully retrieved projects'
          });
        }
      }
    );
  });

  router.get('/tags', function(req, res) {
    // retrieve all items in the tags collection. receive tagName and array of projects involved
    return Tags.find({}, function(err, tags) {
      if (err) {
        return res.json({ error: 'Error getting tags: ' + err });
      } else {
        return res.json({ tags: tags, message: 'Successfully retrieved tags' });
      }
    });
  });

  router.get('/categories', function(req, res) {
    // retrieve all items in the categories collection. receive tagName and array of projects involved
    return Categories.find({}, function(err, categories) {
      if (err) {
        return res.json({ error: 'Error getting categories: ' + err });
      } else {
        return res.json({
          categories: categories,
          message: 'Successfully retrieved categories'
        });
      }
    });
  });

  router.get('/tags/setup', function(req, res) {
    var tagArray = [
      'web app',
      'mobile app',
      'machine learning',
      'data science',
      'finances',
      'food',
      'budgeting',
      'bot',
      'travel',
      'portfolio',
      'mockups',
      'collaboration',
      'weather',
      'chrome extension',
      'anime',
      'chingu',
      'landing page',
      'music',
      'chat',
      'fitness',
      'game'
    ];

    saveNewTag = tagName => {
      var newTag = new Tags({ tagName: tagName });
      newTag.save(function(err) {
        if (err) {
          console.log('Error in saving tag: ' + err);
        }
      });
    };

    async function mapThenSaveTags() {
      await tagArray.map(tag => {
        saveNewTag(tag);
      });
      return Tags.find({}, function(err, tags) {
        if (err || !tags) {
          res.json({ error: 'Error in saving and retrieving tags: ' + err });
        } else {
          res.json({ tags: tags, message: 'Successfully saved batch tags' });
        }
      });
    }

    mapThenSaveTags();
  });

  router.get('/categories/setup', function(req, res) {
    var categoryArray = [
      'Educational',
      'Fun',
      'News & Weather',
      'Search Tools',
      'Shopping',
      'Social & Communication',
      'Sports',
      'Non-Profit',
      'Developer Tools',
      'Design Tools',
      'Productivity'
    ];

    saveNewCategories = categoryName => {
      var newCategory = new Categories({ categoryName: categoryName });
      newCategory.save(function(err) {
        if (err) {
          res.json({ error: 'Error in saving category: ' + category });
        }
      });
    };

    async function mapThenSaveCategories() {
      await categoryArray.map(category => {
        saveNewCategories(category);
      });

      Categories.find({}, function(err, categories) {
        if (err || !categories) {
          res.json({
            error: 'Error in saving and retrieving categories: ' + err
          });
        } else {
          res.json({
            categories: categories,
            message: 'Successfully saved batch categories'
          });
        }
      });
    }

    mapThenSaveCategories();
  });

  // retrieves project by id
  router.get('/:id', function(req, res) {
    Project.findOne({ _id: req.params.id }, function(err, project) {
      if (err || !project) {
        res.json({ error: 'Error in retrieving project: ' + err });
      } else {
        res.json({
          message: 'Successfully retrieved project',
          project: project
        });
      }
    });
  });

  // add projects
  router.post('/add', isAuthenticated, function(req, res) {
    // create new project
    console.log(req.body);
    var newProject = new Project();

    newProject.name = req.body.name;
    newProject.description = req.body.description;
    newProject.dueDate = req.body.dueDate;
    newProject.team = req.body.team;
    newProject.githubLink = req.body.githubLink;
    newProject.mockupLink = req.body.mockupLink;
    newProject.liveLink = req.body.liveLink;
    newProject.lookingFor = req.body.lookingFor;
    newProject.status = req.body.status;
    newProject.category = req.body.category;
    newProject.tags = req.body.tags;
    newProject.contact = req.body.contact;
    newProject.creator = req.body.creator;

    newProject.save(function(err, project) {
      if (err) {
        res.json({ error: 'Error in saving project: ' + err });
      } else {
        // check through array of tags and save new ones in collection
        if (project.tags) {
          project.tags.forEach(tag => {
            saveTag(tag);
          });
        }
        console.log('New project saved successfully=' + project);
        res.json({
          message: 'New project saved successfully',
          newProject: project
        });
      }
    });
  });

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
  // delete a single project by id
  router.delete('/delete', isAuthenticated, function(req, res) {
    console.log('id=' + req.body.id);

    console.log('deleting project');
    Project.findByIdAndRemove(req.body.id, function(err, project) {
      if (err || !project) {
        res.json({ error: 'Error in deleting project: ' + err });
      } else {
        Project.find({}, function(err, projects) {
          if (err || !projects) {
            res.json({ error: 'Error in finding projects: ' + err });
          } else {
            res.json({
              message: 'Project successfully deleted',
              project: projects
            });
          }
        });
      }
    });
  });

  // get team thumbnails
  router.get('/:id/team/thumbnails', function(req, res) {
    UserDetails.find({ projects: { $in: [req.params.id] } }, function(
      err,
      userDetails
    ) {
      if (err) {
        console.log(err);
      } else {
        var usernames = userDetails.map(userdetail => {
          return userdetail.username;
        });
        User.find({ username: { $in: usernames } }, function(err, user) {
          if (err) {
            console.log(err);
          } else {
            var thumbnailsURLs = user.map(data => {
              return data.profileImage;
            });
            res.json({
              message: 'Team successfully found for project ' + req.params.id,
              thumbnailsURLs
            });
          }
        });
      }
    });
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
          message: 'Comment successfully added to project ' + req.params.id
        });
      }
    });
  });

  // get comments for a project
  router.get('/:id/comments', function(req, res) {
    Comment.find({ project: req.params.id }, function(err, comments) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: 'Comment successfully retreived for poject ' + req.params.id,
          comments
        });
      }
    });
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
    Revision.find({ project: req.params.id }, function(err, revisions) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message:
            'Revisions successfully retrieved for project ' + req.params.id,
          revisions
        });
      }
    });
  });

  // TODO: Add authorization and validation
  // add marker to a revision
  router.post('/:id/revision/:revisionId/marker', function(req, res) {
    var marker = new Marker({
      type: req.body.type,
      creator: req.body.username,
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
            'Marker successfully added to revision ' + req.params.revisionId
        });
      }
    });
  });

  // get markers for revisions
  router.get('/:id/revision/:revisionId/markers', function(req, res) {
    Marker.find({ revision: req.params.revisionId }, function(err, markers) {
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
    });
  });

  // TODO: Add authorization and validation
  // add comment to marker
  router.post('/:id/revision/:revisionId/marker/:markerId/comment', function(
    req,
    res
  ) {
    var comment = new Comment({
      creator: req.body.username,
      comment: req.body.comment,
      marker: req.params.markerId
    });

    comment.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: 'Comment successfully added to marker ' + req.params.markerId
        });
      }
    });
  });

  // get comments for a marker
  router.get('/:id/revision/:revisionId/markers/:markerId/comments', function(
    req,
    res
  ) {
    Comment.find({ marker: req.params.markerId }, function(err, comments) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message: 'Comment successfully retreived for marker ' + req.params.id,
          comments
        });
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
