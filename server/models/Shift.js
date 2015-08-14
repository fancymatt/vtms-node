var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var Shift = db.define('shift', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fkTeamMember: {
    type: Sequelize.INTEGER
  },
  isActive: {
    type: Sequelize.BOOLEAN
  },
  clockIn: {
    type: Sequelize.DATE
  },
  clockOut: {
    type: Sequelize.DATE
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Shift;