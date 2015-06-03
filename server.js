var express = require('express'),
    models = require('./server/models/models.js'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config.js')[env];

var app = express();

require('./server/config/express')(app, config);

require('./server/config/sequelize');
    
passport.serializeUser(function(user, done) {
  if(user) {
    done(null, user.id);
  }
});

passport.deserializeUser(function(id, done) {
  models.User.find({where: {id: id}})
    .then(function(user) {
      done(null, user);
    })
    .error(function(err) {
      done(err, null);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.find({ where: {username: username}}).then(function(user) {
      if(user && user.authenticate(password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  }
));

require('./server/config/routes')(app);

app.listen(config.port);
console.log("Listening on port: " + config.port);
