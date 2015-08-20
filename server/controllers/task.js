var models = require('../models/models'),
    sequelize = require('../config/sequelize'),
    moment = require('moment');

var getList = function(req, res, query) {
  models.Task.findAll(query).then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: 'No tasks were found.'});
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).send({error: err});
  });
};

var getOne = function(req, res, query) {
  models.Task.findOne(query).then(function(task) {
    if(task) {
      res.send(task);
    } else {
      res.status(404).send({error: 'No task was found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

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
  console.log("  WELCOME TO THE PROBLEMATIC UPDATETASKBYID FUNCTION");
  console.log("req", req);
  console.log("The id we're using to search with is: " + req.params.id);
  models.Task.findOne({
    where: {id: req.params.id}
  }).then(function (task) {
    console.log("found task", task);
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
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send({reason: err.toString()})
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
      res.status(200).send({error: "There are no active tasks."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err})
  });
};

exports.getActiveTasksForTeamMemberWithId = function(req,  res) {
  models.Task.findOne({
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
      res.status(200).send({error: "There are no active tasks."});
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

exports.getTasksForTeamMemberWithIssues = function(req, res) {
  models.Task.findAll({
    where: {isCompleted: true, fkTeamMember: req.params.id},
    include: [
      models.TaskGlobal,
      {model: models.Issue, where: {isCompleted: false}, required: true},
      {model: models.Lesson, include: [{model: models.LanguageSeries}, {model: models.PublishDate, required: true}]}
    ]
  }).then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: "No tasks found"});
    }
  }).catch(function(err) {
    res.status(500).send({error: err})
  });
};

exports.getUndeliveredTasks = function(req, res) {
  getList(req, res, {
    where: {
      isCompleted: true,
      isDelivered: false
    },
    include: [
      {model: models.TaskGlobal, where: {isAsset: true}},
      {model: models.Lesson, include: [{model: models.LanguageSeries}, {model: models.PublishDate, required: true}]}
    ]
  });
};

exports.getUndeliveredTasksForTeamMember = function(req, res) {
  getList(req, res, {
    where: {
      isCompleted: true,
      isDelivered: false,
      fkTeamMember: req.params.id
    },
    include: [
      {model: models.TaskGlobal, where: {isAsset: true}},
      {model: models.Lesson, include: [{model: models.LanguageSeries}, {model: models.PublishDate, required: true}]}
    ]
  });
};

exports.getActionableTasksForTeamMemberWithId = function(req, res) {
  models.Task.findAll({
    where: {isCompleted: false, isActionable: true, fkTeamMember: req.params.id},
    include: [
      models.TaskGlobal,
      {
        model: models.Lesson,
        include: [{model: models.PublishDate,
                   where: {date: {$lt: moment(Date.now()).add(3, 'months').format('YYYY-MM-DD')}},
                   required: true},
                  models.LanguageSeries]
      }
    ]
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
