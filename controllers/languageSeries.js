var express = require('express'),
    router = express.Router(),
    LanguageSeries = require('../models/languageSeries.js');

router.get('/', function(req, res) {
  LanguageSeries.findAll().then(function(languageSeries) {
    res.render('series/seriesAll', {
      title: "Series",
      series: series
    });
  });
});

module.exports = router;