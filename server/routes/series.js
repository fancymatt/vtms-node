'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.series.get)
  .post(controllers.series.create);
router.route('/:id')
  .get(controllers.series.find)
  .put(controllers.series.update)
  .delete(controllers.series.delete);
router.route('/:id/language-series')
  .get(controllers.series.getLanguageSeriesForSeriesWithId);
router.route('/:id/lessons')
  .get(controllers.lesson.getLessonsForSeries);
router.route('/:id/global-tasks')
  .get(controllers.taskGlobal.getGlobalTasksForSeries);
router.route('/:id/global-assets')
  .get(controllers.taskGlobal.getGlobalAssetsForSeries);

module.exports = router;
