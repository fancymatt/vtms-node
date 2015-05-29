var db = require('./database.js'),
    Sequelize = require('sequelize');

module.exports = db.define('series', {
  id: {
    type: Sequelize.INTEGER
  },
  code: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  shotAt: {
    type: Sequelize.INTEGER
  },
  checkableAt: {
    type: Sequelize.INTEGER
  },
  ytTitleTemplate: {
    type: Sequelize.STRING
  },
  ytDescriptionTemplate: {
    type: Sequelize.STRING
  },
  levelSignificant: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false
});