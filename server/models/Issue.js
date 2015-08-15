var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize'),
    Task = require('./Task.js');
  
var Issue = db.define('issue', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fkTask: {
    type: Sequelize.INTEGER
  },
  fkLesson: {
    type: Sequelize.INTEGER
  },
  fkActivity: {
    type: Sequelize.INTEGER
  },
  creationTime: {
    type: Sequelize.DATE
  },
  body: {
    type: Sequelize.STRING
  },
  creator: {
    type: Sequelize.STRING
  },
  timecode: {
    type: Sequelize.STRING
  },
  isCompleted: {
    type: Sequelize.BOOLEAN
  },
  timeCompleted: {
    type: Sequelize.DATE
  }
}, {
  timestamps: false,
  tableName: 'taskComment'
});

module.exports = Issue;

/*
Issue.sync().then(function() {
  console.log("Issue migration");
  Issue.findAll({include: [Task]}).then(function(issues) {
    issues.forEach(function(issue) {
      if(!issue.fkLesson && issue.task) {
        issue.fkLesson = issue.task.dataValues.fkLesson;
        issue.save();
      }
    });
  });
});
*/