var auth = require('./auth'),
    controllers = require('../controllers/controllers'),
    models = require('../models/models');

module.exports = function(app) {
  
  app.get('/api/users', auth.requiresRole('admin'), controllers.user.getUsers);
  app.post('/api/users', auth.requiresRole('admin'), controllers.user.createUser);
  app.put('/api/users', auth.requiresRole('admin'),  controllers.user.updateUser);
  
  app.get('/api/series/:id', controllers.series.getSeriesById);
  app.get('/api/series', controllers.series.getSeries);
  app.get('/api/series/:id/languageSeries', controllers.series.getLanguageSeriesForSeriesWithId);
  app.get('/api/series/:id/lessons', controllers.lesson.getLessonsForSeries);
  app.get('/api/series/:id/globalTasks', controllers.taskGlobal.getGlobalTasksForSeries);
  
  app.get('/api/languageSeries', controllers.languageSeries.getLanguageSeries);
  //app.post('/api/languageSeries', controllers.languageSeries.newLanguageSeries); // not implemented
  app.get('/api/languageSeries/:id', controllers.languageSeries.getLanguageSeriesById);
  app.put('/api/languageSeries/:id', controllers.languageSeries.updateLanguageSeries);
  app.get('/api/languageSeries/:id/lessons', controllers.languageSeries.getLessonsForLanguageSeriesWithId);
  //app.delete('/api/languageSeries/:id', controllers.languageSeries.deleteLanguageSeries); // not implemented
  
  app.get('/api/lessons', controllers.lesson.getLessons);
  //app.post('/api/lessons', controllers.lesson.newLesson); // not implemented
  app.get('/api/lessons/upcoming', controllers.lesson.getUpcomingLessons);
  app.get('/api/lessons/qa', controllers.lesson.getQaLessons);
  app.get('/api/lessons/video-checkable', controllers.lesson.getVideoCheckableLessons);
  app.get('/api/lessons/archivable', controllers.lesson.getArchiveableLessons);
  app.get('/api/lessons/queued', controllers.lesson.getQueuedLessons);
  app.get('/api/lessons/readyToRender', controllers.lesson.getReadyToRenderLessons);
  app.get('/api/lessons/issues/team-member/:id', controllers.lesson.getLessonsForTeamMemberWithIssues);
  //app.get('/api/lessons/recentlyCompleted', controllers.lesson.getRecentlyCompletedLessons);
  app.get('/api/lessons/:id', controllers.lesson.getLessonById);
  app.delete('/api/lessons/:id', controllers.lesson.deleteLesson);
  app.get('/api/lessons/:id/issues', controllers.issue.getIssuesForLessonWithId);
  app.get('/api/lessons/:id/issues/unassigned', controllers.issue.getUnassignedIssuesForLesson);
  app.get('/api/lessons/:id/tasks', controllers.task.getTasksForLessonWithId);
  app.get('/api/lessons/:id/assets', controllers.task.getAssetsForLessonWithId);
  app.get('/api/lessons/:id/shots', controllers.shot.getShotsForLessonWithId);
  app.get('/api/lessons/:id/activities', controllers.activity.getActivitiesForLesson);
  app.get('/api/lessons/:id/publish-dates', controllers.publishDate.getPublishDatesForLessonWithId);
  app.put('/api/lessons/:id', controllers.lesson.updateLesson);
  //app.delete('/api/lessons/:id', controllers.lesson.deleteLesson); // not implemented
  
  app.get('/api/teamMembers', controllers.teamMember.getTeamMembers);
  app.get('/api/teamMembers/:id/tasks/actionable', controllers.task.getActionableTasksForTeamMemberWithId);
  app.get('/api/teamMembers/:id/tasks/active', controllers.task.getActiveTasksForTeamMemberWithId);
  app.get('/api/teamMembers/:id', controllers.teamMember.getTeamMemberById);
  app.get('/api/team-members/:id/tasks/issues', controllers.task.getTasksForTeamMemberWithIssues);
  app.get('/api/team-members/:id/tasks/undelivered', controllers.task.getUndeliveredTasksForTeamMember);
  app.get('/api/teamMembers/:id/issues', controllers.issue.getIssuesForTeamMember);
  app.get('/api/teamMembers/:id/activities', controllers.activity.getActivitiesForTeamMember);
  app.get('/api/teamMembers/:id/activities/recent', controllers.activity.getRecentActivitiesForTeamMember);
  app.get('/api/teamMembers/:id/activities/active', controllers.activity.getActiveActivityForTeamMember);
  //app.get('/api/teamMembers/:id/shifts', controllers.teamMember.getShiftsForTeamMemberWithId);
  
  app.get('/api/tasks', controllers.task.getTasks);
  app.get('/api/tasks/active', controllers.task.getActiveTasks);
  app.get('/api/tasks/actionable', controllers.task.getActionableTasks);
  app.get('/api/tasks/undelivered', controllers.task.getUndeliveredTasks);
  app.get('/api/tasks/recent', controllers.task.getRecentTasks);
  app.get('/api/tasks/:id', controllers.task.getTaskById);
  app.put('/api/tasks/:id', controllers.task.updateTaskById);
  app.get('/api/tasks/:id/issues', controllers.issue.getIssuesForTask);
  
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
  app.post('/api/publishDates', controllers.publishDate.createPublishDate);
  app.get('/api/publishDates/incomplete', controllers.publishDate.getIncompletePublishDates);
  app.get('/api/publishDates/surrounding', controllers.publishDate.getSurroundingPublishDates);
  app.get('/api/publishDates/:id', controllers.publishDate.getPublishDateById);
  app.put('/api/publishDates/:id', controllers.publishDate.updatePublishDate);
  app.delete('/api/publishDates/:id', controllers.publishDate.deletePublishDate);
  
  app.get('/api/platforms', controllers.platform.getPlatforms);
  app.get('/api/platforms/:id', controllers.platform.getPlatformById);
  
  app.get('/api/shots', controllers.shot.getShots);
  app.get('/api/shots/:id', controllers.shot.getShotById);
  app.post('/api/shots', controllers.shot.createShot);
  app.delete('/api/shots/:id', controllers.shot.deleteShot);
  app.put('/api/shots/:id', controllers.shot.updateShot);
  
  app.get('/api/talents', controllers.talent.getTalents);
  app.get('/api/talents/:id', controllers.talent.getTalentById);
  
  app.get('/api/issues', controllers.issue.getIssues);
  app.get('/api/issues/:id', controllers.issue.getIssueById);
  app.post('/api/issues', controllers.issue.createIssue);
  app.delete('/api/issues/:id', controllers.issue.deleteIssue);
  app.put('/api/issues/:id', controllers.issue.updateIssue);
  app.get('/api/issues/lessons/unassigned', controllers.lesson.getLessonsWithUnassignedIssues);
  
  app.get('/api/activities', controllers.activity.getActivities);
  app.get('/api/activities/active', controllers.activity.getActiveActivities);
  app.get('/api/activities/recent', controllers.activity.getRecentActivities);
  app.get('/api/activities/:id', controllers.activity.getActivityById);
  app.post('/api/activities', controllers.activity.createActivity);
  app.put('/api/activities/:id', controllers.activity.updateActivity);
  app.delete('/api/activities/:id', controllers.activity.deleteActivity);
  
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