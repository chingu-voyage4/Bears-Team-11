var Projects = require('../models/Projects');

var express = require('express');
var router = express.Router();

module.exports = function () {

router.get('/',function(req,res){
  res.send('This is the projects page');
});  

router.post('/add', function (req, res) {
  
  var newProject = new Projects();
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

  newProject.save(function (err) {
    if (err) {
    console.log('Error in saving project: ' + err);
    }
    console.log('New project saved successfully');

   res.redirect('/home');

  });

});

router.post('/delete', function (req, res) {
// get the _id
// delete

});

router.post('/update', function (req, res) {
     

});

return router;

}