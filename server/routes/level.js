'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.level.getLevels);
router.route('/:id')
  .get(controllers.level.getLevelById);

module.exports = router;
