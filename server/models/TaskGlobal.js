'use strict';
let db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');

let TaskGlobal = db.define('taskGlobal', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  dueDateOffset: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  fkSeries: {
    type: Sequelize.INTEGER
  },
  actionableAt: {
    type: Sequelize.INTEGER
  },
  completionValue: {
    type: Sequelize.INTEGER
  },
  defaultTeamMember: {
    type: Sequelize.INTEGER
  },
  canAddIssues: {
    type: Sequelize.BOOLEAN
  },
  issueReportingFriendlyText: {
    type: Sequelize.STRING
  },
  isAsset: {
    type: Sequelize.BOOLEAN
  },
  tutorialYtUrl: {
    type: Sequelize.STRING
  },
  tutorialShortDescription: {
    type: Sequelize.STRING
  },
  needForVideoCheck: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = TaskGlobal;
