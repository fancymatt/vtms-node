var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var TeamMember = db.define('teamMember', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  nameFirst: {
    type: Sequelize.STRING
  },
  nameLast: {
    type: Sequelize.STRING
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    field: 'active'
  }
}, {
  getterMethods: {
    nameFull: function(){ return this.nameFirst + " " + this.nameLast; }
  },
  timestamps: false,
  freezeTableName: true
});

module.exports = TeamMember;