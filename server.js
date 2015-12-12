'use strict';
let express = require('express');

let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let config = require('./server/config/config.js')[env];

let app = express();

require('./server/config/express')(app, config);

require('./server/config/sequelize');

require('./server/config/passport')();

require('./server/config/routes')(app);

app.listen(config.port, config.ip);
console.log(`Listening on ${config.ip}:${config.port}`);
