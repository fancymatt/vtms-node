'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.series.getSeries);
router.route('/:id')
  .get(controllers.series.getSeriesById);
router.route('/:id/language-series')
  .get(controllers.series.getLanguageSeriesForSeriesWithId);
router.route('/:id/lessons')
  .get(controllers.lesson.getLessonsForSeries);
router.route('/:id/global-tasks')
  .get(controllers.taskGlobal.getGlobalTasksForSeries);

module.exports = router;
