'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.taskGlobal.getTaskGlobals);
router.route('/:id')
  .get(controllers.taskGlobal.getTaskGlobalById);

module.exports = router;
