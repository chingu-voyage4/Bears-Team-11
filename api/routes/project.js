var express = require('express');
var router = express.Router();
var Project = require('../models/Projects');
var isAuthenticated = require('../utils/authentication');

// retrieves all projects
router.get('/', function(req, res) {
  Project.find({}, function(err, projects) {
    if (err) {
      res.send('Error in retrieving projects: ' + err)
    }
    res.json(projects);
  })
});

// retrieves project by id
router.get('/:id', function(req,res) {
  Project.findOne({_id: req.params.id}, function(err, project) {
    if (err || !project) {
      res.send('Error in saving project: ' + err);
    }
    res.json(project);
  })
})

// update project by id
router.post('/update', isAuthenticated, function(req,res) {
  Project.findOneAndUpdate({_id: req.query.id}, {[req.query.updateKey]: req.query.updateObject, modifiedAt: new Date()}, function(err, project) {
    if (err || !project) {
      res.send('Error in updating project: ' + err);
    }
    res.json(project);
  })
})

// add new projects
router.post('/add', isAuthenticated, function (req, res) {
  var newProject = new Project();

  newProject.name = req.query.name;
  newProject.description = req.query.description;
  newProject.dueDate = req.query.dueDate;
  newProject.team = req.query.team;
  newProject.githubLink = req.query.githubLink;
  newProject.mockupLink = req.query.mockupLink;
  newProject.liveLink = req.query.liveLink;
  newProject.lookingFor = req.query.lookingFor;
  newProject.status = req.query.status;
  newProject.category = req.query.category;
  newProject.tags = req.query.tags;
  newProject.images = req.query.images;
  newProject.contact = req.query.contact;
  newProject.creator = req.query.creator;
  newProject.views = 0;
  newProject.upVotes = 0;
  newProject.createdAt = new Date();
  newProject.modifiedAt = new Date();

  newProject.save(function (err) {
    if (err) {
      res.send('Error in saving project: ' + err);
    }
    console.log('New project saved successfully');
    res.send(newProject)
  }); 
})

// delete a single project by id
router.delete('/delete/one', isAuthenticated, function(req,res) {
  Project.findByIdAndRemove(req.query.id, function(err) {
    if (err) {
      res.send('Error in deleting project: ' + err);
    }
    res.status(200).send({message: 'Project successfully deleted'});
  })
})

module.exports = router;
