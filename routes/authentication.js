var express = require('express'),
	router = express(),
	passport = require('passport'),
	mongoose = require('mongoose'),
	moment = require('moment'),
	Post = require('../models/Post'),
	User = require('../models/User'),
	Category = require('../models/Category');

router.get('/login', function(req, res) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.render('authentication/login', { posts: posts });
	});
});

router.post('/login', function(req, res) {
	passport.authenticate('local', {
		failureRedirect: '/users/login',
		failureFlash: req.flash('error')
	})(req, res, function() {
		if (req.isAuthenticated()) {
			req.flash('success', 'Wellcome back');
			res.redirect('/');
		}
	});
});

router.get('/signup', function(req, res) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}
		//res.redirect('/');
		res.render('authentication/signup', { posts: posts });
	});
});

router.post('/signup', function(req, res) {
	var newUser = {
		username: req.body.username,
		name: req.body.name,
		email: req.body.email
	}

	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash('error, err.message');
			return res.redirect('/users/signup');
		}

		passport.authenticate('local', {
			failureRedirect: '/users/login',
			failureFlash: req.flash('error')
		})(req, res, function() {
			if (req.isAuthenticated()) {
				req.flash('success', 'Wellcome back');
				res.redirect('/');
			}
		});
	});
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
