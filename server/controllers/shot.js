var models = require('../models/models');

exports.getShots = function(req, res) {
  models.Shot.findAll().then(function(shots) {
    if(shots) {
      res.send({shots: shots});
    } else {
      res.status(404).send({error: "No shots were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getShotById = function(req, res) {
  models.Shot.findOne({where: {id: req.params.id}}).then(function(shot) {
    if(shot) {
      res.send({shot: shot});
    } else {
      res.status(404).send({error: "No shot was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};