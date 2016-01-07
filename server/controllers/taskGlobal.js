'use strict';
let models = require('../models/models'),
    api = require('./api');

exports.create = function(req, res) {
  api.create(req, res, models.TaskGlobal);
};

exports.update = function(req, res) {
  api.update(req, res, models.TaskGlobal);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.TaskGlobal);
};

exports.find = function(req, res) {
  api.findOne(req, res, models.TaskGlobal, {
    where: { id: req.params.id }
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.TaskGlobal);
};

exports.getGlobalTasksForSeries = function(req, res) {
  models.TaskGlobal.findAll({where: {fkSeries: req.params.id}}).then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: 'No global tasks were found for a language series with that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};
