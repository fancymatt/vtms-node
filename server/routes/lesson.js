'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.lesson.get)
  .post(controllers.lesson.create);
router.route('/:id')
  .get(controllers.lesson.find)
  .delete(controllers.lesson.delete)
  .put(controllers.lesson.update);
router.route('/:id/issues')
  .get(controllers.issue.getIssuesForLessonWithId);
router.route('/:id/issues/unassigned')
  .get(controllers.issue.getUnassignedIssuesForLesson);
router.route('/:id/issues/last-completed')
  .get(controllers.issue.getLastIssueForLessonWithId);
router.route('/:id/tasks')
  .get(controllers.task.getTasksForLesson);
router.route('/:id/tasks/last-completed')
  .get(controllers.task.getLastTaskForLessonWithId);
router.route('/:id/assets')
  .get(controllers.task.getAssetsForLesson);
router.route('/:id/shots')
  .get(controllers.shot.getShotsForLessonWithId);
router.route('/:id/activities')
  .get(controllers.activity.getActivitiesForLesson);
router.route('/:id/publish-dates')
  .get(controllers.publishDate.getPublishDatesForLessonWithId);
router.route('/upcoming')
  .get(controllers.lesson.getUpcomingLessons);
router.route('/qa')
  .get(controllers.lesson.getQaLessons);
router.route('/video-checkable')
  .get(controllers.lesson.getVideoCheckableLessons);
router.route('/no-trt')
  .get(controllers.lesson.getLessonsWithNoTRT);
router.route('/archivable')
  .get(controllers.lesson.getArchiveableLessons);
router.route('/queued')
  .get(controllers.lesson.getQueuedLessons);
router.route('/ready-to-render')
  .get(controllers.lesson.getReadyToRenderLessons);
router.route('/issues/team-member/:id')
  .get(controllers.lesson.getLessonsForTeamMemberWithIssues);

module.exports = router;
