var models = require('../models/models');

exports.getIssues = function(req, res) {
  models.Issue.findAll().then(function(issues) {
    if(issues) {
      res.send(issues);
    } else {
      res.status(404).send({error: "No issues were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getIssueById = function(req, res) {
  models.Issue.findOne({where: {id: req.params.id}}).then(function(issue) {
    if(issue) {
      res.send(issue);
    } else {
      res.status(404).send({error: "No issue was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getIssuesForLessonWithId = function(req, res) {
  models.Issue.findAll({
    include: [
      {
        model: models.Task,
        include: [models.TaskGlobal],
        where: {
          fkLesson: req.params.id
        }
      }
    ]
  }).then(function(issues) {
    if(issues) {
      res.send(issues);
    } else {
      res.status(494).send({error: "No issues were found for a lesson with that ID."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getIssuesForTeamMember = function(req, res) {
  models.Issue.findAll({
    include: [
      {
        model: models.Task,
        where: {fkTeamMember: req.params.id},
        include: [models.TaskGlobal, {model: models.Lesson, include: [models.LanguageSeries]}]
      }
    ],
    where: {isCompleted: false}
  }).then(function(issues) {
    if(issues) {
      res.send(issues);
    } else {
      res.status(494).send({error: "No issues were found for a team member with that ID."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.createIssue = function (req, res, next) {
  var userData = req.body;
  models.Issue.create(userData).then(function(issue) {
    issue.dataValues.id = issue.null;
    return res.send(issue);
  }).catch(function(err) {
      console.log(err);
      res.status(400);
      return res.send({reason: err});
    });
};

exports.updateIssue = function (req, res) {
  models.Issue.findById(req.params.id).then(function (issue) {
    for (var key in req.query) {
      issue[key] = req.query[key];
    }
    issue.save()
      .then(function (issue) {
        res.status(200);
        return res.send();
      })
      .catch(function (err) {
        res.status(400);
        return res.send({reason: err.toString()});
      });
  });
};

exports.deleteIssue = function (req, res) {
  models.Issue.findById(req.params.id).then(function (issue) {
    issue.destroy().then(function() {
      res.status(200).end();
    });
  }).catch(function(err) {
    return res.render('error', {
      error: err,
      status: 500
    });
  });
};