var models = require('../models/models'),
    sequelize = require('../config/sequelize');

exports.getTasks = function(req, res) {
  models.Task.findAll().then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: "No tasks were found."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err})
  });
};

exports.getAssetsForLessonWithId = function(req, res) {
  models.Task.findAll({
    where: {fkLesson: req.params.id}, 
    include: [
      {model: models.TaskGlobal, required: true, where: {isAsset: true}},
      {model: models.Lesson, include: [models.PublishDate]}
    ]
  }).then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: "No tasks were found."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err})
  });
};

exports.getTaskById = function(req, res) {
  models.Task.findOne({
    where: {id: req.params.id},
    include: [ 
      {model: models.Lesson, include: [models.LanguageSeries, models.PublishDate] }, 
      {model: models.TeamMember}, 
      {model: models.TaskGlobal}]    
  }).then(function(task) {
    if(task) {
      res.send(task);
    } else {
      res.status(404).send({error: "No task was found with that ID."});
    }
  });
};

exports.updateTaskById = function(req, res) {
  models.Task.findById(req.body.id).then(function (task) {
    for (var key in req.query) {
      task[key] = req.query[key];
    }
    task.save()
      .then(function (task) {
        res.status(200);
        return res.send();
      })
      .catch(function (err) {
        res.status(400);
        return res.send({reason: err.toString()});
      });
  });
};

exports.getActiveTasks = function(req, res) {
  models.Task.findAll({
    where: {isActive: true},
    include: [ 
      {model: models.Lesson, include: [models.LanguageSeries, models.PublishDate] }, 
      {model: models.TeamMember}, 
      {model: models.TaskGlobal}]   
  }).then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: "There are no active tasks."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err})
  });
};

exports.getActiveTasksForTeamMemberWithId = function(req,  res) {
  models.Task.findAll({
    where: {
      isActive: true,
      fkTeamMember: req.params.id
    },
    include: [
      {model: models.Lesson, include: [models.LanguageSeries, models.PublishDate] },
      {model: models.TaskGlobal}
    ]
  }).then(function(tasks) {
    if(tasks) {
      res.send(tasks)
    } else {
      res.status(404).send({error: "There are no active tasks."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getActionableTasks = function(req, res) {
  models.Task.findAll({
    where: {
      isCompleted: false,
      isActionable: true
           },
    include: [ 
      {model: models.Lesson, include: [models.PublishDate]},
      {model: models.TaskGlobal}
      ]
  }).then(function(tasks) {
    if(tasks) {
      res.send({tasks: tasks});
    } else {
      res.status(404).send({error: "There are no actionable tasks."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err})
  });
};

exports.getRecentTasks = function(req, res) {
  models.Task.findAll({
    where: {isCompleted: true},
    order: [['timeCompleted', 'DESC']],
    include: [ 
      {model: models.Lesson, include: [models.LanguageSeries, models.PublishDate] }, 
      {model: models.TeamMember}, 
      {model: models.TaskGlobal}],
    limit: 50         
  }).then(function(tasks) {
    if(tasks) {
      res.send({tasks: tasks});
    } else {
      res.status(404).send({error: "There are no recent tasks."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err})
  });
};

exports.getTasksForLessonWithId = function (req, res) {
  models.Task.findAll({
    where: {fkLesson: req.params.id},
    include: [
      {model: models.Lesson, include: [models.PublishDate]},
      {model: models.TeamMember}, 
      {model: models.TaskGlobal}
    ]
  }).then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: "There are no tasks for the lesson with that ID."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getActionableTasksForTeamMemberWithId = function(req, res) {
  models.Task.findAll({
    where: {isActive: false, isCompleted: false, isActionable: true, fkTeamMember: req.params.id},
    include: [
      models.TaskGlobal,
      {
        model: models.Lesson,
        include: [{model: models.PublishDate, required: true}, 
                  models.LanguageSeries]
      }
    ],
    limit: 100
  }).then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: "There are no actionable tasks."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err})
  });
};
// Due date = lowest dueDate item - taskGlobal.completionValue
// Actionable = if(the sum of all the completed tasks' taskGlobal's completion value >= the )
