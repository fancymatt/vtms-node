'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.activity.getActivities)
  .post(controllers.activity.createActivity);
router.route('/:id')
  .get(controllers.activity.getActivityById)
  .put(controllers.activity.updateActivity)
  .delete(controllers.activity.deleteActivity);
router.route('/active')
  .get(controllers.activity.getActiveActivities);
router.route('/recent')
  .get(controllers.activity.getRecentActivities);

module.exports = router;
