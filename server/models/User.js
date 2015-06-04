var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize'),
    crypto = require('crypto');
  
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
    type: Sequelize.STRING
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
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  }
  
});

User.sync({force: true}).then(function() {
  var salt = createSalt();
  var hash = hashPwd(salt, 'pikachu');
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

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}

module.exports = User;