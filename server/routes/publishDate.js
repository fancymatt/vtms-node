'use strict';
let router = require('express').Router(),
    controllers = require('../controllers/controllers');

router.route('/')
  .get(controllers.publishDate.getPublishDates)
  .post(controllers.publishDate.createPublishDate);
router.route('/incomplete')
  .get(controllers.publishDate.getIncompletePublishDates);
router.route('/upcoming')
  .get(controllers.publishDate.getSurroundingUndeliveredPublishDates);
router.route('/delivered')
  .get(controllers.publishDate.getSurroundingDeliveredPublishDates);
router.route('/:id')
  .get(controllers.publishDate.getPublishDateById)
  .put(controllers.publishDate.updatePublishDate)
  .delete(controllers.publishDate.deletePublishDate);
router.route('/ready')
  .get(controllers.publishDate.getReadyToDeliverPublishDates);

module.exports = router;
