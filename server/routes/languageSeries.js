'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.languageSeries.getLanguageSeries)
  .post(controllers.languageSeries.createNewLanguageSeries);
router.route('/:id')
  .get(controllers.languageSeries.getLanguageSeriesById)
  .put(controllers.languageSeries.updateLanguageSeries);
router.route('/:id/lessons')
  .get(controllers.languageSeries.getLessonsForLanguageSeriesWithId);
router.route('/:id/xml')
  .get(controllers.publishDate.getXmlForLanguageSeriesWithId);

module.exports = router;
