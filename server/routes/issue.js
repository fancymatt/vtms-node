'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.issue.getIssues)
  .post(controllers.issue.createIssue);
router.route('/:id')
  .get(controllers.issue.getIssueById)
  .put(controllers.issue.updateIssue)
  .delete(controllers.issue.deleteIssue);
router.route('/lessons/unassigned')
  .get(controllers.lesson.getLessonsWithUnassignedIssues);

module.exports = router;
