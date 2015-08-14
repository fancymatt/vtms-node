var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var Language = db.define('language', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  code: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Language;