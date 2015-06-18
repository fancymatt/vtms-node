var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  "development" : {
    "path" : rootPath,
    "db" : {
      "host" : "localhost",
      "port" : 8889,
      "username" : "root",
      "password" : "root",
      "dialect" : "mysql",
      "dbname" : "vtms-local"
    },
    "port" : process.env.PORT || 3030,
    "url" : ''
  },
  
  "production" : {
    "path" : rootPath,
    "db" : {
      "host" : "localhost",
      "username" : "root",
      "password" : "ketchup100%OK",
      "dialect" : "mysql",
      "dbname" : "vtms",
      "port" : 3306
    },
    "port" : process.env.PORT || 8080,
    "url" : '10.130.119.225'
  }
};