var db = require('./database.js'),
    Sequelize = require('sequelize');
  
var Lesson = db.define('lesson', {
  id: {
    type: Sequelize.INTEGER
  },
  fkLanguageSeries: {
    type: Sequelize.INTEGER
  },
  number: {
    type: Sequelize.INTEGER
  },
  trt: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Lesson;