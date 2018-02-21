const _ = require('lodash');

var users = {
  [1]: {
    id: 1,
    username: 'BlackPanther',
    name: `King T'Challa`,
    password: 'shouldbeencrypted',
    email: 'blackpanther@wakanda.gov',
    location: 'wakanda',
    roles: ['king'],
    description: 'Coolest cat on the planet',
    techstack: ['vibranium']
  }
};

class User {
  static find({ username }) {
    const user = _.filter(users, function(user) {
      return users[user.id].username === username;
    });
    return user[0];
  }

  static findById(id) {
    return users[id];
  }

  static create({
    id,
    username,
    name,
    password,
    email,
    location = '',
    roles = [],
    description = '',
    techstack = []
  }) {
    users[id] = {
      id,
      username,
      name,
      password,
      email,
      locaiton,
      roles,
      description,
      techstack
    };
  }
}

module.exports = User;
