var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/authentication');

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.send('Welcome to the index page');
    });
    
    /* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('Welcome to the Register page');
    });
    
    // /* Handle Registration POST */
	// router.post('/signup', passport.authenticate('signup', {
	// 	successRedirect: '/home',
	// 	failureRedirect: '/signup',
	// 	failureFlash : true  
	// }));

	router.post('/signup', function(req, res, next) {
		passport.authenticate('signup', function(err, user, info) {
		  if (err) { return next(err); }
			if (!user) { return res.send('No user'); }
			// console.log(res.body.message);
		  return res.send('Success');
		})(req, res, next);
	});

	

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

    /* GET Home Page 
     * This route is protected and if it is not authenticated,
     * it will redirects to login page.
    */
    router.get('/home', isAuthenticated, function(req, res){
		res.send('Welcome to the Home');
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}





