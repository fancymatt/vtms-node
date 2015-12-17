'use strict';
let models = require('../models/models'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res) {

  var query = {};

  if(req.query.role) {
    query.role = req.query.role;
  }

  models.User.findAll({where: query}).then(function(users) {
    var returnUsers = [];
    users.forEach(function(element, index, array) {
      var newUser = element.toJSON();
      newUser.links = {};
      newUser.links.self = 'http://' + req.headers.host + '/api/users/' + newUser.id;
      returnUsers.push(newUser);
    });


    res.send(users);
  });
};

exports.findUserById = function(req, res, next) {
  models.User.findOne({where: {id: req.params.id}}).then(function(user) {
    var returnUser = user.toJSON();

    returnUser.links = {};
    returnUser.links.filterByThisRole = 'http://' + req.headers.host + '/api/users?role=' + returnUser.role;
    res.json(returnUser);
  });
};

exports.createUser = function(req, res, next) {
  var userData = req.body;

  if(typeof userData.password === 'string') {

    userData.salt = encrypt.createSalt();
    userData.hashedPassword = encrypt.hashPwd(userData.salt, userData.password);

    models.User.create(userData).then(function(user) {
      req.logIn(user, function(err) {
        if(err) {return next(err);}
        res.status(201).send(user);
      });
    }).catch(function(err) {
      res.status(400);
      return res.send({error: err.errors[0].message});
    });

  } else {
    res.status(400)
    return res.send({error: 'A password was not supplied'})
  }

};

exports.updateUser = function(req, res) {
  var userUpdates = req.body;
  if(req.user.id !== userUpdates.id) {
    res.status(403);
    return res.end();
  }
  req.user.firstName = userUpdates.firstName;
  req.user.lastName = userUpdates.lastName;
  req.user.username = userUpdates.username;
  if(userUpdates.password && userUpdates.password.length > 0) {
    req.user.salt = encrypt.createSalt();
    req.user.hashedPassword = encrypt.hashPwd(req.user.salt, userUpdates.password);
  }

  req.user.save()
    .then(function(user) {
      res.send(req.user);
    })
    .catch(function(err) {
      res.status(400);
      return res.send({error: err.toString()});
  });
};
