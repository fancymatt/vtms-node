var models = require('../models/models');

exports.getLanguageSeries = function(req, res) {
  models.LanguageSeries.findAll().then(function(languageSeries) {
    if(languageSeries) {
      res.send(languageSeries);
    } else {
      res.status(404).send({error: "No language series were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getLanguageSeriesById = function(req, res) {
  models.LanguageSeries.find({
    where: {id: req.params.id}
  }).then(function(languageSeries) {
    if(languageSeries) {
      res.send(languageSeries);
    } else {
      res.status(404).send({error: "No language series was found with that ID."});
    } 
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getLessonsForLanguageSeriesWithId = function(req, res) {
  models.Lesson.findAll({
    where: {fkLanguageSeries: req.params.id},
    include: [models.PublishDate],
    order: 'number ASC'
  }).then(function(languageSeries) {
    if(languageSeries) {
      res.send(languageSeries);
    } else {
      res.status(404).send({error: "No language series were found with a series of that ID."});
    } 
  }).catch(function(err) {
    res.status(500).send({error: err});
  }); 
};

exports.updateLanguageSeries = function(req, res) {
  models.LanguageSeries.findById(req.body.id).then(function(languageSeries) {
    for(var key in req.query) {
      languageSeries[key] = req.query[key];
    }
    languageSeries.save()
      .then(function(languageSeries) {
        res.status(200);
        return res.send();
      })
      .catch(function(err) {
        res.status(400);
        return res.send({reason: err.toString()});
      });
  
  });
};