var models = require('../models/models'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res) {
  models.User.findAll().then(function(users) {
    res.send(users);
  });
};

exports.createUser = function(req, res, next) {
  var userData = req.body;
  userData.salt = encrypt.createSalt();
  userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
  models.User.create(userData).then(function(user) {
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      res.send(user);
    })
  }).catch(function(err) {
      console.log(err);
      // should have handling for duplicate username here
      res.status(400);
      return res.send({reason: err.errors[0].message});
    });
};