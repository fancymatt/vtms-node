var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app, config) {
  app.set('view engine', 'jade');
  app.set('views', config.path + 'server/views/');
  app.use(logger('dev'));
  app.use(bodyParser());
  app.use(express.static(config.path + 'public'));

};