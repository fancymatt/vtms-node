'use strict';
let models = require('../models/models'),
    api = require('./api');

exports.create = function(req, res) {
  api.create(req, res, models.TeamMember);
};

exports.update = function(req, res) {
  api.update(req, res, models.TeamMember);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.TeamMember);
};

exports.find = function(req, res) {
  api.findOne(req, res, models.TeamMember, {
    where: { id: req.params.id }
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.TeamMember);
};
