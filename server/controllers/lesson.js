var models = require('../models/models');

var getList = function(req, res, query) {
  models.Lesson.findAll(query).then(function(lessons) {
    if(lessons) {
      res.send(lessons);
    } else {
      res.status(404).send({error: 'No lessons were found.'});
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).send({error: err});
  });
};

var getOne = function(req, res, query) {
  models.Lesson.findOne(query).then(function(lesson) {
    if(lesson) {
      res.send(lesson);
    } else {
      res.status(404).send({error: 'No lesson was found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getLessons = function (req, res) {
  models.Lesson.findAll().then(function (lessons) {
    if (lessons) {
      res.send(lessons);
    } else {
      res.send(404).send({error: "No lessons found."});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
  });
};

exports.getLessonById = function (req, res) {
  models.Lesson.findOne({
    where: {id: req.params.id},
    include: [
      {model: models.LanguageSeries, include: [ models.Series] } ]
  }).then(function (lesson) {
    if (lesson) {
      res.send(lesson);
    } else {
      res.status(404).send({error: "There is no lesson with that ID."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getLessonsWithUnassignedIssues = function (req, res) {
  models.Lesson.findAll({
    include: [
      models.LanguageSeries,
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
      res.status(404).send({error: "No pending unclassified issues."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.updateLesson = function (req, res) {
  models.Lesson.findById(req.body.id).then(function (lesson) {
    for (var key in req.query) {
      lesson[key] = req.query[key];
    }
    lesson.save()
      .then(function (lesson) {
        res.status(200);
        return res.send();
      })
      .catch(function (err) {
        res.status(400);
        return res.send({reason: err.toString()});
      });
  });
};

exports.getUpcomingLessons = function (req, res) {
    models.Lesson.findAll({
      include: {
        model: models.PublishDate, 
        required: true, 
        //attributes: ['date', [sequelize.literal('MIN(date)')]]
      },
      where: { filesMoved: false },
      groupBy: models.Lesson,
      limit: 50
    }).then(function (lessons) {
    if (lessons) {
      res.send(lessons);
    } else {
      res.send(404).send({error: "No lessons found."});
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
      {model: models.LanguageSeries, include: [models.Language]},
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons) {
      res.send(lessons);
    } else {
      res.send(404).send({error: "No lessons found."});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
  });
};

exports.getVideoCheckableLessons = function (req, res) {
  
  // TODO: Take into account the last issue and last task
  
  models.Lesson.findAll({
    where: {
      checkedVideo: false,
      checkedLanguage: true,
      isCheckable: true,
      allTasksCompleted: true,
      exportedTime: {
        $gt: 0
      },
      filesMoved: false
    },
    include: [
      models.LanguageSeries,
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons) {  
      res.send(lessons);
    } else {
      res.send(404).send({error: "No lessons found."});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
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
      models.LanguageSeries,
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons) {
      res.send(lessons);
    } else {
      res.send(404).send({error: "No lessons found."});
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
      models.LanguageSeries,
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons.length > 0) {
      res.send(lessons);
    } else {
      res.status(404).send({error: "No lessons found."});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
  });
};

exports.deleteLesson = function (req, res) {
  models.Lesson.findById(req.params.id).then(function (lesson) {
    if(lesson) {
      lesson.destroy().then(function() {
        res.status(200).end();
      });
    } else {
      res.status(404).send({error: "No lesson was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getReadyToRenderLessons = function (req, res) {
  // TODO: With no issues.
  models.Lesson.findAll({
    where: {
      filesMoved: false,
      isCheckable: true,
      isQueued: false
    },
    include: [
      {
        model: models.Task,
        include: [
          models.Issue,
          models.TaskGlobal,
          models.TeamMember
        ]
      },
      {model: models.LanguageSeries},
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons) {
      var renderQueueLessons = [];
      for(var i = 0; i < lessons.length; i++) {
        // each lesson
        for(var j = 0; j < lessons[i].tasks.length; j++) {
          // each task
          if(lessons[i].tasks[j].dataValues.isCompleted) {
            var completedTime = new Date(lessons[i].tasks[j].dataValues.timeCompleted);
            var queuedTime = new Date(lessons[i].dataValues.queuedTime);
            if(completedTime > queuedTime) {
              if(!lessons[i].dataValues.mostRecentTask) {
                lessons[i].dataValues.mostRecentTask = lessons[i].tasks[j];
              }
              if(lessons[i].tasks[j].dataValues.timeCompleted > lessons[i].dataValues.mostRecentTask.dataValues.timeCompleted) {
                lessons[i].dataValues.mostRecentTask = lessons[i].tasks[j];
              }
            }
          }
          for(var k = 0; k < lessons[i].tasks[j].issues.length; k++) {
            // each issue
            if(lessons[i].tasks[j].issues[k].dataValues.isCompleted) {
              if(lessons[i].tasks[j].issues[k].dataValues.timeCompleted > lessons[i].dataValues.queuedTime) {
                if(!lessons[i].dataValues.mostRecentIssue) {
                  lessons[i].dataValues.mostRecentIssue = lessons[i].tasks[j].issues[k];
                }
                if(lessons[i].tasks[j].issues[k].dataValues.timeCompleted > lessons[i].dataValues.mostRecentIssue.dataValues.timeCompleted) {
                  console.log("Found a most recent issue");
                  lessons[i].dataValues.mostRecentIssue = lessons[i].tasks[j].issues[k];
                }
              } 
            } else {
              lessons[i].incompleteIssues = true;
            }
          }  
        }
        if(!lessons[i].incompleteIssues && (lessons[i].dataValues.mostRecentTask || lessons[i].dataValues.mostRecentIssue)) {
          renderQueueLessons.push(lessons[i]);
        }
      }
      res.send(renderQueueLessons);
    } else {
      res.status(404).send({error: "No lessons found."});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
  });
};

exports.getLessonsForTeamMemberWithIssues = function(req, res) {
  getList(req, res, {
    include: [
      models.LanguageSeries,
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