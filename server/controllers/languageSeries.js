'use strict';
let models = require('../models/models'),
    lesson = require('./lesson'),
    api = require('./api');

exports.create = function(req, res) {
  var requiredProperties = ['fkLanguage', 'fkLevel', 'fkSeries', 'title', 'count'];

  for (var i = 0; i < requiredProperties.length; i++) {
    var property = requiredProperties[i];
    if(!req.body[property]) {
      res.status(400);
      return res.send({error: 'Please specify a ' + property + ' property'});
    }
  }

  models.LanguageSeries.create(req.body).then(function(newObject) {
    models.LanguageSeries.findOne({where: {id: newObject.id}}).then(function(createdRecord) {
      for(var i = 0; i < req.body.count; i++) {
        lesson.create({body: {
          fkLanguageSeries: createdRecord.id,
          number: i + 1,
          title: 'Lesson ' + (i + 1)
        }}, res);
      }

      var returnObject = {};
      returnObject.data = createdRecord;
      return res.status(201).send(returnObject);
    });
  }).catch(function(err) {
    res.status(400);
    return res.send({reason: err.errors[0].message});
  });
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

exports.getSeriesForLanguageSeriesWithId = function(req, res) {
  models.LanguageSeries.findOne({where: {id: req.params.id}, include: [models.Series]}).then(function(languageSeries) {
    if (languageSeries) {
      res.send(languageSeries.series);
    } else {
      res.status(404).send({error: 'No series found for a language series of that ID'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};
