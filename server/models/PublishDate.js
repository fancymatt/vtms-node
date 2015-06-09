var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var PublishDate = db.define('publishDate', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fkLesson: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.ENUM('SITE', 'YOUTUBE', 'ROKU')
  },
  date: {
    type: Sequelize.DATEONLY
  }
}, {
  freezeTableName: true
});

Sequelize.sync()

module.exports = PublishDate;