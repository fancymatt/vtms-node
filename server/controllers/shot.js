'use strict';
let models = require('../models/models');

exports.getShots = function(req, res) {
  models.Shot.findAll().then(function(shots) {
    if(shots) {
      res.send({shots: shots});
    } else {
      res.status(404).send({error: 'No shots were found.'});
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
      res.status(404).send({error: 'No shot was found with that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
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

exports.createShot = function (req, res, next) {
  var userData = req.body;
  models.Shot.create(userData).then(function(shot) {
    shot.dataValues.id = shot.null;
    return res.send(shot);
  }).catch(function(err) {
      res.status(400);
      return res.send({reason: err.errors[0].message});
    });
};

exports.updateShot = function (req, res) {
  models.Shot.update(req.query, {where: {id: req.params.id}})
  .then(function() {
    res.status(200);
    return res.send();
  })
  .catch(function (err) {
    res.status(400);
    return res.send({reason: err.toString()});
  });
};

exports.deleteShot = function (req, res) {
  models.Shot.findById(req.params.id).then(function (shot) {
    if(shot) {
      shot.destroy().then(function() {
        res.status(200).end();
      });
    } else {
      res.status(404).send({error: 'No shot was found with that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};
