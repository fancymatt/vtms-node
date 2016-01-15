'use strict';
let models = require('../models/models'),
    sequelize = require('../config/sequelize'),
    moment = require('moment-timezone'),
    api = require('./api');

exports.create = function(req, res) {
  var requiredProperties = ['fkTaskGlobal', 'fkTeamMember', 'fkLesson'];

  for (var i = 0; i < requiredProperties.length; i++) {
    var property = requiredProperties[i];
    if(!req.body[property]) {
      res.status(400);
      return res.send({error: 'Please specify a ' + property + ' property'});
    }
  }

  models.Task.create(req.body).then(function(newObject) {
    models.Task.findOne({where: {id: newObject.id}}).then(function(createdRecord) {
      var returnObject = {};
      returnObject.data = createdRecord;
      return res.status(201).send(returnObject);
    });
  }).catch(function(err) {
    res.status(400);
    return res.send({reason: err.errors[0].message});
  });


  console.log("Pretend we made a task");
  console.log(req.body);
  api.create(req, res, models.Task);
  //api.create(req, res, models.Task);
};

exports.update = function(req, res) {
  api.update(req, res, models.Task);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.Task);
};

exports.find = function(req, res) {
  api.findOne(req, res, models.Task, {
    where: {id:req.params.id},
    include: [
      {
        model: models.Lesson,
        include:[
          {
            model:models.LanguageSeries,
            include:[
              models.Series,
              models.Level,
              models.Language
            ]
          },
          models.PublishDate
        ]
      },
      { model: models.TeamMember },
      { model: models.TaskGlobal }
    ]
  });
};

exports.delete = function(req, res) {
  api.delete(req, res, models.Task);
};

exports.getAssetsForLesson = function(req, res) {
  api.findAll(req, res, models.Task, {
    where: {fkLesson: req.params.id},
    include: [
      {
        model: models.TaskGlobal,
        required: true,
        where: {isAsset: true}
      },
      {
        model: models.Lesson,
        include: [models.PublishDate]
      }
    ]
  });
};

exports.getActiveTasks = function(req, res) {
  api.findAll(req, res, models.Task, {
    where: {isActive: true},
    include: [
      {
        model: models.Lesson,
        include: [
          {
            model: models.LanguageSeries,
            include: [
              models.Language,
              models.Level,
              models.Series
            ]
          },
          models.PublishDate
        ]
      },
      { model: models.TeamMember },
      { model: models.TaskGlobal }
    ]
  });
};

exports.getActiveTasksForTeamMember = function(req,  res) {
  api.findOne(req, res, models.Task, {
    where: {isActive:true, fkTeamMember:req.params.id},
    include: [
      {
        model:models.Lesson,
        include: [
          {
            model:models.LanguageSeries,
            include:[
              models.Series,
              models.Level,
              models.Language
            ]
          },
          models.PublishDate
        ]
      },
      { model:models.TaskGlobal }
    ]
  });
};

exports.getActionableTasks = function(req, res) {
  api.findAll(req, res, models.Task, {
    where: {
      isCompleted: false,
      isActionable: true
    },
    include: [
      {
        model: models.Lesson,
        include: [models.PublishDate]
      },
      { model: models.TaskGlobal }
    ]
  });
};

exports.getRecentTasks = function(req, res) {
  api.findAll(req, res, models.Task, {
    where: { isCompleted: true },
    include: [
      {
        model:models.Lesson,
        include:[
          {
            model:models.LanguageSeries,
            include:[
              models.Series,
              models.Language
            ]
          },
          models.PublishDate
        ]
      },
      { model:models.TeamMember },
      { model:models.TaskGlobal }
    ]
  });
//    order: [['timeCompleted', 'DESC']],
//    limit: 50
};

exports.getTasksForLessonWithId = function (req, res) {
  api.findAll(req, res, models.Task, {
    where: {fkLesson: req.params.id},
    include: [
      {model: models.Lesson, include: [models.PublishDate]},
      {model: models.TeamMember},
      {model: models.TaskGlobal}
    ]
  });
};

exports.getLastTaskForLessonWithId = function (req, res) {
  api.findOne(req, res, models.Task, {
    where: {
      fkLesson: req.params.id,
      isCompleted: true
    },
    include: [
      {
        model: models.TaskGlobal,
        where: { isAsset: false }
      }
    ]
  });
//  order: [['timeCompleted', 'desc']],
//  limit: 1
};

exports.getTasksForTeamMemberWithIssues = function(req, res) {
  api.findAll(req, res, models.Task, {
    where:{
      isCompleted:true,
      fkTeamMember:req.params.id
    },
    include: [
      models.TaskGlobal,
      {
        model:models.Issue,
        where:{
          isCompleted:false
        },
        required:true
      },
      {
        model:models.Lesson,
        include:[
          {
            model:models.LanguageSeries,
            include:[
              models.Series,
              models.Level,
              models.Language
            ]
          },
          {
            model:models.PublishDate,
            required:true
          }
        ]
      }
    ]
  });
};

exports.getUndeliveredTasks = function(req, res) {
  api.findAll(req, res, models.Task, {
    where: {
      isCompleted:true,
      isDelivered:false
    },
    include: [
      {
        model:models.TaskGlobal,
        where:{
          isAsset:true
        }
      },
      {
        model:models.Lesson,
        include: [
          {
            model:models.LanguageSeries,
            include:[
              models.Series,
              models.Level,
              models.Language
            ]
          },
          {
            model:models.PublishDate,
            required:true
          }
        ]
      }
    ]
  });
};

exports.getUndeliveredTasksForTeamMember = function(req, res) {
  api.findAll(req, res, models.Task, {
    where:{
      isCompleted:true,
      isDelivered:false,
      fkTeamMember:req.params.id
    },
    include: [
      {
        model:models.TaskGlobal,
        where:{
          isAsset:true
        }
      },
      {
        model: models.Lesson,
        include: [
          {
            model: models.LanguageSeries,
            include: [
              models.Series,
              models.Level,
              models.Language
            ]
          },
          {
            model: models.PublishDate,
            required: true
          }
        ]
      }
    ]
  });
};

exports.getActionableTasksForTeamMember = function(req, res) {
  api.findAll(req, res, models.Task, {
    where: {
      isCompleted: false,
      isActionable: true,
      fkTeamMember: req.params.id
    },
    include: [
      models.TaskGlobal,
      {
        model: models.Lesson,
        include: [
          {
            model: models.PublishDate,
            where: {
              date: {$lt: moment(Date.now()).utc().add(6, 'months').format('YYYY-MM-DD')}
            },
            required: true
          },
          {
            model: models.LanguageSeries,
            include: [
              models.Series,
              models.Level,
              models.Language
            ]
          }
        ]
      }
    ]
  });
};
