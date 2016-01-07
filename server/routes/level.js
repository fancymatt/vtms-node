'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.level.get)
  .post(controllers.level.create);
router.route('/:id')
  .get(controllers.level.find)
  .put(controllers.level.update)
  .delete(controllers.level.delete);

module.exports = router;
