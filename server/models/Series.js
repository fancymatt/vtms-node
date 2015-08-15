var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize'),
    LanguageSeries = require('./LanguageSeries.js'),
    Lesson = require('./Lesson.js'),
    Task = require('./Task.js'),
    config = require('../config/config.js');
    TaskGlobal = require('./TaskGlobal.js');
  
var Series = db.define('series', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  code: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  shotAt: {
    type: Sequelize.INTEGER
  },
  checkableAt: {
    type: Sequelize.INTEGER
  },
  ytTitleTemplate: {
    type: Sequelize.STRING
  },
  ytDescriptionTemplate: {
    type: Sequelize.STRING
  },
  levelSignificant: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false
});

module.exports = Series;