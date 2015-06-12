var models = require('../models/models');

exports.getTaskComments = function(req, res) {
  models.TaskComment.findAll().then(function(taskComments) {
    if(taskComments) {
      res.send({taskComments: taskComments});
    } else {
      res.status(404).send({error: "No task comments were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getTaskCommentById = function(req, res) {
  models.TaskComment.findOne({where: {id: req.params.id}}).then(function(taskComment) {
    if(taskComment) {
      res.send({taskComment: taskComment});
    } else {
      res.status(404).send({error: "No task comment was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};