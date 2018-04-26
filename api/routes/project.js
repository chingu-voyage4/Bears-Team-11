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
      var queryToRegex = new RegExp(query.searchTerm);
      query = {
        $or: [
          { name: { $regex: queryToRegex } },
          { description: { $regex: queryToRegex } },
          { category: { $regex: queryToRegex } },
          { tags: { $regex: queryToRegex } }
        ]
      };
    }

    console.log(query);
    console.log(options);
    Project.paginate(
      query === undefined || query === {} ? {} : query,
      options,
      function(err, result) {
        if (err) {
          return res.json({ message: 'Error retrieving project: ' + err });
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

  // retrieves project by id
  router.get('/:id', function(req, res) {
    Project.findOne({ _id: req.params.id }, function(err, project) {
      if (err || !project) {
        res.json({ message: 'Error in retrieving project: ' + err });
      } else {
        res.json({
          message: 'Successfully retrieved project',
          project: project
        });
      }
    });
  });

  // update project by id
  router.post('/update', isAuthenticated, function(req, res) {
    Project.findOneAndUpdate(
      { _id: req.body.id },
      { [req.body.updateKey]: req.body.updateObject, modifiedAt: new Date() },
      { new: true },
      function(err, project) {
        if (err || !project) {
          res.json({ message: 'Error in updating project: ' + err });
        } else {
          // search projectId in category and tags
          // if whats found doesnt match the updated category or tags array, then  pass to removeFunction

          res.json({
            project: project,
            message: 'Successfully updated project'
          });
        }
      }
    );
  });

  // add new projects
  router.post('/add', isAuthenticated, function(req, res) {
    console.log('received project object in route');

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
    newProject.images = req.body.images;
    newProject.contact = req.body.contact;
    newProject.creator = req.body.creator;

    newProject.save(function(err, project) {
      if (err) {
        res.json({ error: 'Error in saving project: ' + err });
      } else {
        // save to user projects
        addOrUpdateProjectInUser(newProject.creator, newProject._id);

        // save to each teammembers project list
        if (newProject.team) {
          newProject.team.forEach(function(user) {
            console.log(user);
            addOrUpdateProjectInUser(user, newProject._id);
          });
        }

        // find category
        if (newProject.category) {
          addOrUpdateCategories(newProject.category, newProject._id);
        }

        // for length of tags, find and add/update tags
        if (newProject.tags) {
          for (var i = 0; i < newProject.tags.length; i++) {
            addOrUpdateTags(newProject.tags[i], newProject._id);
          }
        }

        console.log('New project saved successfully=' + project);
        res.json({
          message: 'New project saved successfully',
          newProject: project
        });
      }
    });
  });

  // delete a single project by id
  router.post('/delete/one', isAuthenticated, function(req, res) {
    Project.findByIdAndRemove(req.body.id, function(err, project) {
      if (err || !project) {
        res.json({ message: 'Error in deleting project: ' + err });
      } else {
        res.json({ message: 'Project successfully deleted', project: project });
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

addOrUpdateTags = (tagName, projectId) => {
  Tags.findOne({ tagName: tagName }, function(err, tag) {
    if (err) {
      res.json({ error: 'Error in finding tags: ' + err });
    } else if (!tag) {
      // if tags does not exist, add new tag document. tagName and project id added to array
      var newTag = new Tags({ tagName: tagName, arrayOfProjectIds: projectId });
      console.log(newTag);
      newTag.save(function(err) {
        if (err) {
          res.json({ error: 'Error in saving tag: ' + err });
        }
      });
    } else {
      // if tag exists, only push projectId if it doesnt exist already
      if (tag.arrayOfProjectIds.indexOf(projectId) === -1) {
        var newArray = Array.from(tag.arrayOfProjectIds);
        newArray.push(projectId);
        tag.arrayOfProjectIds = newArray;

        tag.save(function(err, tag) {
          if (err) {
            console.log('Error in add/update projectId in tag');
          } else {
            console.log(
              'Project successfully added/updated projectid from tag array: ' +
                tag
            );
          }
        });
      }
    }
  });
};

removeProjectInTags = (tagName, projectId) => {
  Tags.findOne({ tagName: tagName }, function(err, tag) {
    if (err || !tag) {
      res.json({ message: 'Error in finding tag: ' + err });
    } else {
      var copyOfArray = Array.from(tag.arrayOfProjectIds);

      var projectIndexToDelete = copyOfArray.findIndex(projectId);
      tag.arrayOfProjectIds = copyOfArray.splice(projectIndexToDelete, 1);

      tag.save(function(err, tag) {
        if (err) {
          console.log('Error in removing projectId in tag');
        } else {
          console.log(
            'Project successfully removing projectid from tag array: ' + tag
          );
        }
      });
    }
  });
};

addOrUpdateCategories = (categoryName, projectId) => {
  Categories.findOne({ categoryName: categoryName }, function(err, category) {
    if (err) {
      res.json({ error: 'Error in finding category: ' + err });
    } else if (!category) {
      // if category does not exist, add to categoryName, add this projectId to array
      var newCategory = new Categories({
        categoryName: categoryName,
        arrayOfProjectIds: projectId
      });
      console.log(newCategory);
      newCategory.save(function(err) {
        if (err) {
          res.json({ error: 'Error in saving category: ' + err });
        }
      });
    } else {
      // if already exists , only push projectId if it doesnt exist already
      if (category.arrayOfProjectIds.indexOf(projectId) === -1) {
        var newArray = Array.from(category.arrayOfProjectIds);
        newArray.push(projectId);
        category.arrayOfProjectIds = newArray;
        category.save(function(err, category) {
          if (err) {
            console.log('Error in add/update projectId in category');
          } else {
            console.log(
              'Project successfully added/updated projectid from category array: ' +
                category
            );
          }
        });
      }
    }
  });
};

addOrUpdateProjectInUser = (username, projectId) => {
  UserDetails.findOne({ username: username }, function(err, userDetail) {
    if (err) {
      console.log('Error in finding user: ' + err);
    } else if (!userDetail) {
      console.log('UserDetail does not exist');
    } else {
      // if already exists , only push projectId if it doesnt exist already
      console.log(JSON.stringify(userDetail));
      if (userDetail.projects.indexOf(projectId) === -1) {
        var newArray = [...userDetail.projects, projectId];
        userDetail.projects = newArray;
        userDetail.save(function(err) {
          if (err) {
            console.log('Error in adding projectId to UserDetails: ' + err);
          }
        });
      }
    }
  });
};

removeProjectInCategory = (categoryName, projectId) => {
  Categories.findOne({ categoryName: categoryName }, function(err, category) {
    if (err || !category) {
      res.json({ message: 'Error in finding category: ' + err });
    } else {
      var copyOfArray = Array.from(category.arrayOfProjectIds);

      var projectIndexToDelete = copyOfArray.findIndex(projectId);
      category.arrayOfProjectIds = copyOfArray.splice(projectIndexToDelete, 1);

      category.save(function(err, category) {
        if (err) {
          console.log('Error in removing project in category');
        } else {
          console.log(
            'Project successfully removed project from category array: ' +
              category
          );
        }
      });
    }
  });
};
