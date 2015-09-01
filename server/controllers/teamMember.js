var models = require('../models/models');

exports.getTeamMemberById = function(req, res) {
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
