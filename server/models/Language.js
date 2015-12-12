'use strict';
let db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');

let Language = db.define('language', {
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
  siteUrl: {
    type: Sequelize.STRING,
    field: 'siteUrlShort'
  },
  siteCode: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Language;
