'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.platform.get)
  .post(controllers.platform.create);
router.route('/:id')
  .get(controllers.platform.find)
  .put(controllers.platform.update)
  .delete(controllers.platform.delete);

module.exports = router;
