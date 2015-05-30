var express = require('express'),
    router = express.Router(),
    models = require('../models/models.js');

router.get('/:languageSeries', function(req, res) {
  models.LanguageSeries.findOne( {
    where: {
      id: req.params.languageSeries
    }, 
    include: [ models.Series, models.Lesson, models.Level, models.Language ],
    order: [ 'lessons.number' ]
  }).then(function(languageSeries) {
    res.render('languageSeries/languageSeries', {
      title: languageSeries.title + " | VTMS",
      languageSeries: languageSeries
    });
  });
});

module.exports = router;