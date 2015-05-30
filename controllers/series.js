var express = require('express'),
    router = express.Router(),
    models = require('../models/models.js');

router.get('/', function(req, res) {
  models.Series.findAll().then(function(series) {
    res.render('series/seriesAll', {
      title: "Series",
      series: series
    });
  });
});

router.get('/:id', function(req, res) {
  models.Series.findOne( {
    where: {
      id: req.params.id
    }, 
    include: [ models.LanguageSeries ] 
  }).then(function(series) {
    res.render('series/seriesOne', {
      title: "SeriesOne",
      series: series
    });
  });
});

module.exports = router;