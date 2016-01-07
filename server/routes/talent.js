'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.talent.get)
  .post(controllers.talent.create);
router.route('/:id')
  .get(controllers.talent.find)
  .put(controllers.talent.update)
  .delete(controllers.talent.delete);

module.exports = router;
