var express = require('express');
var router = express.Router();
var Project = require('../models/Projects');

// retrieves all projects
router.get('/', function(req, res) {
  Project.find({}, function(err, projects) {
    if (err) {
      console.log('Error in retrieving projects: ' + err)
    }
    console.log(projects);
    res.json(projects);
  })
});
// add new projects
router.post('/add', function (req, res) {
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

  newProject.save(function (err) {
    if (err) {
      console.log('Error in saving project: ' + err);
    }
    console.log('New project saved successfully');
    res.send(newProject)
  });
})
module.exports = router;
