'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.teamMember.getTeamMembers);
router.route('/:id')
  .get(controllers.teamMember.getTeamMemberById);
router.route('/:id/tasks/actionable')
  .get(controllers.task.getActionableTasksForTeamMemberWithId);
router.route('/:id/tasks/active')
  .get(controllers.task.getActiveTasksForTeamMemberWithId);
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
