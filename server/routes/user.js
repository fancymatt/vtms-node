'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.user.getUsers)
  .post(controllers.user.createUser)
  .put(controllers.user.updateUser);

module.exports = router;
