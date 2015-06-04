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

exports.updateUser = function(req, res) {
  var userUpdates = req.body;
  console.log(req);
  console.log(userUpdates);
  if(req.user.id != userUpdates.id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  
  req.user.firstName = userUpdates.firstName;
  req.user.lastName = userUpdates.lastName;
  req.user.username = userUpdates.username;
  if(userUpdates.password && userUpdates.password.length > 0) {
    req.user.salt = encrypt.createSalt();
    req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
  }
  
  req.user.save()
    .then(function(user) {
      res.send(req.user);
    })
    .catch(function(err) {
      res.status(400); 
      return res.send({reason: err.toString()});
  });
};