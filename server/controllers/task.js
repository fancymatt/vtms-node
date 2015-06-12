var models = require('../models/models');

exports.getTaskById = function(req, res) {
  models.Task.find({
    where: {id: req.params.id},
    include: [ 
      {model: models.Lesson, include: [models.LanguageSeries, models.PublishDate] }, 
      {model: models.TeamMember}, 
      {model: models.TaskGlobal}]    
  }).then(function(task) {
    res.send(task);
  });
};

exports.getTasks = function(req, res) {
  models.Task.findAll({
    include: [ 
      {model: models.Lesson, include: [models.LanguageSeries, models.PublishDate] }, 
      {model: models.TeamMember}, 
      {model: models.TaskGlobal}]    
  }).then(function(tasks) {
    res.send(tasks);
  });
};