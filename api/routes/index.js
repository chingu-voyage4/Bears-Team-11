var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var isAuthenticated = require('../utils/authentication');
var User = require('../models/Users');
var UserDetails = require('../models/UserDetails');
const { OAuth2Client } = require('google-auth-library');

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
				return res.json({ message: info.message });
			} else {
				console.log('Creating userDetails for: ', user.username);
				console.log('User: ', user);
				console.log('Message: ', info.message);
				return res.json({ user: user, message: info.message });
			}
		})(req, res, next);
	});

	/* POST deactivate User */
	router.post('/user/deactivate', function (req, res, next) {
		passport.authenticate('deactivateUser', function (err, user, info) {
			if (err) { return res.json({ error: err }) }
			if (!user) { return res.json({ message: info.message }); }
			if (user) {
				User.findOneAndUpdate({ 'username': user.username }, { 'status': false }, function (err, user) {
					if (err) { res.json({ error: err }); }
					console.log('Deactivating user: ', user.username);
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
				if (err) { return res.json({ error: err }) }
				console.log('Activating user: ', user.username);
				return res.json({ user: user, message: 'Successfully re-activated user' });
			}
		);
	});

	/* POST Delete User */
	router.post('/user/delete', function (req, res, next) {
		passport.authenticate('deleteUser', function (err, user, info) {
			if (err) { return res.json({ error: err }); }
			if (!user) {
				return res.json({ message: info.message });
			}
			User.findOneAndRemove({ 'username': user.username }, function (err, user) {
				if (err) { return res.json({ error: err }); }
				console.log('Deleting user: ', user.username);
				return res.json({ message: 'Successfully deleted user' });
			});
		})(req, res, next);
	});

	/* Handle Login POST */
	router.post('/login', function (req, res, next) {
		passport.authenticate('login', function (err, user, info) {
			if (err) { return res.json({ error: err }); }
			if (!user) { return res.json({ message: info.message }); }
			req.logIn(user, function (err) {
				if (err) { return next(err); }
				UserDetails.findOne({ 'username': user.username }, function (err, userDetail) {
					if (err) { return res.json({ error: err }); }
					console.log('Grabbing userDetails for: ', user.username);
					console.log('User: ', user);
					console.log('UserDetail: ', userDetail);
					console.log('Message: ', info.message);
					return res.json({ user: user, userDetail: userDetail, message: info.message });
				})
			});
		})(req, res, next);
	});

	// GOOGLE LOGIN ROUTE
	router.post('/googlelogin', function (req, res) {
		const CLIENT_ID = '634604962663-247j6obodp1clln54de1469euufj6vdj.apps.googleusercontent.com';
		const client = new OAuth2Client(CLIENT_ID);

		let idToken = req.body.idToken;

		// https://developers.google.com/identity/sign-in/web/backend-auth
		// verify tokenID
		async function verify() {
			const ticket = await client.verifyIdToken({
				idToken: idToken,
				audience: CLIENT_ID,
			});
			let payload = ticket.getPayload();
			let userid = payload['sub'];
			let email = payload['email'];
			let given_name = payload['given_name'];
			let family_name = payload['family_name'];
			let profilePic = payload['picture'];

			let returnedObject = {
				userid: userid,
				email: email,
				given_name: given_name,
				family_name: family_name,
				profilePic: profilePic
			}
			return returnedObject;
		}
		// verify token ID
		verify()
			.then(function (googlePayload) {
				console.log(googlePayload);
				// console.log(User.findOne({ googleId: googlePayload.userid }, function(err, user) { return user}));
				return User.findOne({ googleId: googlePayload.userid }, function (err, user) {
					console.log('finding User');
					if (err) {
						return res.json({ error: err });
					} else if (user) {
						// existing user , send back existing user data
						UserDetails.findOne({ 'googleId': user.googleId }, function (err, userDetail) {
							if (err) {
								return res.json({ error: err });
							} else if (userDetail) {
								console.log('Signing in with Google Authentication');
								res.json({ user: user, userDetail: userDetail, message: 'Successfully logged in with Google' });
							}
						});
					} else {
						// user not found, make new user and userDetails collection
						var user;
						var userDetail;
						var newUser = new User();
						newUser.firstName = googlePayload.given_name;
						newUser.lastName = googlePayload.family_name;
						newUser.email = googlePayload.email;
						newUser.profileImage = googlePayload.profilePic;
						newUser.googleId = googlePayload.userid;
						newUser.username = googlePayload.given_name + '_' + googlePayload.family_name;

						var newUserDetails = new UserDetails({ googleId: googlePayload.userid });

						// save the user
						newUser.save(function (err, user) {
							if (err) {
								console.log('Error in Saving user: ' + err);
								throw err;
							} else {
								newUserDetails.save(function (err, userDetail) {
									if (err) {
										console.log('Error in saving newUserDetails: ' + err);
										throw err;
									}
									console.log('New UserDetails document available')
									console.log('User Registration w/ Google Authentication succesful');
									// send back user and userDetails
									res.json({ user: user, userDetail: userDetail, message: 'Sucessfully registered with Google' })
								});
							}

						});
					}
				});
			})
			.catch(console.error)
	});

	/* Handle Logout */
	router.get('/logout', function (req, res, next) {
		console.log('logging out!');
		req.logout()
		res.json({ message: 'Successfully Logged Out' });
	});

	router.get('/users', function(req,res) {
		console.log('getting all users');
		return User.find({}, function(err, users) {
			console.log('found users');
			if (err) {
				return res.json({error: 'Error in retrieving users: ' + err});
			} else {
				console.log(users);
				return res.json({users: users, message: 'Successfully retrieved all users'});
			}
		})
	});

	return router;
}

