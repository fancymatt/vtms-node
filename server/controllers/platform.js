'use strict';
let models = require('../models/models'),
    api = require('./api');

exports.create = function(req, res) {
  api.create(req, res, models.Platform);
};

exports.update = function(req, res) {
  api.update(req, res, models.Platform);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.Platform);
};

exports.find = function(req, res) {
  api.findOne(req, res, models.Platform, {
    where: { id: req.params.id }
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.Platform);
};
