'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.shift.getShifts);
router.route('/:id')
  .get(controllers.shift.getShiftById);

module.exports = router;
