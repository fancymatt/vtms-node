'use strict';
let models = require('../models/models');

exports.getPlatforms = function(req, res) {
  models.Platform.findAll().then(function(platforms) {
    if(platforms) {
      res.send(platforms);
    } else {
      res.status(404).send({error: 'No platforms were found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getPlatformById = function(req, res) {
  models.Platform.findOne({where: {id: req.params.id}}).then(function(platform) {
    if(platform) {
      res.send(platform);
    } else {
      res.status(404).send({error: 'No platform was found with that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};
