var models = require('../models/models');

exports.getTeamMemberById = function(req, res) {
  models.TeamMember.find({
    where: {id: req.params.id},
    include: [ {model: models.Task, include: [models.LanguageSeries, models.Lesson, models.TaskGlobal] } ]
  }).then(function(teamMember) {
    res.send(teamMember);
  });
};

exports.getAllTeamMembers = function(req, res) {
  models.TeamMember.findAll({
      where: {isActive: true},
      include: [ {model: models.Task, where: {isActive: true}, required: false, include: [{model: models.Lesson, include: models.LanguageSeries}, models.TaskGlobal] }]
    }).then(function(teamMembers) {
    res.send(teamMembers);
  });
};

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