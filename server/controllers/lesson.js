var models = require('../models/models'),
    sequelize = require('Sequelize');

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
      filesMoved: false
    },
    include: {
      model: models.PublishDate,
      required: true
    },
    limit: 50,
    order: [[models.PublishDate, 'date', 'ASC']],
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
/*
exports.getLanguageCheckLessons = function (req, res) {

exports.getVideoCheckLessons = function (req, res) {

exports.getArchiveLessons = function (req, res) {

exports.getRecentlyCompletedLessons = function (req, res) {
*/