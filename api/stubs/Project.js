const _ = require('lodash');

var projects = {
  [2]: {
    id: 2,
    name: 'Momentum Dash',
    creator: 'lilgangwolf',
    githubLink: 'https://github.com/chingu-coders/Voyage2-Turtles-11',
    mockupLink: 'https://github.com/chingu-coders/Voyage2-Turtles-11',
    liveLink: 'https://github.com/chingu-coders/Voyage2-Turtles-11',
    image: ['https://goo.gl/hBQdUP'],
    team: ['thorbw', 'eun park', 'miles burke'],
    description: `TurtleTab is a Google Chrome Extension Built with React. It creates a new homepage 
        which features current Weather, Todo and Notes functionality. It also accesses your browser 
        data to see Bookmarks, enable/disable Apps and Extensions, and see/clear your History.`,
    contact: 'lilgangwolf',
    lookingFor: ['Programmer', 'Designer'],
    comments: 'None',
    createdAt: 1519337864764,
    dueDate: 1519337864764,
    views: 100,
    category: 'Productivity Tool',
    status: true,
    upVotes: 10
  }
}

class Project {
  static find({ name }) {
    const user = _.filter(projects, function(project) {
      return projects[project.id].name === name;
    });
    return projects;
  }

  static findById(id) {
    return projects[id];
  }

  static create({
    id = Math.floor(Math.random() * 1000),
    name,
    creator,
    link,
    images = [],
    team = [],
    description,
    contact,
    lookingFor = [],
    comments,
    createdAt,
    dueDate,
    views,
    category,
    status,
    upVotes
  }) {
    return (projects[id] = {
    id,
    name,
    creator,
    link,
    images,
    team,
    description,
    contact,
    lookingFor,
    comments,
    createdAt,
    dueDate,
    views,
    category,
    status,
    upVotes
    });
  }
}

module.exports = Project;