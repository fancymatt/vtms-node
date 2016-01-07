'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.user.get)
  .post(controllers.user.create);
router.route('/:id')
  .get(controllers.user.find)
  .put(controllers.user.update)
  .delete(controllers.user.delete);

module.exports = router;
