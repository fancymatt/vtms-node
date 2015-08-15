var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize'),
    encrypt = require('../utilities/encryption');
  
var User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  salt: {
    type: Sequelize.STRING
  },
  hashed_pwd: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  fkTeamMember: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: true,
  instanceMethods: {
    authenticate: function(passwordToMatch) {
      return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
      return this.role === role;
    }
  }
  
});

module.exports = User;