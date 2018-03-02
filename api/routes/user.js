const express = require('express');
const {
  createUser,
  loginUser,
  logoutUser,
  restricted
} = require('../controllers/user');
const passport = require('../utils/auth');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}

router.post('/', createUser);
router.post('/login', passport.authenticate('local'), loginUser);
router.post('/logout', logoutUser);
router.get('/restricted', isAuthenticated, restricted);

module.exports = router;
