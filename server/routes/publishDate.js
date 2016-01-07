'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.publishDate.get)
  .post(controllers.publishDate.create);
router.route('/:id')
  .get(controllers.publishDate.find)
  .put(controllers.publishDate.update)
  .delete(controllers.publishDate.delete);
router.route('/incomplete')
  .get(controllers.publishDate.getIncompletePublishDates);
router.route('/upcoming')
  .get(controllers.publishDate.getSurroundingUndeliveredPublishDates);
router.route('/delivered')
  .get(controllers.publishDate.getSurroundingDeliveredPublishDates);
router.route('/ready')
  .get(controllers.publishDate.getReadyToDeliverPublishDates);

module.exports = router;
