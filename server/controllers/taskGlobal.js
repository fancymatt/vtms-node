var models = require('../models/models');

exports.getTaskGlobals = function(req, res) {
  models.TaskGlobal.findAll().then(function(taskGlobals) {
    if(taskGlobals) {
      res.send({taskGlobals: taskGlobals});
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
      res.send({taskGlobal: taskGlobal});
    } else {
      res.status(404).send({error: "No task global was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};