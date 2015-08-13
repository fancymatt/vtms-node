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

User.sync({force: true}).then(function() {
  var salt = encrypt.createSalt();
  var hash = encrypt.hashPwd(salt, 'password');
  User.create({
    firstName: "Matt", 
    lastName: "Henry", 
    username: "henrymatt",
    salt: salt,
    hashed_pwd: hash,
    role: "admin",
    fkTeamMember: 1
  });
  User.create({
    firstName: "Ice", 
    lastName: "Elloso", 
    username: "ielloso",
    salt: salt,
    hashed_pwd: hash,
    role: "teamMember",
    fkTeamMember: 3
  });
  User.create({
    firstName: "Keith", 
    lastName: "McCreary", 
    username: "kmcreary",
    salt: salt,
    hashed_pwd: hash,
    role: "admin",
    fkTeamMember: 2
  });
  User.create({
    firstName: "Max", 
    lastName: "Le", 
    username: "mle",
    salt: salt,
    hashed_pwd: hash,
    role: "teamMember",
    fkTeamMember: 10
  });
  User.create({
    firstName: "Reed", 
    lastName: "Nakamura", 
    username: "rnakamura",
    salt: salt,
    hashed_pwd: hash,
    role: "teamMember",
    fkTeamMember: 4
  });
  User.create({
    firstName: "Edan", 
    lastName: "Mason", 
    username: "emason",
    salt: salt,
    hashed_pwd: hash,
    role: "teamMember",
    fkTeamMember: 11
  });
  User.create({
    firstName: "Meg", 
    lastName: "Igarashi", 
    username: "migarashi",
    salt: salt,
    hashed_pwd: hash,
    role: "teamMember",
    fkTeamMember: 12
  });
  User.create({
    firstName: "Dave", 
    lastName: "Woo", 
    username: "dwoo",
    salt: salt,
    hashed_pwd: hash,
    role: "teamMember",
    fkTeamMember: 18
  });
  User.create({
    firstName: "Stefania", 
    lastName: "Charitou", 
    username: "scharitou",
    salt: salt,
    hashed_pwd: hash,
    role: "teamMember",
    fkTeamMember: 21
  });
  User.create({
    firstName: "Rob", 
    lastName: "Jones", 
    username: "rjones",
    salt: salt,
    hashed_pwd: hash,
    role: "teamMember",
    fkTeamMember: 28
  });
  User.create({
    firstName: "Nori", 
    lastName: "Takaike", 
    username: "ntakaike",
    salt: salt,
    hashed_pwd: hash,
    role: "teamMember",
    fkTeamMember: 29
  });
});

module.exports = User;