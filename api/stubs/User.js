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
  static find({ email }) {
    const user = _.filter(users, function(user) {
      return users[user.id].email === email;
    });
    return user[0];
  }

  static findById(id) {
    return users[id];
  }

  static create({
    id = Math.floor(Math.random() * 1000),
    username,
    name,
    password,
    email,
    location = '',
    roles = [],
    description = '',
    techstack = []
  }) {
    return (users[id] = {
      id,
      username,
      name,
      password,
      email,
      location,
      roles,
      description,
      techstack
    });
  }
}

module.exports = User;
