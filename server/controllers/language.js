var models = require('../models/models');

exports.getLanguages = function(req, res) {
  models.Language.findAll().then(function(languages) {
    if(languages) {
      res.send({languages: languages});
    } else {
      res.status(404).send({error: "No languages were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getLanguageById = function(req, res) {
  models.Language.findOne({where: {id: req.params.id}}).then(function(language) {
    if(language) {
      res.send({language: language});
    } else {
      res.status(404).send({error: "No language was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};