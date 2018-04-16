var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Project = require('../models/Projects');
var isAuthenticated = require('../utils/authentication');
var mongoosePaginate = require('mongoose-paginate');
var Tags = require('../models/Tags');
var Categories = require('../models/Categories');
var UserDetails = require('../models/UserDetails');

module.exports = function (passport) {
  // retrieves all projects
  router.get('/', function (req, res) {
    Project.paginate({}, req.body.options, function (err, result) {
      if (err) {
        return res.json({ message: 'Error retrieving project: ' + err })
      } else {
        res.json({ projects: result, message: 'Succesfully retrieved projects' });
      }
    })
  });

  router.get('/tags', function (req, res) {
    // retrieve all items in the tags collection. receive tagName and array of projects involved
    return Tags.find({}, function (err, tags) {
      if (err) {
        return res.json({ error: 'Error getting tags: ' + err });
      } else {
        return res.json({ tags: tags, message: 'Successfully retrieved tags' });
      }
    });
  });

  router.get('/categories', function (req, res) {
    // retrieve all items in the categories collection. receive tagName and array of projects involved
    return Categories.find({}, function (err, categories) {
      if (err) {
        return res.json({ error: 'Error getting categories: ' + err });
      } else {
        return res.json({ categories: categories, message: 'Successfully retrieved categories' });
      }
    });
  });

  // retrieves filtered projects. placeholder => not yet implemented
  router.post('/filter', function (req, res) {
    Project.paginate({}, req.body.options, function (err, result) {
      if (err) {
        return res.json({ message: 'Error retrieving project: ' + err })
      } else {
        res.json(result);
      }
    })
  });

  // retrieves project by id
  router.get('/:id', function (req, res) {
    Project.findOne({ _id: req.params.id }, function (err, project) {
      if (err || !project) {
        res.json({ message: 'Error in saving project: ' + err });
      } else {
        res.json(project);
      }
    })
  })

  // update project by id
  router.post('/update', isAuthenticated, function (req, res) {
    Project.findOneAndUpdate({ _id: req.body.id }, { [req.body.updateKey]: req.body.updateObject, modifiedAt: new Date() }, { new: true }, function (err, project) {
      if (err || !project) {
        res.json({ message: 'Error in updating project: ' + err });
      } else {
        // search projectId in category and tags
        // if whats found doesnt match the updated category or tags array, then  pass to removeFunction

        res.json({ project: project, message: 'Successfully updated project' });
      }
    })
  })

  // add new projects
  router.post('/add', isAuthenticated, function (req, res) {
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
    
    newProject.save(function (err, project) {
      if (err) {
        res.json({ error: 'Error in saving project: ' + err });
      } else {
        // save to user projects
        addOrUpdateProjectInUser(newProject.creator, newProject._id);

        // save to each teammembers project list
        if (newProject.team) {
          (newProject.team).forEach(function(user) {
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

        console.log('New project saved successfully');
        res.json({ message: 'New project saved successfully', newProject: project });
      }
    });
  });

  // delete a single project by id
  router.post('/delete/one', isAuthenticated, function (req, res) {
    Project.findByIdAndRemove(req.body.id, function (err, project) {
      if (err || !project) {
        res.json({ message: 'Error in deleting project: ' + err });
      } else {
        res.json({ message: 'Project successfully deleted', project: project });
      }
    })
  })

  return router;
}

addOrUpdateTags = (tagName, projectId) => {
  Tags.findOne({ tagName: tagName }, function (err, tag) {
    if (err) {
      res.json({ error: 'Error in finding tags: ' + err });
    } else if (!tag) {
      // if tags does not exist, add new tag document. tagName and project id added to array
      var newTag = new Tags({ tagName: tagName, arrayOfProjectIds: projectId });
      console.log(newTag);
      newTag.save(function (err) {
        if (err) { res.json({ error: 'Error in saving tag: ' + err }); }
      });
    } else {
      // if tag exists, only push projectId if it doesnt exist already
      if (tag.arrayOfProjectIds.indexOf(projectId) === -1) {
        var newArray = Array.from(tag.arrayOfProjectIds);
        newArray.push(projectId);
        tag.arrayOfProjectIds.set(newArray);
        console.log(tag.arrayOfProjectIds);
      }
    }
  });
}

removeProjectInTags = (tagName, projectId) => {
  Tags.findOne({ tagName: tagName }, function (err, tag) {
    if (err || !tag) {
      res.json({ message: 'Error in finding tag: ' + err });
    } else {
      var copyOfArray = Array.from(tag.arrayOfProjectIds);

      var projectIndexToDelete = copyOfArray.findIndex(projectId);
      tag.arrayOfProjectIds = copyOfArray.splice(projectIndexToDelete, 1);

      res.json({ message: 'Project successfully project from tag array', tag: tag });
    }
  });
}

addOrUpdateCategories = (categoryName, projectId) => {
  Categories.findOne({ categoryName: categoryName }, function (err, category) {
    if (err) {
      res.json({ error: 'Error in finding category: ' + err });
    } else if (!category) {
      // if category does not exist, add to categoryName, add this projectId to array
      var newCategory = new Categories({ categoryName: categoryName, arrayOfProjectIds: projectId });
      console.log(newCategory);
      newCategory.save(function (err) {
        if (err) { res.json({ error: 'Error in saving category: ' + err }); }
      });
    } else {
      // if already exists , only push projectId if it doesnt exist already
      if (category.arrayOfProjectIds.indexOf(projectId) === -1) {
        var newArray = Array.from(category.arrayOfProjectIds);
        newArray.push(projectId);
        category.arrayOfProjectIds.set(newArray);
        console.log(category.arrayOfProjectIds);
      }
    }
  });
}

addOrUpdateProjectInUser = (username, projectId) => {
  UserDetails.findOne({ username: username }, function (err, userDetail) {
    if (err) {
      console.log('Error in finding user: ' + err);
    } else if (!userDetail) {
      console.log(username);
      console.log('UserDetail does not exist');
    } else {
      // if already exists , only push projectId if it doesnt exist already
      console.log(JSON.stringify(userDetail));
      if (userDetail.projects.indexOf(projectId) === -1) {
        var newArray = Array.from(userDetail.projects);
        newArray.push(projectId);
        userDetail.projects.set(newArray);
      }
    }
  });
}

removeProjectInCategory = (categoryName, projectId) => {
  Categories.findOne({ categoryName: categoryName }, function (err, category) {
    if (err || !category) {
      res.json({ message: 'Error in finding category: ' + err });
    } else {
      var copyOfArray = Array.from(category.arrayOfProjectIds);

      var projectIndexToDelete = copyOfArray.findIndex(projectId);
      category.arrayOfProjectIds = copyOfArray.splice(projectIndexToDelete, 1);

      res.json({ message: 'Project successfully removed project from category array', category: category });
    }
  });
}