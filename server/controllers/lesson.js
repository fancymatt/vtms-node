var models = require('../models/models');

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


exports.getQALessons = function (req, res) {
  models.Lesson.findAll({
    where: {
      checkedLanguage: false,
      isCheckable: true,
      exportedTime: {
        $gt: 0
      }
    },
    include: {
      model: models.PublishDate,
      required: true
    }
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
  models.Lesson.findAll({
    where: {
      checkedVideo: false,
      isCheckable: true,
      exportedTime: {
        $gt: 0
      }
    },
    include: {
      model: models.PublishDate,
      required: true
    }
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
      }
    },
    include: {
      model: models.PublishDate,
      required: true
    }
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

exports.getReadyToRenderLessons = function (req, res) {
  models.Lesson.findAll({
    where: {
      filesMoved: false,
      isCheckable: true,
      isQueued: false
    },
    include: [
      models.LanguageSeries,
      {model: models.PublishDate, required: true}
    ]
  }).then(function (lessons) {
    if (lessons) {
      res.send(lessons);
    } else {
      res.status(404).send({error: "No lessons found."});
    }
  }).catch(function (err) {
    res.status(500).send({error: err});
  });
};