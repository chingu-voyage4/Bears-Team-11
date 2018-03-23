var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Project = require('../models/Projects');
var isAuthenticated = require('../utils/authentication');
var mongoosePaginate = require('mongoose-paginate');

router.use(bodyParser.json());

// retrieves all projects
router.get('/', function(req, res) {
  Project.paginate({}, req.body.options, function(err, result) {
    if (err) { return res.send('Error retrieving project: ' + err) };
    res.json(result);
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
  Project.findOneAndUpdate({_id: req.body.id}, {[req.body.updateKey]: req.body.updateObject, modifiedAt: new Date()}, function(err, project) {
    if (err || !project) {
      res.send('Error in updating project: ' + err);
    }
    res.json(project);
  })
})

// add new projects
router.post('/add', isAuthenticated, function (req, res) {
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

  newProject.save(function (err) {
    if (err) {
      res.send('Error in saving project: ' + err);
    }
    console.log('New project saved successfully');
    res.json({message: 'New project saved successfully', newProject: newProject})
  }); 
})

// delete a single project by id
router.delete('/delete/one', isAuthenticated, function(req,res) {
  Project.findByIdAndRemove(req.body.id, function(err) {
    if (err) {
      res.send('Error in deleting project: ' + err);
    }
    res.send({message: 'Project successfully deleted'});
  })
})


module.exports = router;
