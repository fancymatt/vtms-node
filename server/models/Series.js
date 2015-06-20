var db = require('../config/sequelize.js'),
    Sequelize = require('sequelize'),
    LanguageSeries = require('./LanguageSeries.js'),
    Lesson = require('./Lesson.js'),
    Task = require('./Task.js'),
    config = require('../config/config.js');
    TaskGlobal = require('./TaskGlobal.js');
  
var Series = db.define('series', {
  id: {
    type: Sequelize.INTEGER
  },
  code: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  shotAt: {
    type: Sequelize.INTEGER
  },
  checkableAt: {
    type: Sequelize.INTEGER
  },
  ytTitleTemplate: {
    type: Sequelize.STRING
  },
  ytDescriptionTemplate: {
    type: Sequelize.STRING
  },
  levelSignificant: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false
});

module.exports = Series;

Series.sync().then(function() {
  console.log("Migration...");
  Series.findAll().then(function(series) {
    series.forEach(function(sery) {
      LanguageSeries.findAll({where: {fkSeries: sery.id}}).then(function(languageSeries) {
        languageSeries.forEach(function(languageSery) {
          Lesson.findAll({where: {fkLanguageSeries: languageSery.id}}).then(function(lessons) {
            lessons.forEach(function(lesson) {
              var lessonCompletionValue = 0;
              Task.findAll({where: {fkLesson: lesson.id}, include: [TaskGlobal]}).then(function(tasks) {
                tasks.forEach(function(task) {
                  if(task.isCompleted) {
                    lessonCompletionValue += task.taskGlobal.completionValue;
                    console.log("Evaluating Task. Completed so adding completion value of: " + task.taskGlobal.completionValue);
                    if(lessonCompletionValue >= sery.shotAt && sery.shotAt > 0) {
                      lesson.isShot = true;
                    }
                    if(lessonCompletionValue >= sery.checkableAt && sery.checkableAt > 0) {
                      lesson.isCheckable = true;
                    }
                    console.log("Evaluating Lesson. Completion Value: " + lessonCompletionValue + ", shotThreshold: " + sery.shotAt + ", checkableThreshold: " + sery.checkableAt + "\n  Shot: " + lesson.isShot + ", Checkable: " + lesson.isCheckable);
                    lesson.save();
                  }
                }); // tasks.forEach()
              }); // Task.findAll()
            }); // lessons.forEach()
          }); // Lesson.findAll()
        }) // LanguageSeries.forEach()
      }); // LanguageSeries.findAll()
    }); // Series.forEach()
  }); // Series.findAll()
});
