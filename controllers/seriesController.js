var express = require('express'),
    router = express.Router(),
    models = require('../models/models.js');

router.get('/:series', function(req, res) {
  models.Series.findOne( {
    where: {
      id: req.params.series
    }, 
    include: [ {model: models.LanguageSeries, include: [{model: models.Level}, {model: models.Language}]} ],
    order: [ 'languageSeries.seriesTitle', 'languageSeries.fkLevel' ]
  }).then(function(series) {
    res.render('series/seriesOne', {
      title: series.title + " | VTMS",
      series: series
    });
  });
});

module.exports = router;