var express = require('express'),
    models = require('./server/models/models.js');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config.js')[env];

var app = express();

require('./server/config/express')(app, config);

require('./server/config/sequelize');

require('./server/config/routes')(app);

console.log(config.path);

app.listen(config.port);
console.log("Listening on port: " + config.port);
