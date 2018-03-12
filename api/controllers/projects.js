const auth = require('../utils/auth');
const Project = require('../stubs/Project');

function createProject(req,res) {
  // does the front-end side need to create an ID?
  // and should i be testing whether a project exists by their id?
  const project = Project.find({ id: req.body.id });

  if (project) {
    res.sendStatus(409);
  } else {
    const newProject = User.create({
      name: req.body.name,
      creator: req.body.creator,
      githubLink: req.body.githubLink,
      mockupLink: req.body.mockupLink,
      liveLink: req.body.liveLink,
      images: req.body.images,
      team: req.body.team,
      description: req.body.description,
      contact: req.body.contact,
      lookingFor: req.body.lookingFor,
      createdAt: req.body.createdAt,
      dueDate: req.body.dueDate,
      category:  req.body.category,
      status: req.body.status
    });
    req.createProject(newProject, function(err) {
      if(err) {
        return next(err);
      }
      return res.sendStatus(200);
    });
  }
}

// how would i set it up for updating and deleting project data

module.exports = {
  createProject
};