module.exports = {
  "development" : {
    "db" : {
      "host" : "localhost",
      "port" : 8889,
      "username" : "root",
      "password" : "root",
      "dialect" : "mysql",
      "dbname" : "vtms-local"
    }
  },
  
  "production" : {
    "db" : {
      "host" : "hmvtms.db.5770926.hostedresource.com",
      "username" : "hmvtms",
      "password" : "ketchup100%OK",
      "dialect" : "mysql",
      "dbname" : "hmvtms"
    }
  }
};