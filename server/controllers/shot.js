'use strict';
let models = require('../models/models'),
    api = require('./api');

exports.create = function(req, res) {
  api.create(req, res, models.Shot);
};

exports.update = function(req, res) {
  api.update(req, res, models.Shot);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.Shot);
};

exports.find = function(req, res) {
  api.findOne(req, res, models.Shot, {
    where: { id: req.params.id }
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.Shot);
};

exports.getShotsForLessonWithId = function (req, res) {
  models.Shot.findAll({
    where: {fkLesson: req.params.id}
  }).then(function (shots) {
    if(shots) {
      res.send(shots);
    } else {
      res.status(404).send({error: 'There are no shots for the lesson with that ID.'});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
  });
};
