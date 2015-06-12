var models = require('../models/models');

exports.getPublishDates = function(req, res) {
  models.PublishDate.findAll().then(function(publishDates) {
    if(publishDates) {
      res.send({publishDates: publishDates});
    } else {
      res.status(404).send({error: "No publish dates were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getPublishDateById = function(req, res) {
  models.PublishDate.findOne({where: {id: req.params.id}}).then(function(publishDate) {
    if(publishDate) {
      res.send({publishDate: publishDate});
    } else {
      res.status(404).send({error: "No level was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};