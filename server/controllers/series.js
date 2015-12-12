'use strict';
let models = require('../models/models');

exports.getSeries = function(req, res) {
  models.Series.findAll().then(function(series) {
    if(series) {
      res.send(series);
    } else {
      res.status(404).send({error: 'No series were found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getSeriesById = function(req, res) {
  models.Series.find({
    where: {id: req.params.id}
  }).then(function(series) {
    if(series) {
      res.send(series);
    } else {
      res.status(404).send({error: 'No series found with that ID.'});
    }
  }).catch(function(err) {
    res.send(500).send({error: 'No series found.'});
  });
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
