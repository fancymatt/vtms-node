var models = require('../models/models');

exports.getLanguageSeriesById = function(req, res) {
  models.LanguageSeries.find({
    where: {id: req.params.id},
    include: [ {model: models.Lesson }, {model: models.Series} ],
    order: 'number ASC'
  }).then(function(languageSeries) {
    res.send(languageSeries);
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