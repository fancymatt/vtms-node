var auth = require('./auth'),
    models = require('../models/models');

module.exports = function(app) {
  
  app.get('/users', auth.requiresRole('admin'), function(req, res) {
    models.User.findAll().then(function(users) {
      res.send(users);
    });
  });
  
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });

  app.post('/login', auth.authenticate);
  
  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });
  
  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};