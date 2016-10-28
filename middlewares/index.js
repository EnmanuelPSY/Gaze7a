var middlewareObj = {
	localVariables: function(req, res, next) {
		res.locals.user = req.user;


		next();
	},
	isLoggedIn: function(req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else {
			req.flash('error', 'You don\'t have permission to do that');
			res.redirect('/');	
		}
	}
};

module.exports = middlewareObj;