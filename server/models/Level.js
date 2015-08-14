var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var Level = db.define('level', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  code: {
    type: Sequelize.STRING
  },
  number: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Level;