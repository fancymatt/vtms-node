var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var TeamMember = db.define('teamMember', {
  id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = TeamMember;