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