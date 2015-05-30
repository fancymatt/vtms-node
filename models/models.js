var db = require('./database.js'),
    Sequelize = require('sequelize');

var models = {};

models.Series = require('./Series.js');
models.LanguageSeries = require('./LanguageSeries.js');
models.Lesson = require('./Lesson.js');
models.Language = require('./Language.js');
models.Level = require('./Level.js');

models.Series.hasMany(models.LanguageSeries, { foreignKey: 'fkSeries' } );
models.LanguageSeries.belongsTo(models.Series, { foreignKey: 'fkSeries' } );
models.LanguageSeries.hasMany(models.Lesson, { foreignKey: 'fkLanguageSeries' } );
models.LanguageSeries.belongsTo(models.Language, { foreignKey: 'fkLanguage' } );
models.LanguageSeries.belongsTo(models.Level, { foreignKey: 'fkLevel' } );
models.Lesson.belongsTo(models.LanguageSeries, { foreignKey: 'fkLanguageSeries'} );
models.Level.hasMany(models.LanguageSeries, { foreignKey: 'fkLevel' } );
models.Language.hasMany(models.LanguageSeries, { foreignKey: 'fkLanguage' } );

module.exports = models;