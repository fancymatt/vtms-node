var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var Shot = db.define('shot', {
  id: {
    type: Sequelize.INTEGER
  },
  fkLesson: {
    type: Sequelize.INTEGER
  },
  fkTalent: {
    type: Sequelize.INTEGER
  },
  fkAsset: {
    type: Sequelize.INTEGER
  },
  section: {
    type: Sequelize.STRING
  },
  shot: {
    type: Sequelize.STRING
  },
  script: {
    type: Sequelize.TEXT
  },
  scriptEnglish: {
    type: Sequelize.TEXT
  },
  scriptVideo: {
    type: Sequelize.TEXT
  },
  type: {
    type: Sequelize.STRING
  },
  speaker: {
    type: Sequelize.STRING
  },
  isCompleted: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Shot;