'use strict';
let models = require('../models/models'),
    api = require('./api');

exports.create = function(req, res) {
  api.create(req, res, models.Shift);
};

exports.update = function(req, res) {
  api.update(req, res, models.Shift);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.Shift);
};

exports.find = function(req, res) {
  api.findOne(req, res, models.Shift, {
    where: { id: req.params.id }
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.Shift);
};
