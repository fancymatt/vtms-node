var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config.js')[env];

var app = express();

require('./server/config/express')(app, config);

require('./server/config/sequelize');
    
require('./server/config/passport')();

require('./server/config/routes')(app);

app.listen(config.port);
console.log("Listening on port: " + config.port);
