var models = require('../models/models.js'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  
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
};