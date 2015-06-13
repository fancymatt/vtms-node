var db = require('../config/sequelize.js'),
    Lesson = require('./lesson.js'),
    Sequelize = require('sequelize');
  
var PublishDate = db.define('publishDate', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fkLesson: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.ENUM('SITE', 'YOUTUBE', 'ROKU')
  },
  date: {
    type: Sequelize.DATEONLY
  }
}, {
  freezeTableName: true
});


PublishDate.sync({force: true}).then(function() {
  console.log("Publish Date migration: Searching for levels...");
  Lesson.findAll().then(function(lessons) {
    lessons.forEach(function(lesson) {
      if(lesson.publishDateSite > 0) {
        PublishDate.create({
          fkLesson: lesson.id,
          type: 'SITE',
          date: lesson.publishDateSite
        });
      }
      if(lesson.publishDateYouTube > 0) {
        PublishDate.create({
          fkLesson: lesson.id,
          type: 'YOUTUBE',
          date: lesson.publishDateYouTube
        });
      }
    });
  });
});


module.exports = PublishDate;