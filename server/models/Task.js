var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var Task = db.define('task', {
  id: {
    type: Sequelize.INTEGER
  },
  fkTaskGlobal: {
    type: Sequelize.INTEGER
  },
  fkLesson: {
    type: Sequelize.INTEGER
  },
  fkTeamMember: {
    type: Sequelize.INTEGER
  },
  isActive: {
    type: Sequelize.BOOLEAN
  },
  timeDeactivated: {
    type: Sequelize.DATE
  },
  isCustom: {
    type: Sequelize.BOOLEAN
  },
  name: {
    type: Sequelize.STRING
  },
  timeStart: {
    type: Sequelize.DATE
  },
  timeActivate: {
    type: Sequelize.DATE
  },
  timeActual: {
    type: Sequelize.INTEGER
  },
  timeRunning: {
    type: Sequelize.INTEGER
  },
  timeCompleted: {
    type: Sequelize.DATE
  },
  isCompleted: {
    type: Sequelize.BOOLEAN
  },
  isDelivered: {
    type: Sequelize.BOOLEAN
  },
  isActionable: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Task;