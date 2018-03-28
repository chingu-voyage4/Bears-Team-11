var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var isAuthenticated = require('../utils/authentication');

module.exports = function (passport) {

	/* GET login page. */
	router.get('/', function (req, res) {
		// Display the Login page with any flash message, if any
		res.send('Welcome to the index page');
	});

	/* GET Registration Page */
	router.get('/signup', function (req, res) {
		res.render('Welcome to the Register page');
	});

	/* POST New User */
	router.post('/signup', function (req, res, next) {
		passport.authenticate('signup', function (err, user, info) {
			if (err) { return next(err); }
			if (!user) { return res.send(info.message); }
			return res.send(info.message);
		})(req, res, next);
	});

	/* POST deactivate User */
	router.post('/user/deactivate', function (req, res) {
		passport.authenticate('deactivateUser', function (err, user, info) {
			if (err) { return res.send(err); }
			if (!user) { return res.send(info.message); }
			if (user) {
				User.findOneAndUpdate({ 'username': username }, { 'status': false }, function (err, user) {
					if (err) { return res.send(err); }
					console.log('Deactivating user: ', user.username);
					return res.send({ user: user, message: 'Successfully deactivated user' });
				});
			}
		});
	});

	/* POST re-activate User */
	router.post('/user/activate', isAuthenticated, function (req, res) {
		User.findOneAndUpdate({ 'username': req.user.username }, { 'status': true },
			function (err, user) {
				// In case of any error, return using the done method
				if (err) { return res.send(err); }
				console.log('Activating user: ', user.username);
				return res.send({ user: user, message: 'Successfully re-activated user' });
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
			console.log('delete user is ' + user)
			User.findOneAndRemove({ 'username': user.username }, function (err, user) {
				if (err) { return res.send(err); }
				console.log('Deleting user: ', user.username);
				return res.send({ message: 'Successfully deleted user' });
			});
		});
	});

	/* Handle Login POST */
	router.post('/login', function (req, res, next) {
		passport.authenticate('login', function (err, user, info) {
			if (err) { return next(err); }
			if (!user) { return res.send(info.message); }
			req.logIn(user, function (err) {
				if (err) { return next(err); }
				return res.send(info.message);
			});
		})(req, res, next);
	});

	/* Handle Logout */
	router.get('/logout', function (req, res, next) {
		console.log('logging out!');
		req.logout()
		res.send('Successfully Logged Out');
	});

	/* GET Home Page 
	 * This route is protected and if it is not authenticated,
	 * it will redirects to login page.
	*/
	router.get('/home', isAuthenticated, function (req, res) {
		res.send('Welcome to the Home');
	});

	return router;
}

