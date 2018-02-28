const auth = require('../utils/auth');
const User = require('../stubs/User');

function createUser(req, res) {
  const user = User.find({ email: req.body.email });
  if (user) {
    res.sendStatus(409);
  } else {
    const newUser = User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email
    });
    alert("Registered new user " + newUser);
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
