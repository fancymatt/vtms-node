var models = require('../models/models');

exports.getIssues = function(req, res) {
  models.Issue.findAll().then(function(issues) {
    if(issues) {
      res.send({issues: issues});
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
      res.send({taskComment: issue});
    } else {
      res.status(404).send({error: "No issue was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};