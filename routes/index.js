var express = require('express'),
    router = express.Router(),
  	mongoose = require('mongoose'),
  	moment = require('moment'),
  	Post = require('../models/Post'),
  	Category = require('../models/Category'),
  	nodemailer = require('nodemailer'),
  	config = require('../config.json'),
    middlewareObj = require('../middlewares');


/* GET home page. */
router.get('/', function(req, res) {
	Post.find(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.redirect('/blog/00');
	});
});

router.get('/blog', function(req, res) {
	Post.find(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.redirect('/blog/00');
	});
});


router.get('/aplicacion', middlewareObj.isLoggedIn, function(req, res) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.render('blog/aplicacion', { posts: posts });
	});
});

//

router.get('/acerca-de', function(req, res, next) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}
		res.render('navigation/acerca-de', { posts: posts });
	});
});

//

router.get('/portafolio', function(req, res, next) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.render('navigation/portafolio', { posts: posts });
	});
});

//

router.get('/contacto', function(req, res, next) {

	/*
	sendgrid.send({
		to: 'enma_martinez@hotmail.com',
		form: 'vanmido3@gmail.com',
		subject: 'Hello World',
		text: 'My first email through Sendgrid!'
	}, function(err, json){
		if(err) {return console.log(err);}
		console.log(json);
	});
*/
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.render('navigation/contacto', { posts: posts });
	});
});

router.post('/enviado', function(req, res, next) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: config.nodemailer.email,
			pass: config.nodemailer.password
		}
	});

	var mailOptions = {
		from: 'Enmanuel <enma_martinez@hotmail.com>',
		to: config.nodemailer.email,
		subject: 'Website Submission',
		text: 'You have a new submission with following details... '+ req.body.asunto + ' Name: '+ req.body.name + ' Email: '+ req.body.email+ ' Message: '+req.body.message,
		html: '<p>You got a new submission with the following details...</p><ul><li>'+req.body.asunto+'</li><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message sent: '+info.response);
			res.redirect('/');
		}
	});
});

//

router.get('/contacto/enviado', function(req, res, next) {
	Post.find().sort({ created_at: -1 }).exec(function(err, posts) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/blog');
		}

		res.render('navigation/enviado', { posts: posts });
	});
});

//

//

module.exports = router;
