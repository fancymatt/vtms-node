'use strict';
let models = require('../models/models'),
    api = require('./api');

exports.create = function(req, res) {
  console.log("****OKAY, I'LL CREATE A LESSON");

  var requiredProperties = ['fkLanguageSeries', 'number', 'title'];

  for (var i = 0; i < requiredProperties.length; i++) {
    var property = requiredProperties[i];
    if(!req.body[property]) {
      res.status(400);
      return res.send({error: 'Please specify a ' + property + ' property'});
    }
  }

  models.Lesson.create(req.body).then(function(newObject) {
    console.log("*****I CREATED A LESSON");

    models.Lesson.findOne({where: {id: newObject.id}}).then(function(createdRecord) {

      // Get global tasks
      models.Series.findOne({
        include: [
          {
            model: models.LanguageSeries,
            where: {
              id: createdRecord.fkLanguageSeries
            }
          },
          models.TaskGlobal
        ]
      }).then(function(series) {
        var globalTasks = series.taskGlobals;
        for(var i = 0; i < globalTasks.length; i++) {
          models.Task.create({
            fkTaskGlobal: globalTasks[i].id,
            fkLesson: createdRecord.id,
            fkTeamMember: globalTasks[i].defaultTeamMember
          });
        }
        return res.status(201);
      }).catch(function(err) {
        console.log(err);
        return res.status(400);
      });
    });



  }).catch(function(err) {
    return res.status(400);
  });
};

exports.update = function(req, res) {
  api.update(req, res, models.Lesson);
};

exports.get = function(req, res) {
  api.findAll(req, res, models.Lesson);
};

exports.find = function(req, res) {
  api.findOne(req, res, models.Lesson, {
    where: { id: req.params.id }
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.Lesson);
};

exports.getLessonsWithUnassignedIssues = function (req, res) {
  models.Lesson.findAll({
    include: [
      {model: models.LanguageSeries, include: [ models.Series, models.Level, models.Language] },
      models.PublishDate,
      {
        model: models.Issue,
        required: true,
        where: {
          fkTask: {
            $lt: 1
          }
        }
      }
    ]
  }).then(function(lessons) {
    if (lessons) {
      res.send(lessons);
    } else {
      res.status(404).send({error: 'No pending unclassified issues.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getUpcomingLessons = function (req, res) {
    models.Lesson.findAll({
      include: [
        {
          model: models.PublishDate,
          required: true,
        //attributes: ['date', [sequelize.literal('MIN(date)')]]
        },
        {
          model: models.LanguageSeries,
          include: [ models.Series, models.Level, models.Language]
        }
      ],
      where: { filesMoved: false },
      groupBy: models.Lesson,
      limit: 50
    }).then(function (lessons) {
    if (lessons) {
      res.send(lessons);
    } else {
      res.send(404).send({error: 'No lessons found.'});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
  });
};


exports.getQaLessons = function (req, res) {
  models.Lesson.findAll({
    where: {
      checkedLanguage: false,
      isCheckable: true,
      exportedTime: {
        $gt: 0
      }
    },
    include: [
      {model: models.LanguageSeries, include: [ models.Series, models.Level, models.Language] },
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons) {
      res.send(lessons);
    } else {
      res.send(404).send({error: 'No lessons found.'});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
  });
};

exports.getVideoCheckableLessons = function (req, res) {
  models.Lesson.findAll({
    where: {
      filesMoved: false,
      checkedLanguage: true,
      checkedVideo: false,
      allTasksCompleted: true,
      isQueued: false,
      incompleteIssues: {$lt: 1}
    },
    include: [
      {model: models.Issue, as: 'lastIssue'},
      {model: models.Task, as: 'lastTask', include: [models.TaskGlobal, models.TeamMember]},
      {model: models.LanguageSeries, include: [ models.Series, models.Level, models.Language] },
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons) {
      var checkableLessons = [];
      for(var i = 0; i < lessons.length; i++) {
        if(lessons[i].lastIssueTime < lessons[i].queuedTime && lessons[i].lastTaskTime < lessons[i].queuedTime) {
          checkableLessons.push(lessons[i]);
        }
      }
      res.send(checkableLessons);
    } else {
      res.status(404).send({error: 'No lessons found.'});
    }
  }).catch(function (err) {
    res.status(500).send(err);
  });
};

exports.getArchiveableLessons = function (req, res) {
  models.Lesson.findAll({
    where: {
      checkedVideo: true,
      checkedLanguage: true,
      exportedTime: {
        $gt: 0
      },
      filesMoved: false
    },
    include: [
      {model: models.LanguageSeries, include: [ models.Series, models.Level, models.Language] },
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons) {
      res.send(lessons);
    } else {
      res.send(404).send({error: 'No lessons found.'});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
  });
};

exports.getQueuedLessons = function (req, res) {
  models.Lesson.findAll({
    where: {
      filesMoved: false,
      isQueued: true
    },
    include: [
      {model: models.LanguageSeries, include: [ models.Series, models.Level, models.Language] },
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons.length > 0) {
      res.send(lessons);
    } else {
      res.status(404).send({error: 'No lessons found.'});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
  });
};

exports.getReadyToRenderLessons = function (req, res) {
  models.Lesson.findAll({
    where: {
      filesMoved: false,
      isCheckable: true,
      isQueued: false,
      incompleteIssues: {$lt: 1}
    },
    include: [
      {model: models.Issue, as: 'lastIssue'},
      {model: models.Task, as: 'lastTask', include: [models.TaskGlobal, models.TeamMember]},
      {model: models.LanguageSeries, include: [ models.Series, models.Level, models.Language] },
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons) {
      var renderQueueLessons = [];
      for(var i = 0; i < lessons.length; i++) {
        // Cannot insert value as null, so this catches lessons that were unqueued
        if(lessons[i].queuedTime === '0000-00-00 00:00:00') { lessons[i].queuedTime = null; }
        if(lessons[i].lastTaskTime > lessons[i].queuedTime || lessons[i].lastIssueTime > lessons[i].queuedTime || lessons[i].queuedTime === '0000-00-00 00:00:00') {
          if(lessons[i].checkedLanguage) {
            // if it's checked language, then we shouldn't export again until all tasks are completed
            if(lessons[i].allTasksCompleted) {
              renderQueueLessons.push(lessons[i]);
            }
          } else {
            renderQueueLessons.push(lessons[i]);
          }
        }
      }
      res.send(renderQueueLessons);
    } else {
      res.status(404).send({error: 'No lessons found.'});
    }
  }).catch(function (err) {
    res.status(500).send(err);
  });
};

exports.getLessonsForSeries = function(req, res) {
   getList(req, res, {
     include: [
       {
         model: models.LanguageSeries,
         include: [
           {model: models.Series, where: {fkSeries: req.params.id}},
           models.Level,
           models.Language
         ]
       }
      ]
   });
};

exports.getLessonsWithNoTRT = function(req, res) {
  getList(req, res, {
    where: {
      filesMoved: true,
      trt: 0
    },
    include: [
      models.PublishDate,
       {
         model: models.LanguageSeries,
         include: [
           models.Series,
           models.Level,
           models.Language
         ]
       }
      ]
  });
};

exports.getLessonsForTeamMemberWithIssues = function(req, res) {
  getList(req, res, {
    include: [
      {model: models.LanguageSeries, include: [ models.Series, models.Level, models.Language] },
      {
        model: models.Task,
        where: {fkTeamMember: req.params.id},
        include: [models.TaskGlobal, {
          model: models.Issue,
          where: {isCompleted: false},
          required: true
        }]
      }
    ]
  });
};
