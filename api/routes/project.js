var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Project = require('../models/Projects');
var isAuthenticated = require('../utils/authentication');
var mongoosePaginate = require('mongoose-paginate');
var Tags = require('../models/Tags');
var Categories = require('../models/Categories');
var UserDetails = require('../models/UserDetails');

module.exports = function(passport) {
  // retrieves all projects
  router.get('/', function(req, res) {
    var options = req.query.options;
    var optionsArray = options.split('_');

    // if (query && query.searchTerm) {
    //   var queryToRegex = new RegExp(query.searchTerm);
    //   query = {
    //     $or: [
    //       { name: { $regex: queryToRegex } },
    //       { description: { $regex: queryToRegex } },
    //       { category: { $regex: queryToRegex } },
    //       { tags: { $regex: queryToRegex } }
    //     ]
    //   };
    // }

    //  // create options and query objects
    //  var optionsObject = {};
    //  var queryObject = {};

    //  if (this.state.categories!.length > 0) {
    //    var category = {
    //      category: { $in: this.state.categories }
    //    };
    //    query = Object.assign({}, query, category);
    //  }

    //  if (this.state.tags!.length > 0) {
    //    var tags = {
    //      tags: { $in: this.state.tags }
    //    };
    //    query = Object.assign({}, query, tags);
    //  }

    //  if (this.state.sortBy !== '') {
    //    if (this.state.sortBy === 'Most Viewed') {
    //      options = Object.assign(
    //        {},
    //        {
    //          sort: { views: 'desc' }
    //        }
    //      );
    //    } else if (this.state.sortBy === 'Newest') {
    //      options = Object.assign(
    //        {},
    //        {
    //          sort: { createdAt: -1 }
    //        }
    //      );
    //    } else {
    //      options = Object.assign(
    //        {},
    //        {
    //          sort: { createdAt: -1 }
    //        }
    //      );
    //    }
    //  }

    //  if (this.state.roles !== '') {
    //    if (this.state.roles === 'Programmer') {
    //      query = Object.assign({}, query, { lookingFor: ['Programmer'] });
    //    } else if (this.state.roles === 'Designer') {
    //      query = Object.assign({}, query, { lookingFor: ['Designer'] });
    //    }
    //  }

    //  if (this.state.status !== '') {
    //    if (this.state.status === 'Active') {
    //      query = Object.assign({}, query, { status: true });
    //    } else if (this.state.status === 'Completed') {
    //      query = Object.assign({}, query, { status: false });
    //    }
    //  }

    //  query = query === {} ? null : query;
    //  options = options === {} ? { limit: 24, createdAt: -1 } : options;

    // Project.paginate(
    //   query === undefined || query === {} ? {} : query,
    //   options,
    //   function(err, result) {
    //     if (err) {
    //       return res.json({ message: 'Error retrieving project: ' + err });
    //     } else {
    //       res.json({
    //         projects: result,
    //         message: 'Succesfully retrieved projects'
    //       });
    //     }
    //   }
    // );
  });
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
