var models = require('../models/models');

exports.getTeamMemberById = function(req, res) {
  console.log("Searching for a Team Member with ID of " + req.params.id);
  models.TeamMember.findOne({
    where: {id: req.params.id}
  }).then(function(teamMember) {
    if(teamMember) {
      res.send(teamMember);
    } else {
      res.status(404).send({error: "No team member found with that ID."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getTeamMembers = function(req, res) {
  models.TeamMember.findAll({
      where: {isActive: true}
    }).then(function(teamMembers) {
    if(teamMembers) {
      res.send(teamMembers);
    } else {
      res.status(404).send({error: "No team members found"});
    }
  });
};

exports.getTasksForTeamMemberWithId = function(req, res) {
  models.Task.findAll({
    where: {fkTeamMember: req.params.id, isCompleted: false},
    include: [models.TaskGlobal, {
      model: models.Lesson, 
      include: [{
        model: models.PublishDate,
        required: true
      },{
        model: models.LanguageSeries
      }]
    }],
    orderBy: ["lesson.publishDates.date", "ASC"],
    limit: 100
  }).then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: "No tasks were found for a team member with that ID."});
    }
  });
};
// Due date = lowest dueDate item - taskGlobal.completionValue
// Actionable = if(the sum of all the completed tasks' taskGlobal's completion value >= the )

exports.updateLesson = function(req, res) {
  models.Lesson.findById(req.body.id).then(function(lesson) {
    for(var key in req.query) {
      lesson[key] = req.query[key];
    }
    lesson.save()
      .then(function(lesson) {
        res.status(200);
        return res.send();
      })
      .catch(function(err) {
        res.status(400);
        return res.send({reason: err.toString()});
      });
  
  });
};