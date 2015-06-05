var models = require('../models/models');

exports.getSeries = function(req, res) {
  models.Series.findAll().then(function(series) {
    res.send(series);
  });
};

exports.getSeriesById = function(req, res) {
  models.Series.find({
    where: {id: req.params.id},
    include: [ {model: models.LanguageSeries,
                include: [ models.Level, models.Language ] } ]
  }).then(function(series) {
    res.send(series);
  });
};