var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var TaskComment = db.define('taskComment', {
  id: {
    type: Sequelize.INTEGER
  },
  fkTask: {
    type: Sequelize.INTEGER
  },
  fkActivity: {
    type: Sequelize.INTEGER
  },
  creationTime: {
    type: Sequelize.DATE
  },
  body: {
    type: Sequelize.STRING
  },
  creator: {
    type: Sequelize.STRING
  },
  timecode: {
    type: Sequelize.STRING
  },
  isCompleted: {
    type: Sequelize.BOOLEAN
  },
  timeCompleted: {
    type: Sequelize.DATE
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = TaskComment;