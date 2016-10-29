var express = require('express'),
	router = express.Router('mongoose'),
	Category = require('../models/Category'),
	middlewareObj = require('../middlewares');

router.get('/', middlewareObj.isLoggedIn, function(req, res) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

	Category.find(function(err, categories) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/');
		}

		res.render('category/categories', { categories: categories, posts: posts });
		});
	});
});

router.get('/new', middlewareObj.isLoggedIn, function(req, res) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}
	res.render('category/new', { posts: posts });
	});
});

router.post('/new', middlewareObj.isLoggedIn, function(req, res) {
	Category.create( { name: req.body.name }, function(err) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/category');
		}

		res.redirect('/category');
	});
});

router.get('/:id/edit', middlewareObj.isLoggedIn, function(req, res) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}
	Category.findById(req.params.id, function(err, category) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/category');
		}
		res.render('category/edit', { category: category, posts: posts });
	});
	});
});

router.put('/:id/edit', middlewareObj.isLoggedIn, function(req, res) {
	Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, function(err, category) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/category');
		}

		res.redirect('/category');
	});
});

router.delete('/:id', middlewareObj.isLoggedIn, function(req, res) {
	Category.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/category');
		}

		res.redirect('/category');
	});
});


module.exports = router;
