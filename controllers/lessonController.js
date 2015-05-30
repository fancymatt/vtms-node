var express = require('express'),
    router = express.Router(),
    models = require('../models/models.js');

router.get('/:lesson', function(req, res) {
  models.Lesson.findOne( {
    where: {
      id: req.params.lesson
    }, 
    include: [
      { 
        model: models.LanguageSeries, 
        include: [
          {
            model: models.Series
          }
        ]
      }
    ]
  }).then(function(lesson) {
    res.render('lessons/lesson', {
      title: "lesson",
      lesson: lesson
    });
  });
});

module.exports = router;