var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var Channel = db.define('channel', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  },
  publishSun: {
    type: Sequelize.BOOLEAN
  },
  publishMon: {
    type: Sequelize.BOOLEAN
  },
  publishTue: {
    type: Sequelize.BOOLEAN
  },
  publishWed: {
    type: Sequelize.BOOLEAN
  },
  publishThu: {
    type: Sequelize.BOOLEAN
  },
  publishFri: {
    type: Sequelize.BOOLEAN
  },
  publishSat: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Channel;