var models = require('../models/models');

exports.getPublishDates = function(req, res) {
  models.PublishDate.findAll().then(function(publishDates) {
    if(publishDates) {
      res.send(publishDates);
    } else {
      res.status(404).send({error: "No publish dates were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getIncompletePublishDates = function(req, res) {
  models.PublishDate.findAll({
    order: [["date", "ASC"]],
    limit: 50,
    where: {
      isDelivered: false
    },
    include: [
      models.Platform,
      {
        model: models.Lesson, 
        include: [models.LanguageSeries]
      }]}).then(function(publishDates) {
    if(publishDates) {
      res.send(publishDates);
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
      res.send(publishDate);
    } else {
      res.status(404).send({error: "No level was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.updatePublishDate = function(req, res) {
  models.PublishDate.findById(req.body.id).then(function (publishDate) {
    for (var key in req.query) {
      publishDate[key] = req.query[key];
    }
    publishDate.save()
      .then(function (publishDate) {
        res.status(200);
        return res.send();
      })
      .catch(function (err) {
        res.status(400);
        return res.send({reason: err.toString()});
      });
  });
};