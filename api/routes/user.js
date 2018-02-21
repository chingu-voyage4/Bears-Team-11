const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
  res.json({
    message: 'success',
    route: 'api/v1/user'
  });
});

router.post('/login', function(req, res) {
  res.json({
    message: 'success',
    route: 'api/v1/user/login'
  });
});

router.post('/logout', function(req, res) {
  res.json({
    message: 'success',
    route: 'api/v1/user/logout'
  });
});

module.exports = router;
