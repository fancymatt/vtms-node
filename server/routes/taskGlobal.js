'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.taskGlobal.get)
  .post(controllers.taskGlobal.create);
router.route('/:id')
  .get(controllers.taskGlobal.find)
  .put(controllers.taskGlobal.update)
  .delete(controllers.taskGlobal.delete);

module.exports = router;
