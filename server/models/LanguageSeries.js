var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var LanguageSeries = db.define('languageSeries', {
  id: {
    type: Sequelize.INTEGER
  },
  fkLanguage: {
    type: Sequelize.INTEGER
  },
  fkSeries: {
    type: Sequelize.INTEGER
  },
  fkLevel: {
    type: Sequelize.INTEGER
  },
  fkChannel: {
    type: Sequelize.INTEGER
  },
  fkTalent: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
    field: 'seriesTitle'
  }
}, {
  timestamps: false
});

module.exports = LanguageSeries;