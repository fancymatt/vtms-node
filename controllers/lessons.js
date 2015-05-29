var express = require('express'),
    router = express.Router(),
    db = require('../models/database.js');

router.get('/', function(req, res) {
  res.render('lessons/lesson', {title: "Lessons"});
});

router.get('/createentry/:message', function(req, res) {
  db.write(req.params.message);
  res.render("lessons/lesson", {title: "Entry creation complete"});
});

module.exports = router;