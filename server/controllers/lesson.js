var models = require('../models/models');

exports.getLessons = function(req, res) {
  models.Lesson.findAll().then(function(lessons) {
    if(lessons) {
      res.send(lessons);
    } else {
      res.send(404).send({error: "No lessons found."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getLessonById = function(req, res) {
  models.Lesson.findOne({
    where: {id: req.params.id},
    include: [ 
      {model: models.Task, include: [models.TeamMember, models.TaskGlobal] }, 
      {model: models.Shot}, 
      {model: models.LanguageSeries, include: [ models.Series] } ]    
  }).then(function(lesson) {
    if(lesson) {
      res.send(lesson);
    } else {
      res.status(404).send({error: "There is no lesson with that ID."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getTasksForLessonWithId = function(req, res) {
  models.Task.findAll({
    where: {fkLesson: req.params.id},
    include: [models.TeamMember, models.TaskGlobal]
  }).then(function(tasks) {
    if(tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({error: "There are no tasks for the lesson with that ID."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getShotsForLessonWithId = function(req, res) {
  models.Shot.findAll({
    where: {fkLesson: req.params.id}
  }).then(function(shots) {
    if(shots) {
      res.send(shots);
    } else {
      res.status(404).send({error: "There are no shots for the lesson with that ID."});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
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