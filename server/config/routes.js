var auth = require('./auth'),
    users = require('../controllers/users'),
    series = require('../controllers/series'),
    languageSeries = require('../controllers/languageSeries'),
    lesson = require('../controllers/lesson'),
    teamMembers = require('../controllers/teamMember'),
    models = require('../models/models');

module.exports = function(app) {
  
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);
  
  app.get('/api/series/:id', series.getSeriesById);
  app.get('/api/series', series.getSeries);
  
  //app.get('/api/languageSeries', languageSeries.getAllLanguageSeries); // not implemented
  //app.post('/api/languageSeries', languageSeries.newLanguageSeries); // not implemented
  app.get('/api/languageSeries/:id', languageSeries.getLanguageSeriesById);
  app.put('/api/languageSeries/:id', languageSeries.updateLanguageSeries);
  //app.delete('/api/languageSeries/:id', languageSeries.deleteLanguageSeries); // not implemented
  
  // app.get('/api/lessons', lesson.getAllLessons); // not implemented
  //app.post('/api/lessons', lesson.newLesson); // not implemented
  app.get('/api/lessons/:id', lesson.getLessonById);
  app.put('/api/lessons/:id', lesson.updateLesson);
  //app.delete('/api/lessons/:id', lesson.deleteLesson); // not implemented
  
  app.get('/api/teamMembers', teamMembers.getAllTeamMembers);
  app.get('/api/teamMembers/:id', teamMembers.getTeamMemberById);
  
  
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });

  app.post('/login', auth.authenticate);
  
  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });
  
  app.all('/api/*', function(req, res) {
    res.send(404);
  });
  
  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};