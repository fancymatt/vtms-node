'use strict';
let db = require('../config/sequelize.js'),
    Lesson = require('./Lesson.js'),
    Sequelize = require('sequelize');

let PublishDate = db.define('publishDate', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fkLesson: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  fkPlatform: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  date: {
    type: Sequelize.DATEONLY
  },
  isDelivered: {
    type: Sequelize.BOOLEAN
  },
  deliveredTime: {
    type: Sequelize.DATE
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = PublishDate;
