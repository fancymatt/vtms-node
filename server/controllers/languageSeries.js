'use strict';
let models = require('../models/models'),
    api = require('./api');

exports.create = function(req, res) {
  api.create(req, res, models.LanguageSeries);
};

exports.update = function(req, res) {
  api.update(req, res, models.LanguageSeries);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.LanguageSeries);
};

exports.find = function(req, res) {
  api.findOne(req, res, models.LanguageSeries, {
    where: { id: req.params.id }
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.LanguageSeries);
};

exports.getLessonsForLanguageSeriesWithId = function(req, res) {
  models.Lesson.findAll({
    where: {fkLanguageSeries: req.params.id},
    include: [models.PublishDate],
    order: 'number ASC'
  }).then(function(languageSeries) {
    if(languageSeries) {
      res.send(languageSeries);
    } else {
      res.status(404).send({error: 'No language series were found with a series of that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};
