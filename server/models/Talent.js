var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var Talent = db.define('talent', {
  id: {
    type: Sequelize.INTEGER
  },
  nameFirst: {
    type: Sequelize.STRING
  },
  nameLast: {
    type: Sequelize.STRING
  },
  isMale: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Talent;