var auth = require('./auth'),
    controllers = require('../controllers/controllers')
    models = require('../models/models');

module.exports = function(app) {
  
  app.get('/api/users', auth.requiresRole('admin'), controllers.user.getUsers);
  app.post('/api/users', controllers.user.createUser);
  app.put('/api/users', auth.requiresRole('admin'),  controllers.user.updateUser);
  
  app.get('/api/series/:id', controllers.series.getSeriesById);
  app.get('/api/series', controllers.series.getSeries);
  app.get('/api/series/:id/languageSeries', controllers.series.getLanguageSeriesForSeriesWithId);
  
  app.get('/api/languageSeries', controllers.languageSeries.getLanguageSeries);
  //app.post('/api/languageSeries', controllers.languageSeries.newLanguageSeries); // not implemented
  app.get('/api/languageSeries/:id', controllers.languageSeries.getLanguageSeriesById);
  app.put('/api/languageSeries/:id', auth.requiresRole('admin'),  controllers.languageSeries.updateLanguageSeries);
  app.get('/api/languageSeries/:id/lessons', controllers.languageSeries.getLessonsForLanguageSeriesWithId);
  //app.delete('/api/languageSeries/:id', controllers.languageSeries.deleteLanguageSeries); // not implemented
  
  app.get('/api/lessons', controllers.lesson.getLessons);
  //app.post('/api/lessons', controllers.lesson.newLesson); // not implemented
  app.get('/api/lessons/:id', controllers.lesson.getLessonById);
  app.get('/api/lessons/:id/tasks', controllers.lesson.getTasksForLessonWithId);
  app.get('/api/lessons/:id/shots', controllers.lesson.getShotsForLessonWithId);
  app.put('/api/lessons/:id', auth.requiresRole('admin'), controllers.lesson.updateLesson);
  //app.delete('/api/lessons/:id', controllers.lesson.deleteLesson); // not implemented
  
  app.get('/api/teamMembers', controllers.teamMember.getTeamMembers);
  app.get('/api/teamMembers/:id', controllers.teamMember.getTeamMemberById);
  app.get('/api/teamMembers/:id/tasks/actionable', controllers.teamMember.getActionableTasksForTeamMemberWithId);
  //app.get('/api/teamMembers/:id/shifts', controllers.teamMember.getShiftsForTeamMemberWithId);
  
  app.get('/api/tasks', controllers.task.getTasks);
  app.get('/api/tasks/active', controllers.task.getActiveTasks);
  app.get('/api/tasks/actionable', controllers.task.getActionableTasks);
  app.get('/api/tasks/recent', controllers.task.getRecentTasks);
  app.get('/api/tasks/:id', controllers.task.getTaskById);
  
  app.get('/api/activities', controllers.activity.getActivities);
  app.get('/api/activities/:id', controllers.activity.getActivityById);
  
  app.get('/api/shifts', controllers.shift.getShifts);
  app.get('/api/shifts/:id', controllers.shift.getShiftById);
  //app.get('/api/shifts/:id/activities', controllers.shift.getActivitiesForShiftWithId);
  
  app.get('/api/channels', controllers.channel.getChannels);
  app.get('/api/channels/:id', controllers.channel.getChannelById);
  
  app.get('/api/languages', controllers.language.getLanguages);
  app.get('/api/languages/:id', controllers.language.getLanguageById);
  
  app.get('/api/levels', controllers.level.getLevels);
  app.get('/api/levels/:id', controllers.level.getLevelById);
  
  app.get('/api/publishDates', controllers.publishDate.getPublishDates);
  app.get('/api/publishDates/:id', controllers.publishDate.getPublishDateById);
  
  app.get('/api/shots', controllers.shot.getShots);
  app.get('/api/shots/:id', controllers.shot.getShotById);
  
  app.get('/api/talents', controllers.talent.getTalents);
  app.get('/api/talents/:id', controllers.talent.getTalentById);
  
  app.get('/api/taskComments', controllers.taskComment.getTaskComments);
  app.get('/api/taskComments/:id', controllers.taskComment.getTaskCommentById);
  
  app.get('/api/taskGlobals', controllers.taskGlobal.getTaskGlobals);
  app.get('/api/taskGlobals/:id', controllers.taskGlobal.getTaskGlobalById);
  
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