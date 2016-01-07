'use strict';
let models = require('../models/models'),
    api = require('./api'),
    encrypt = require('../utilities/encryption');

exports.get = function(req, res) {
  api.findAll(req, res, models.User);
};

exports.find = function(req, res) {
  api.findOne(req, res, models.User, {
    where: { id: req.params.id }
  });
};

exports.delete = function (req, res) {
  api.delete(req, res, models.User);
};

exports.create = function(req, res, next) {
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
    res.status(400);
    return res.send({error: 'A password was not supplied'});
  }

};

exports.update = function(req, res) {
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
