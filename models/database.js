var Sequelize = require('sequelize'),
    config = require('../config/config.js')[process.env.NODE_ENV];

var sequelize = new Sequelize(config.db.dbname, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect
});

module.exports = sequelize;