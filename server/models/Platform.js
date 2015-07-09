var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var Platform = db.define('platform', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.INTEGER
  },
  instructions: {
    type: Sequelize.TEXT
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Platform;