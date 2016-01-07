'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.channel.get)
  .post(controllers.channel.create);
router.route('/:id')
  .get(controllers.channel.find)
  .put(controllers.channel.update)
  .delete(controllers.channel.delete);
router.route('/:id/publish-dates')
  .get(controllers.publishDate.getUpcomingPublishDatesForChannel);

module.exports = router;
