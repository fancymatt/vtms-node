var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');
  
var User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true
});

User.sync({force: true}).then(function() {
  User.create({firstName: "Matt", lastName: "Henry", username: "henrymatt"});
});

module.exports = User;