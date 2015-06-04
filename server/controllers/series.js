var models = require('../models/models');

exports.getSeries = function(req, res) {
  models.Series.findAll().then(function(series) {
    res.send(series);
  });
};