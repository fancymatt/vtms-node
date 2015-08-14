var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var Activity = db.define('activity', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fkShift: {
    type: Sequelize.INTEGER
  },
  fkTask: {
    type: Sequelize.INTEGER
  },
  fkLesson: {
    type: Sequelize.INTEGER
  },
  isActive: {
    type: Sequelize.BOOLEAN
  },
  isCompleted: {
    type: Sequelize.BOOLEAN
  },
  timeStart: {
    type: Sequelize.DATE
  },
  timeEnd: {
    type: Sequelize.DATE
  },
  activity: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Activity;