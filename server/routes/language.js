'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.language.getLanguages);
router.route('/:id')
  .get(controllers.language.getLanguageById);

module.exports = router;
