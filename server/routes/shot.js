'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.shot.getShots)
  .post(controllers.shot.createShot);
router.route('/:id')
  .get(controllers.shot.getShotById)
  .put(controllers.shot.updateShot)
  .delete(controllers.shot.deleteShot);

module.exports = router;
