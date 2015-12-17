'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.talent.getTalents);
router.route('/:id')
  .get(controllers.talent.getTalentById);

module.exports = router;
