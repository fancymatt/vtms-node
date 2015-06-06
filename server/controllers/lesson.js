var models = require('../models/models');

exports.getLessonById = function(req, res) {
  models.Lesson.find({
    where: {id: req.params.id},
    include: [ 
      {model: models.Task, include: [models.TeamMember, models.TaskGlobal] }, 
      {model: models.Shot}, 
      {model: models.LanguageSeries, include: [ models.Series] } ]    
  }).then(function(lesson) {
    res.send(lesson);
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