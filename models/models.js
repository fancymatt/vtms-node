var db = require('./database.js'),
    Sequelize = require('sequelize');

var models = {};

models.Series = require('./series.js');
models.LanguageSeries = require('./languageSeries.js');

models.Series.hasMany(models.LanguageSeries, { foreignKey: 'fkSeries' } );
models.LanguageSeries.belongsTo(models.Series, { foreignKey: 'fkSeries'} );

module.exports = models;