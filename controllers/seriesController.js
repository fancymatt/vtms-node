var express = require('express'),
    router = express.Router(),
    models = require('../models/models.js');

router.get('/:series', function(req, res) {
  models.Series.findOne( {
    where: {
      id: req.params.series
    }, 
    include: [ models.LanguageSeries ],
    order: [ 'languageSeries.seriesTitle', 'languageSeries.fkLevel' ]
  }).then(function(series) {
    res.render('series/seriesOne', {
      title: "SeriesOne",
      series: series
    });
  });
});

module.exports = router;