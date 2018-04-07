var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var isAuthenticated = require('../utils/authentication');
var User = require('../models/Users');
var UserDetails = require('../models/UserDetails');

module.exports = function (passport) {

	/* GET login page. */
	router.get('/', function (req, res) {
		// Display the Login page with any flash message, if any
		res.send('Welcome to the index page');
	});

	/* POST New User */
	router.post('/signup', function (req, res, next) {
		passport.authenticate('signup', function (err, user, info) {
			if (err) { 
				return next(err); 
			}
			else if (!user) {
				return res.send(info.message);
			} else {
				console.log('Grabbing userDetails for: ', user.username);
				console.log('User: ', user);
				console.log('Message: ', info.message);
				res.setHeader("Content-Type", "application/json");
				return res.json({ user: user, message: info.message });
			}
		})(req, res, next);
	});

	/* POST deactivate User */
	router.post('/user/deactivate', function (req, res, next) {
		passport.authenticate('deactivateUser', function (err, user, info) {
			if (err) { return res.send(err); }
			if (!user) { return res.send(info.message); }
			if (user) {
				User.findOneAndUpdate({ 'username': user.username }, { 'status': false }, function (err, user) {
					if (err) { return res.send(err); }
					console.log('Deactivating user: ', user.username);
					res.setHeader("Content-Type", "application/json");
					return res.json({ user: user, message: 'Successfully deactivated user' });
				});
			}
		})(req, res, next);
	});

	/* POST re-activate User */
	router.post('/user/activate', isAuthenticated, function (req, res) {
		User.findOneAndUpdate({ 'username': req.user.username }, { 'status': true },
			function (err, user) {
				// In case of any error, return using the done method
				if (err) { return res.send(err); }
				console.log('Activating user: ', user.username);
				res.setHeader("Content-Type", "application/json");
				return res.json({ user: user, message: 'Successfully re-activated user' });
			}
		);
	});

	/* POST Delete User */
	router.post('/user/delete', function (req, res, next) {
		passport.authenticate('deleteUser', function (err, user, info) {
			if (err) { return res.send(err); }
			if (!user) {
				return res.send(info.message);
			}
			User.findOneAndRemove({ 'username': user.username }, function (err, user) {
				if (err) { return res.send(err); }
				console.log('Deleting user: ', user.username);
				res.setHeader("Content-Type", "application/json");
				return res.json({ message: 'Successfully deleted user' });
			});
		})(req, res, next);
	});

	/* Handle Login POST */
	router.post('/login', function (req, res, next) {
		passport.authenticate('login', function (err, user, info) {
			if (err) { return res.send(err); }
			if (!user) { return res.send(info.message); }
			req.logIn(user, function (err) {
				if (err) { return next(err); }
				UserDetails.findOne({ 'username': user.username }, function (err, userDetail) {
					if (err) { return res.send(err); }
					console.log('Grabbing userDetails for: ', user.username);
					console.log('User: ', user);
					console.log('UserDetail: ', userDetail);
					console.log('Message: ', info.message);
					res.set('Content-Type', 'application/json');
					return res.json({ user: user, userDetail: userDetail, message: info.message });
				})
			});
		})(req, res, next);
	});

	/* Handle Logout */
	router.get('/logout', function (req, res, next) {
		console.log('logging out!');
		req.logout()
		res.send('Successfully Logged Out');
	});

	return router;
}

