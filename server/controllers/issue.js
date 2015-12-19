'use strict';
let models = require('../models/models'),
    api = require('./api');

exports.create = function(req, res) {
  api.create(req, res, models.Issue);
};

exports.update = function(req, res) {
  api.update(req, res, models.Issue);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.Issue, {
    include: [models.Task]
  });
};

exports.find = function(req, res) {
  api.findOne(req, res, models.Issue, {
    where: {id:req.params.id}
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.Issue);
};

exports.getIssuesForLessonWithId = function(req, res) {
  api.findAll(req, res, models.Issue, {
    include: [
      {
        model: models.Task,
        include: [models.TaskGlobal]
      }
    ],
    where: {fkLesson: req.params.id}
  });
};

exports.getUnassignedIssuesForLesson = function(req, res) {
  api.findAll(req, res, models.Issue, {
    where: {fkLesson: req.params.id, fkTask: 0}
  });
};

exports.getLastIssueForLessonWithId = function(req, res) {
  api.findAll(req, res, models.Issue, {
    where: {
      fkLesson: req.params.id,
      isCompleted: true
    }
  });
//    order: [['timeCompleted', 'desc']],
//    limit: 1
};

exports.getIssuesForTeamMember = function(req, res) {
  api.findAll(req, res, models.Issue, {
    include: [
      {
        model: models.Task,
        where: {fkTeamMember: req.params.id},
        include: [models.TaskGlobal, {model: models.Lesson, include: [models.LanguageSeries]}]
      }
    ],
    where: {isCompleted: false}
  });
};

exports.getIssuesForTask = function(req, res) {
  api.findAll(req, res, models.Issue, {
    where: {fkTask: req.params.id, isCompleted: false}
  });
};
