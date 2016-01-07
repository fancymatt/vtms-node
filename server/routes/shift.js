'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.shift.get)
  .post(controllers.shift.create);
router.route('/:id')
  .get(controllers.shift.find)
  .put(controllers.shift.update)
  .delete(controllers.shift.delete);

module.exports = router;
