'use strict';
let models = require('../models/models');

exports.getLanguageSeries = function(req, res) {
  models.LanguageSeries.findAll().then(function(languageSeries) {
    if(languageSeries) {
      res.send(languageSeries);
    } else {
      res.status(404).send({error: 'No language series were found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.createNewLanguageSeries = function(req, res) {
  var userData = req.body;
  models.LanguageSeries.create(userData).then(function(languageSeries) {
    return res.send(languageSeries);
  }).catch(function(err) {
    res.status(400);
    return res.send({reason: err.errors[0].message});
  });
};


exports.getLanguageSeriesById = function(req, res) {
  models.LanguageSeries.find({
    where: {id: req.params.id},
    include: [models.Series]
  }).then(function(languageSeries) {
    if(languageSeries) {
      res.send(languageSeries);
    } else {
      res.status(404).send({error: 'No language series was found with that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
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

exports.updateLanguageSeries = function(req, res) {
  models.LanguageSeries.update(req.query, {where: {id: req.params.id}})
  .then(function() {
    res.status(200);
    return res.send();
  })
  .catch(function (err) {
    res.status(400);
    return res.send({reason: err.toString()});
  });
};
