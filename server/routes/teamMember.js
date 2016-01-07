'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.teamMember.get)
  .post(controllers.teamMember.create);
router.route('/:id')
  .get(controllers.teamMember.find)
  .put(controllers.teamMember.update)
  .delete(controllers.teamMember.delete);
router.route('/:id/tasks/actionable')
  .get(controllers.task.getActionableTasksForTeamMember);
router.route('/:id/tasks/active')
  .get(controllers.task.getActiveTasksForTeamMember);
router.route('/:id/tasks/issues')
  .get(controllers.task.getTasksForTeamMemberWithIssues);
router.route('/:id/tasks/undelivered')
  .get(controllers.task.getUndeliveredTasksForTeamMember);
router.route('/:id/issues')
  .get(controllers.issue.getIssuesForTeamMember);
router.route('/:id/activities')
  .get(controllers.activity.getActivitiesForTeamMember);
router.route('/:id/activities/recent')
  .get(controllers.activity.getRecentActivitiesForTeamMember);
router.route('/:id/activities/active')
  .get(controllers.activity.getActiveActivityForTeamMember);

module.exports = router;
