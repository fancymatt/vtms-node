var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize'),
    encrypt = require('../utilities/encryption');
  
var User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
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

User.sync({force: true}).then(function() {
  var salt = encrypt.createSalt();
  var hash = encrypt.hashPwd(salt, 'pikachu');
  User.create({
    firstName: "Matt", 
    lastName: "Henry", 
    username: "henrymatt",
    salt: salt,
    hashed_pwd: hash,
    role: "admin"
  });
  User.create({
    firstName: "Jaimee", 
    lastName: "Haaland", 
    username: "jhaaland",
    salt: salt,
    hashed_pwd: hash
  });
});

module.exports = User;