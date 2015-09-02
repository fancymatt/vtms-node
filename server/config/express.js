var express = require('express'),
    sequelize = require('./sequelize.js'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

var SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = function(app, config) {
  app.set('view engine', 'jade');
  app.set('views', config.path + 'server/views/');
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(session({
    proxy: true,
    secret: 'matt is so secretive',
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new SequelizeStore({
      db: sequelize
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(config.path + 'public'));

};
