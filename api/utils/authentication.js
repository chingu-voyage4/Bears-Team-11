var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
		console.log('You are authorized');
		return next();
	}
	    
	// if the user is not authenticated then redirect him to the login page
	console.log('You are not authorized');
	res.send({message: 'You are not authorized'})
}

module.exports = isAuthenticated;