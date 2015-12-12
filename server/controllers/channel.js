'use strict';
let models = require('../models/models');

exports.getChannels = function(req, res) {
  models.Channel.findAll({order: [['name', 'asc']]}).then(function(channels) {
    if(channels) {
      res.send(channels);
    } else {
      res.status(404).send({error: 'No channels were found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getChannelById = function(req, res) {
  models.Channel.findOne({where: {id: req.params.id}}).then(function(channel) {
    if(channel) {
      res.send(channel);
    } else {
      res.status(404).send({error: 'No channel was found with that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};
