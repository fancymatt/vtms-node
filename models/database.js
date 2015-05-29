var Sequelize = require('sequelize');

var sequelize = new Sequelize('mysql://root:root@localhost:8889/vtms-local');

module.exports = sequelize;