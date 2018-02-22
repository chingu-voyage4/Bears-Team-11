const auth = require('../utils/auth');
const User = require('../stubs/User');

function createUser(req, res) {
  const user = User.find({ username: req.body.username });
  if (user) {
    res.sendStatus(409);
  } else {
    const newUser = User.create({
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    });
    req.login(newUser, function(err) {
      if (err) {
        return next(err);
      }
      return res.sendStatus(200);
    });
  }
}

function loginUser(req, res) {
  res.sendStatus(200);
}

function logoutUser(req, res) {
  req.logout();
  res.sendStatus(200);
}

function restricted(req, res) {
  res.sendStatus(200);
}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  restricted
};
