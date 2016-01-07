'use strict';
let auth = require('../config/auth'),
    userRouter = require('./user'),
    seriesRouter = require('./series'),
    languageSeriesRouter = require('./languageSeries'),
    lessonRouter = require('./lesson'),
    teamMemberRouter = require('./teamMember'),
    taskRouter = require('./task'),
    shiftRouter = require('./shift'),
    channelRouter = require('./channel'),
    languageRouter = require('./language'),
    levelRouter = require('./level'),
    publishDateRouter = require('./publishDate'),
    platformRouter = require('./platform'),
    shotRouter = require('./shot'),
    talentRouter = require('./talent'),
    issueRouter = require('./issue'),
    activityRouter = require('./activity'),
    globalTaskRouter = require('./taskGlobal');

module.exports = function(app) {

  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  app.use('/api/activities', activityRouter);
  app.use('/api/channels', channelRouter);
  app.use('/api/global-tasks', globalTaskRouter);
  app.use('/api/issues', issueRouter);
  app.use('/api/languages', languageRouter);
  app.use('/api/language-series', languageSeriesRouter);
  app.use('/api/lessons', lessonRouter);
  app.use('/api/levels', levelRouter);
  app.use('/api/platforms', platformRouter);
  app.use('/api/publish-dates', publishDateRouter);
  app.use('/api/series', seriesRouter);
  app.use('/api/shifts', shiftRouter);
  app.use('/api/shots', shotRouter);
  app.use('/api/talents', talentRouter);
  app.use('/api/tasks', taskRouter);
  app.use('/api/team-members', teamMemberRouter);
  app.use('/api/users', userRouter);

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};
