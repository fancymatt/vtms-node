var models = require('../models/models');

exports.getTaskGlobals = function(req, res) {
  models.TaskGlobal.findAll().then(function(taskGlobals) {
    if(taskGlobals) {
      res.send(taskGlobals);
    } else {
      res.status(404).send({error: "No task globals were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getTaskGlobalById = function(req, res) {
  models.TaskGlobal.findOne({where: {id: req.params.id}}).then(function(taskGlobal) {
    if(taskGlobal) {
      res.send(taskGlobal);
    } else {
      res.status(404).send({error: "No task global was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getGlobalTasksForSeries = function(req, res) {
  models.TaskGlobal.findAll({where: {fkSeries: req.params.id}}).then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: "No global tasks were found for a language series with that ID."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};