'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.shot.get)
  .post(controllers.shot.create);
router.route('/:id')
  .get(controllers.shot.find)
  .put(controllers.shot.update)
  .delete(controllers.shot.delete);

module.exports = router;
