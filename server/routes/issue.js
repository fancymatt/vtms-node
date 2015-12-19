'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.issue.get)
  .post(controllers.issue.create);
router.route('/:id')
  .get(controllers.issue.find)
  .put(controllers.issue.update)
  .delete(controllers.issue.delete);
router.route('/lessons/unassigned')
  .get(controllers.lesson.getLessonsWithUnassignedIssues);

module.exports = router;
