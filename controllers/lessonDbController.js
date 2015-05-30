var express = require('express'),
    router = express.Router(),
    models = require('../models/models.js');

router.get('/', function(req, res) {
  models.Series.findAll({ order: [ 'title' ] }).then(function(series) {
    res.render('series/seriesAll', {
      title: "Lesson DB | VTMS",
      series: series
    });
  });
});

module.exports = router;