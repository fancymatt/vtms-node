var express = require('express'),
    router = express.Router(),
    Series = require('../models/series.js');

router.get('/', function(req, res) {
  Series.findAll().then(function(series) {
    res.render('main', {
      title: "Series",
      series: series
    });
  });
});

module.exports = router;