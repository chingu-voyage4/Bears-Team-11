var express = require('express');
var router = express.Router();
var Tags = require('../models/Tags');

router.get('/', function(req, res) {
  // retrieve all items in the tags collection. receive tagName and array of projects involved
  console.log('retrieving tags');
  return Tags.find({}, function(err, tags) {
    if (err) {
      return res.json({ error: 'Error getting tags: ' + err });
    } else {
      console.log(tags);
      return res.json({ tags: tags, message: 'Successfully retrieved tags' });
    }
  });
});

router.get('/setup', function(req, res) {
  var tagArray = [
    'web app',
    'mobile app',
    'machine learning',
    'data science',
    'finances',
    'food',
    'budgeting',
    'bot',
    'travel',
    'portfolio',
    'mockups',
    'collaboration',
    'weather',
    'chrome extension',
    'anime',
    'chingu',
    'landing page',
    'music',
    'chat',
    'fitness',
    'game'
  ];

  saveNewTag = tagName => {
    var newTag = new Tags({ tagName: tagName });
    newTag.save(function(err) {
      if (err) {
        console.log('Error in saving tag: ' + err);
      }
    });
  };

  async function mapThenSaveTags() {
    await tagArray.map(tag => {
      saveNewTag(tag);
    });
    return Tags.find({}, function(err, tags) {
      if (err || !tags) {
        res.json({ error: 'Error in saving and retrieving tags: ' + err });
      } else {
        res.json({ tags: tags, message: 'Successfully saved batch tags' });
      }
    });
  }

  mapThenSaveTags();
});

module.exports = router;
