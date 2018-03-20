var express = require('express');
var router = express.Router();
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

	/* Handle Login POST */
	router.post('/login', function (req, res, next) {
		console.log(req.query);
		passport.authenticate('login', function (err, user, info) {
			if (err) { return next(err); }
			if (!user) { return res.send(info.message); }
			return res.send('Login Successful');
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





