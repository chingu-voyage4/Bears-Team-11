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
      var newSet = new Set();
      newSet.add('001');
      console.log(newSet);
      var newTag = new Tags({ tagName: tagName, arrayOfProjectIds: newSet });
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
      var newSet = new Set();
      newSet.add(0);
      var newCategory = new Tags({
        categoryName: categoryName,
        arrayOfProjectIds: newSet
      });
      newCategory.save(function(err) {
        if (err) {
          res.json({ error: 'Error in saving tag: ' + err });
        }
      });
    };

    async function mapThenSaveCategories() {
      categoryArray.map(category => {
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

  // add / update projects
  router.post('/add', isAuthenticated, function(req, res) {
    if (req.body._id !== undefined) {
      console.log('_id=' + req.body._id);
      // update project
      var projectId = req.body._id;
      var updateBody = req.body;
      delete updateBody._id;
      delete updateBody.images;

      Project.findOne({ _id: projectId }, function(err, project) {
        if (err) {
          return res.json({ error: err });
        } else if (!project) {
          return res.json({ error: 'Project does not exist: ' + err });
        } else {
          // loop through every key/value pair on updateBody, saves each to userDetails
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

          Project.findById(projectId, function(err, project) {
            if (err || !project) {
              return res.json({ error: 'Error in retrieving project: ' + err });
            } else {
              clearTagCategoryTeamHandler(projectId);
              console.log(project.tags);
              addTagCategoryTeamHandler(
                projectId,
                project.tags,
                project.category,
                project.team
              );
              res.json({
                project: project,
                message: 'Project saved successfully'
              });
            }
          });
        }
      });
    } else {
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
          // save project to creators projectArray
          addProjToUser(project.creator, project._id);

          console.log('project._id=' + project._id);
          console.log('project.tags=' + project.tags);
          console.log('project.category=' + project.category);
          console.log('project.team=' + project.team);

          // save projectId to corresponding tag / category / team members docs
          addTagCategoryTeamHandler(
            project._id,
            project.tags,
            project.category,
            project.team
          );

          console.log('New project saved successfully=' + project);
          res.json({
            message: 'New project saved successfully',
            newProject: project
          });
        }
      });
    }
  });

  // delete a single project by id
  router.delete('/delete', isAuthenticated, function(req, res) {
    console.log('id=' + req.body.id);

    console.log('clearing tag / category / team');
    clearTagCategoryTeamHandler(req.body.id);

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

  // get a single revision
  router.get('/:projectId/revisions/:revisionId', function(req, res) {
    Revision.findOne({ _id: req.params.revisionId }, function(err, revision) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          message:
            'Revision successfully retrieved for project ' +
            req.params.revisionId,
          revision
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
  router.get('/revision/:revisionId/markers', function(req, res) {
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

// function that removes projecId from corresponding tags / category / team docs
clearTagCategoryTeamHandler = projectId => {
  deleteProjIdInTag(projectId);
  deleteProjIdInTeam(projectId);
  deleteProjIdInCategory(projectId);
};

// function that adds projectId to corresponding tag / category / team docs
addTagCategoryTeamHandler = (projectId, tagArray, categoryName, teamArray) => {
  if ((tagArray !== undefined) | (tagArray !== [])) {
    tagArray.map(tag => {
      addTag(tag, projectId);
    });
  }

  if (categoryName !== undefined || categoryName !== '') {
    addCategory(categoryName, projectId);
  }

  if (teamArray !== undefined || teamArray !== []) {
    teamArray.map(user => {
      addProjToUser(user, projectId);
    });
  }
};

deleteProjIdInTag = projectId => {
  Tags.find({ arrayOfProjectIds: { $in: [projectId] } }, function(err, tags) {
    if (err || !tags) {
      console.log('error in retrieving tags: ' + err);
    } else {
      // go through each tag and delete projectId
      tags.forEach(tag => {
        tag.arrayOfProjectIds.delete(projectId);
        console.log(
          'deleted tag: ' + tag + ' from array [' + tag.arrayOfProjectIds + ']'
        );
      });
    }
  });
};

addTag = (tagName, projectId) => {
  Tags.findOne({ tagName: tagName }, function(err, tag) {
    if (err) {
      console.log('Error in finding tags: ' + err);
    } else if (!tag) {
      // if tags does not exist, add new tag document.
      // add projectId to array
      var projectIdArray = new Set();
      projectIdArray.add(projectId);
      var newTag = new Tags({
        tagName: tagName,
        arrayOfProjectIds: projectIdArray
      });
      console.log(newTag);
      newTag.save(function(err) {
        if (err) {
          console.log('Error in saving tag: ' + err);
        }
      });
    } else {
      // if tag exists, push projectId
      console.log('tag=' + tag);
      console.log('tag.arrayOfProjectIds=' + tag.arrayOfProjectIds);
      var newSet = new Set();
      newSet.add(tag.arrayOfProjectIds);
      newSet.add(projectId);
      tag.set(arrayOfProjectIds, newSet);

      tag.save(function(err, tag) {
        err
          ? console.log('Error in add/update projectId in tag')
          : console.log('Saved projectid to tag: ' + tag);
      });
    }
  });
};

addProjToUser = (username, projId) => {
  User.findOne({ username: username }, function(err, user) {
    if (err || !user) {
      console.log('could not find user: ' + err);
    } else {
      // add user data to team Set to save to new/updated project info
      // setName.add({ username: user.username, profileImage: user.profileImage, _id: user._id });
      // user.project.add(user.username);

      // save projectId to user's project Set
      // if user project Set is empty, make a new set and add.
      UserDetails.find({ username: user.username }, function(err, userDetail) {
        if (err || !userDetail) {
          console.log('Error in retrieving userDetails: ' + err);
        } else {
          if ((userDetail.project.length = 0)) {
            var newProjectSet = new Set();
            newProjectSet.add(projId);
            userDetail.project = newProjectSet;
          } else {
            // add projId to existing user projct set
            var newSet = new Set();
            newSet.add(userDetail.project);
            newSet.add(projId);
            userDetail.set(project, newSet);

            // user.save(function (err, user) {
            //   err ? console.log('Error in add/update projectId in user')
            //     : console.log('Saved projectid to user: ' + user);
            // });
          }
        }
      });
    }
  });
};

deleteProjIdInTeam = projectId => {
  User.find({ project: { $in: [projectId] } }, function(err, users) {
    if (err || !users) {
      console.log('could not find users: ' + err);
    } else {
      users.forEach(user => {
        UserDetails.findOne({ username: user.username }, function(
          err,
          userDetail
        ) {
          if (err || !userDetail) {
            console.log('Could not find userdetails: ' + err);
          } else {
            userDetail.project.delete(projectId);
            console.log(
              'deleted projId: ' +
                projectId +
                ' from array [' +
                user.project +
                ']'
            );
          }
        });
      });
    }
  });
};

deleteProjIdInCategory = projectId => {
  Categories.find({ arrayOfProjectIds: { $in: [projectId] } }, function(
    err,
    categories
  ) {
    if (err || !categories) {
      console.log('error in retrieving categories: ' + err);
    } else {
      // go through each tag and delete projectId
      categories.forEach(category => {
        category.arrayOfProjectIds.delete(projectId);
        console.log(
          'deleted category: ' +
            category +
            ' from array [' +
            category.arrayOfProjectIds +
            ']'
        );
      });
    }
  });
};

addCategory = (categoryName, projectId) => {
  Categories.findOne({ categoryName: categoryName }, function(err, category) {
    if (err) {
      console.log('Error in finding category: ' + category);
    } else if (!category) {
      // if category does not exist, add new category document.
      // add projectId to array
      var projectIdArray = new Set();
      projectIdArray.add(projectId);
      var newCategory = new Categories({
        categoryName: categoryName,
        arrayOfProjectIds: projectIdArray
      });
      console.log(newCategory);
      newCategory.save(function(err) {
        if (err) {
          console.log('Error in saving tag: ' + err);
        }
      });
    } else {
      // if tag exists, push projectId
      console.log('category=' + category);
      var newSet = new Set();
      newSet.add(category.arrayOfProjectIds);
      newSet.add(projectId);
      category.set(arrayOfProjectIds, newSet);

      category.save(function(err, tag) {
        err
          ? console.log('Error in add/update projectId in tag')
          : console.log('Saved projectid to tag: ' + tag);
      });
    }
  });
};
