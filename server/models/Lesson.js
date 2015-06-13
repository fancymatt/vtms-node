var db = require('../config/sequelize.js'),
    Task = require('./Task.js'),
    Lesson = require('./Lesson.js'),
    TaskGlobal = require('./TaskGlobal.js'),
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
  publishDateSite: {
    type: Sequelize.DATEONLY
  },
  publishDateYouTube: {
    type: Sequelize.DATEONLY
  },
  trt: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  ytCode: {
    type: Sequelize.STRING
  },
  ytIneligible: {
    type: Sequelize.INTEGER
  },
  ytTitle: {
    type: Sequelize.STRING
  },
  bufferLength: {
    type: Sequelize.INTEGER
  },
  checkedLanguage: {
    type: Sequelize.BOOLEAN
  },
  checkedVideo: {
    type: Sequelize.BOOLEAN
  },
  filesMoved: {
    type: Sequelize.BOOLEAN
  },
  qaLog: {
    type: Sequelize.STRING,
    field: 'qa_log',
  },
  qaUrl: {
    type: Sequelize.STRING,
    field: 'qa_url'
  },
  isQueued: {
    type: Sequelize.BOOLEAN
  },
  timeUploadedDropbox: {
    type: Sequelize.DATE
  },
  queuedTime: {
    type: Sequelize.DATE
  },
  exportedTime: {
    type: Sequelize.DATE
  },
  isDetected: {
    type: Sequelize.BOOLEAN
  },
  isUploadedYt: {
    type: Sequelize.INTEGER
  },
  uploadedYtTime: {
    type: Sequelize.DATE
  },
  checkedLanguageTime: {
    type: Sequelize.DATE
  },
  checkedVideoTime: {
    type: Sequelize.DATE
  },
  filesMovedTime: {
    type: Sequelize.DATE
  },
  detectedTime: {
    type: Sequelize.DATE
  },
  isUploadedForIllTv: {
    type: Sequelize.BOOLEAN
  },
  illTvTestDate: {
    type: Sequelize.DATEONLY,
    field: 'illtvTestDate'
  },
  illtvIsTested: {
    type: Sequelize.BOOLEAN
  },
  customYtField: {
    type: Sequelize.STRING,
    field: 'customYTfield'
  }
}, {
  timestamps: false,
  freezeTableName: true
});

/*
Lesson.sync().then(function() {
  Lesson.findAll().then(function(lessons) {
    lessons.forEach(function(lesson) {
      lesson.completionValue = 0;
      lesson.save(); 
    });
  })
  .then(function() {
    Task.findAll({include: [Lesson, TaskGlobal]}).then(function(tasks) {
      tasks.forEach(function(task) {
        if(task.isCompleted === 1) {
          Lesson.findOne({id: task.fkLesson}).then(function(lesson) {
            lesson.completionValue +=task.TaskGlobal.completionValue;
          });          
        }
      });
    })
  })
});
*/


module.exports = Lesson;