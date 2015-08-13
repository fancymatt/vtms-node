var db = require('../config/sequelize.js'),
    Lesson = require('./Lesson.js'),
    Sequelize = require('sequelize');
  
var PublishDate = db.define('publishDate', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fkLesson: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  fkPlatform: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  date: {
    type: Sequelize.DATEONLY
  },
  isDelivered: {
    type: Sequelize.BOOLEAN
  },
  deliveredTime: {
    type: Sequelize.DATE
  }
}, {
  timestamps: false,
  freezeTableName: true
});

/*
PublishDate.sync().then(function() {
  console.log("Publish Date migration: Searching for levels...");
  Lesson.findAll().then(function(lessons) {
    lessons.forEach(function(lesson) {
      if(lesson.publishDateSite > 0) {
        PublishDate.create({
          fkLesson: lesson.id,
          fkPlatform: 1,
          date: lesson.publishDateSite
        });
      }
      if(lesson.publishDateYouTube > 0) {
        PublishDate.create({
          fkLesson: lesson.id,
          fkPlatform: 2,
          date: lesson.publishDateYouTube
        });
      }
    });
  });
});
*/

module.exports = PublishDate;