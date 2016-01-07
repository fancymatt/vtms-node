'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.language.get)
  .post(controllers.language.create);
router.route('/:id')
  .get(controllers.language.find)
  .put(controllers.language.update)
  .delete(controllers.language.delete);

module.exports = router;
