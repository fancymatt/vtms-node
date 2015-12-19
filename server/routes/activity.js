'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.activity.get)
  .post(controllers.activity.create);
router.route('/:id')
  .get(controllers.activity.find)
  .put(controllers.activity.update)
  .delete(controllers.activity.delete);
router.route('/active')
  .get(controllers.activity.getActiveActivities);
router.route('/recent')
  .get(controllers.activity.getRecentActivities);

module.exports = router;
