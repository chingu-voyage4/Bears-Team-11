var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/authentication');
var Project = require('../models/Projects');

module.exports = function(passport) {
  // delete a single project by id
  router.delete('/', isAuthenticated, function(req, res) {
    console.log(req.body.id);
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

  return router;
};
