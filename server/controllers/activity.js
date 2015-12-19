'use strict';
let models = require('../models/models'),
    moment = require('moment-timezone'),
    api = require('./api');

exports.create = function(req, res) {
  api.create(req, res, models.Activity);
};

exports.update = function(req, res) {
  api.update(req, res, models.Activity);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.Activity, {
    include: [models.Shift]
  });
};

exports.find = function(req, res) {
  api.findOne(req, res, models.Activity, {
    where: {id:req.params.id}
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.Activity);
};

exports.getActiveActivities = function(req, res) {
  api.findAll(req, res, models.Activity, {
    where: {isActive: true}
  });
};

exports.getRecentActivities = function(req, res) {
  api.findAll(req, res, models.Activity, {
    include: [
      {model: models.TeamMember},
      {
        model: models.Shift,
        include: [models.TeamMember]
      },
      {
        model: models.Task,
        include: [
          {
            model: models.Lesson,
            include: [models.LanguageSeries]
          },
          models.TaskGlobal
        ]
      }
    ]
  });
  //limit: 50, order: [['timeStart','desc']]
};

exports.getActivitiesForLesson = function(req, res) {
  api.findAll(req, res, models.Activity, {
    include: [
      {
        model: models.Task,
        include: [
          {
            model: models.Lesson,
            required: true,
            where: {
              id: req.params.id
            }
          },
          {
            model: models.TaskGlobal
          }
        ]
      },
      {
        model: models.TeamMember
      }
    ]
  });
  // order: [['timeEnd','asc']],
};

exports.getActivitiesForTeamMember = function(req, res) {
  api.findAll(req, res, models.Activity, {
    where: {fkTeamMember: req.params.id},
    include: [
      {
        model: models.Task,
        include: [
          {
            model: models.Lesson,
            include: [models.LanguageSeries]
          },
          models.TaskGlobal
        ]
      }
    ]
  });
};

exports.getRecentActivitiesForTeamMember = function(req, res) {
  api.findAll(req, res, models.Activity, {
    where: {
      fkTeamMember: req.params.id,
      timeStart: {
        $gt: moment().utc().subtract(10, 'hours').format('YYYY-MM-DD HH:mm:ss')
      }
    },
    include: [
      {
        model: models.Task,
        include: [
          {
            model: models.Lesson,
            include: [models.LanguageSeries]
          },
          models.TaskGlobal
        ]
      }
    ]
  });
};

exports.getActiveActivityForTeamMember = function(req, res) {
  api.findOne(req, res, models.Activity, {
    where: {
      fkTeamMember:
      req.params.id,
      isActive: true
    }
  });
  // order: [['timeStart']]});
};
