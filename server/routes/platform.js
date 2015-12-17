'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.platform.getPlatforms);
router.route('/:id')
  .get(controllers.platform.getPlatformById);

module.exports = router;
