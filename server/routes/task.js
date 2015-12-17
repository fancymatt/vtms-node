'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.task.getTasks)
  .post(controllers.task.createNewTask);
router.route('/:id')
  .get(controllers.task.getTaskById)
  .put(controllers.task.updateTaskById);
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
