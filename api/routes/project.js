const express = require('express');
const {
  createProject
} = require('../controllers/projects');

// i dont need passport right?
const passport = require('../utils/auth');
const router = express.Router();

router.post('/new', createProject);
// router.post('/update', createProject);
// router.post('/delete', createProject);

module.exports = router;