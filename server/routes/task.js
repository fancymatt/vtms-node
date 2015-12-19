'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.task.get)
  .post(controllers.task.create);
router.route('/:id')
  .get(controllers.task.find)
  .put(controllers.task.update)
  .delete(controllers.task.delete);
router.route('/:id/issues')
  .get(controllers.issue.getIssuesForTask);
router.route('/active')
  .get(controllers.task.getActiveTasks);
router.route('/actionable')
  .get(controllers.task.getActionableTasks);
router.route('/undelivered')
  .get(controllers.task.getUndeliveredTasks);
router.route('/recent')
  .get(controllers.task.getRecentTasks);

module.exports = router;
