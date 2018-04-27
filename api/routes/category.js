var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/authentication');
var mongoosePaginate = require('mongoose-paginate');
var Categories = require('../models/Categories');

module.exports = function(passport) {
  router.get('/', function(req, res) {
    // retrieve all items in the categories collection. receive tagName and array of projects involved
    return Categories.find({}, function(err, categories) {
      if (err) {
        return res.json({ error: 'Error getting categories: ' + err });
      } else {
        return res.json({
          categories: categories,
          message: 'Successfully retrieved categories'
        });
      }
    });
  });

  router.get('/setup', function(req, res) {
    var categoryArray = [
      'Educational',
      'Fun',
      'News & Weather',
      'Search Tools',
      'Shopping',
      'Social & Communication',
      'Sports',
      'Non-Profit',
      'Developer Tools',
      'Design Tools',
      'Productivity'
    ];

    saveNewCategories = categoryName => {
      var newCategory = new Categories({ categoryName: categoryName });
      newCategory.save(function(err) {
        if (err) {
          res.json({ error: 'Error in saving category: ' + category });
        }
      });
    };

    async function mapThenSaveCategories() {
      await categoryArray.map(category => {
        saveNewCategories(category);
      });

      Categories.find({}, function(err, categories) {
        if (err || !categories) {
          res.json({
            error: 'Error in saving and retrieving categories: ' + err
          });
        } else {
          res.json({
            categories: categories,
            message: 'Successfully saved batch categories'
          });
        }
      });
    }

    mapThenSaveCategories();
  });

  return router;
};
