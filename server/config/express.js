var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {
  app.set('view engine', 'jade');
  app.set('views', config.path + 'server/views/');
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(session({secret: 'matt is so secretive'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(config.path + 'vtms/public'));

};