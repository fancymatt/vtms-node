'use strict';
let models = require('../models/models'),
    api = require('./api');

exports.create = function(req, res) {
  api.create(req, res, models.Series);
};

exports.update = function(req, res) {
  api.update(req, res, models.Series);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.Series);
};

exports.find = function(req, res) {
  api.findOne(req, res, models.Series, {
    where: { id: req.params.id }
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.Series);
};

exports.getLanguageSeriesForSeriesWithId = function(req, res) {
  models.LanguageSeries.findAll({
    where: {fkSeries: req.params.id},
    include: [ models.Level, models.Language, models.Series ]
  }).then(function(languageSeries) {
    if(languageSeries) {
      res.send(languageSeries);
    } else {
      res.status(404).send({error: 'No language series found for a series with that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: 'No language series found.'});
  });
};
