'use strict';
let models = require('../models/models');

exports.getTalents = function(req, res) {
  models.Talent.findAll().then(function(talents) {
    if(talents) {
      res.send({talents: talents});
    } else {
      res.status(404).send({error: 'No talents were found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getTalentById = function(req, res) {
  models.Talent.findOne({where: {id: req.params.id}}).then(function(talent) {
    if(talent) {
      res.send({talent: talent});
    } else {
      res.status(404).send({error: 'No talent was found with that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};
