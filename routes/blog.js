var express = require('express'),
	router = express.Router('mongoose'),
	mongoose = require('mongoose');
	moment = require('moment'),
	Post = require('../models/Post'),
	Category = require('../models/Category'),
	middlewareObj = require('../middlewares');

var multer = require('multer');
var upload = multer({dest: './public/images/uploads/'});
var cloudinary = require('cloudinary');

router.get('/:id', function(req, res) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
    if (posts.length < (6 * req.params.id)) {
    res.redirect('/blog/00');
    }
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}
    var pagLong = function(){
      var pagination = []

          for(i=0; i < Math.ceil(posts.length/6); i++) {
            pagination.push(i+1);
           }
          return pagination;
    }

		res.render('blog/posts', {
      posts: posts.slice(6 * req.params.id, 6 * (req.params.id + 1)),
      id: req.params.id,
      pagination: pagLong()
    });
  });

});

router.get('/profile', middlewareObj.isLoggedIn, function(req, res) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.render('blog/profile', { posts: posts });
	});
});

router.get('/post/new', middlewareObj.isLoggedIn, function(req, res) {
	Category.find().sort({ name: 1 }).exec(function(err, categories){
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog/posts');
		}
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog/posts');
		}

		res.render('blog/new', { categories: categories, posts: posts });
		});
	});
});

router.post('/post/new', middlewareObj.isLoggedIn, upload.single('theFile'), function(req, res) {

	cloudinary.uploader.upload(req.body.image || req.file.path, function(result) {
		var newPost = {
			title: req.body.title,
			image: result.url || req.body.image,
			content: req.body.content,
			category: req.body.category,
			author: {
				id: req.user._id,
				username: req.user.username.charAt(0).toUpperCase() + req.user.username.slice(1)
			},
			created_at: moment().format('MMMM Do YYYY, h:mm:ss a')
		}

		Post.create(newPost, function(err, post) {
			if (err) {
				req.flash('error', err.message);
				return res.redirect('/blog/post/new');
			}

			req.flash('success', 'Post created successfuly');
			res.redirect('/blog/post/' + post.id);
		});
	});
});

router.get('/post/:id', function(req, res) {
		Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}
	Post.findById(req.params.id, function(err, post) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.render('blog/show', { post: post, posts: posts });
		});
	});
});

router.get('/post/:id/edit', middlewareObj.isLoggedIn, function(req, res) {
		Category.find().sort({ name: 1 }).exec(function(err, categories){
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog/posts');
		}
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}
	Post.findById(req.params.id, function(err, post) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.render('blog/edit', { post: post, posts: posts, categories: categories });
		});
		});
	});
});

router.put('/:id/edit', middlewareObj.isLoggedIn, upload.single('theFile'), function(req, res) {
	cloudinary.uploader.upload(req.body.image || req.file.path, function(result) { console.log(result)
		Post.findByIdAndUpdate(req.params.id, { title: req.body.title, image: result.url || req.body.image, content: req.body.content, created_at: req.body.created_at  }, function(err, post) {
			if (err) {
				req.flash('error', err.message);
				return res.redirect('/category');
			}

			res.redirect('/blog/post/' + post.id);
		});
	});
});

router.delete('/post/:id', middlewareObj.isLoggedIn, function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.redirect('/blog');
	});
});

module.exports = router;
