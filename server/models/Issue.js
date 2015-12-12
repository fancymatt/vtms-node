'use strict';
let db = require('../config/sequelize.js'),
    Sequelize = require('sequelize'),
    Task = require('./Task.js');

let Issue = db.define('issue', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fkTask: {
    type: Sequelize.INTEGER
  },
  fkLesson: {
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
  tableName: 'taskComment'
});

module.exports = Issue;
