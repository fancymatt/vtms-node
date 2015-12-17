'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.channel.getChannels);
router.route('/:id')
  .get(controllers.channel.getChannelById);
router.route('/:id/publish-dates')
  .get(controllers.publishDate.getUpcomingPublishDatesForChannel);

module.exports = router;
