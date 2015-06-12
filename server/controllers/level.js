var models = require('../models/models');

exports.getLevels = function(req, res) {
  models.Level.findAll().then(function(levels) {
    if(levels) {
      res.send({levels: levels});
    } else {
      res.status(404).send({error: "No levels were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getLevelById = function(req, res) {
  models.Level.findOne({where: {id: req.params.id}}).then(function(level) {
    if(level) {
      res.send({level: level});
    } else {
      res.status(404).send({error: "No level was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};