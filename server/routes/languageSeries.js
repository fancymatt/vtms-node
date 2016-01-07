'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.languageSeries.get)
  .post(controllers.languageSeries.create);
router.route('/:id')
  .get(controllers.languageSeries.find)
  .put(controllers.languageSeries.update)
  .delete(controllers.languageSeries.delete);
router.route('/:id/lessons')
  .get(controllers.languageSeries.getLessonsForLanguageSeriesWithId);
router.route('/:id/xml')
  .get(controllers.publishDate.getXmlForLanguageSeriesWithId);

module.exports = router;
