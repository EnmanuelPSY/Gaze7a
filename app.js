var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  cookieParser = require('cookie-parser'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  passportLocalMongoose = require('passport-local-mongoose'),
  cloudinary = require('cloudinary');

var  middlewareObj = require('./middlewares'),
  config = require('./config.json');

var app = express();

// set your env variable CLOUDINARY_URL or set the following configuration
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

var User = require('./models/User');

/*
mongoose.connect('mongodb://localhost:27017/gaze7a_posts', function() {
  console.log('Connected to the database!');
});
*/

mongoose.connect('mongodb://'+ config.mlab.blog.username + ':'+ config.mlab.blog.password + 
config.mlab.blog.db_code + '/' + config.mlab.blog.db_name); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());

app.use(session({
  secret: 'Hey',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middlewares
app.use(middlewareObj.localVariables);

var routes = require('./routes/index');
var blogRoutes = require('./routes/blog')
    authenticationRoutes = require('./routes/authentication')
    categoryRoutes = require('./routes/category');

app.use('/', routes);
app.use('/blog', blogRoutes);
app.use('/users', authenticationRoutes);
app.use('/category', categoryRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
