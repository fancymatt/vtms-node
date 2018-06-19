var models = require('../models/models');
var xml = require('xml');

exports.createPublishDate = function (req, res, next) {
  var userData = req.body;
  models.PublishDate.create(userData).then(function(publishDate) {
    return res.send(publishDate);
  }).catch(function(err) {
    res.status(400);
    return res.send({reason: err.errors[0].message});
  });
};


exports.getPublishDates = function(req, res) {
  models.PublishDate.findAll().then(function(publishDates) {
    if(publishDates) {
      res.send(publishDates);
    } else {
      res.status(404).send({error: 'No publish dates were found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getIncompletePublishDates = function(req, res) {
  models.PublishDate.findAll({
    order: [['date', 'ASC']],
    limit: 50,
    where: {
      isDelivered: false
    },
    include: [
      models.Platform,
      {
        model: models.Lesson,
        include: [{model: models.LanguageSeries, include: [models.Language, models.Series, models.Level]}]
      }]}).then(function(publishDates) {
    if(publishDates) {
      res.send(publishDates);
    } else {
      res.status(404).send({error: 'No publish dates were found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getSurroundingDeliveredPublishDates = function(req, res) {
  var today = new Date();
  var earlier = new Date(today);
  var later = new Date(today);
  earlier.setDate(today.getDate()-7);
  later.setDate(today.getDate()+2);
  models.PublishDate.findAll({
    where: {
      deliveredTime: {
        $gte: earlier,
        $lte: later
      },
      isDelivered: true
    },
    include: [
      models.Platform,
      {
        model: models.Lesson,
        include: [{model: models.LanguageSeries, include: [models.Language, models.Series, models.Level]}]
      }
    ]
  }).then(function(publishDates) {
    if(publishDates) {
     res.send(publishDates);
    } else {
      res.status(404).send({error: 'No publish dates were found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getSurroundingUndeliveredPublishDates = function(req, res) {
  var today = new Date();
  var earlier = new Date(today);
  var later = new Date(today);
  earlier.setDate(today.getDate()-365);
  later.setDate(today.getDate()+21);
  models.PublishDate.findAll({
    where: {
      date: {
        $gte: earlier,
        $lte: later
      },
      isDelivered: false
    },
    include: [
      models.Platform,
      {
        model: models.Lesson,
        include: [{model: models.LanguageSeries, include: [models.Language, models.Series, models.Level]}]
      }
    ]
  }).then(function(publishDates) {
    if(publishDates) {
     res.send(publishDates);
    } else {
      res.status(404).send({error: 'No publish dates were found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getReadyToDeliverPublishDates = function(req, res) {
  models.PublishDate.findAll({
    where: {
      isDelivered: false
    },
    include: [
      models.Platform,
      {
        model: models.Lesson,
        where: {
          filesMoved: true
        },
        include: [{model: models.LanguageSeries, include: [models.Language, models.Series, models.Level]}]
      }
    ]
  })
  .then(function(publishDates) {
    if(publishDates) {
      // for each youtube publish date
      // check to see if there is a site publish date
      // if so, hide the youtube publish date
      var siteReadyToPublishLessons = [];
      publishDates.forEach(function(publishDate) {
        if (publishDate.platform.name === 'pod101') {
          siteReadyToPublishLessons.push(publishDate.lesson.id);
        }
      });
      publishDates.forEach(function(publishDate) {
        for (var i = 0; i < siteReadyToPublishLessons.length; i++) {
          if (publishDate.lesson.id === siteReadyToPublishLessons[i] && publishDate.platform.name == 'youtube') {
            publishDate.lesson.title = "**Publish on Site First** " + publishDate.lesson.title;
            console.log('Lesson with id ' + publishDate.lesson.id + ' has a YouTube publish date, removing site publish date...');
          }
        }
      });
      res.send(publishDates);
    } else {
      res.status(404).send({error: 'No publish dates were found.'});
    }
  })
  .catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getUpcomingPublishDatesForChannel = function(req, res) {
  models.PublishDate.findAll({
    where: {fkPlatform: 2},
    include: [
      models.Platform,
      {
        model: models.Lesson,
        include: [
          {
            model: models.LanguageSeries,
            where: {fkChannel: req.params.id},
            include: [models.Language, models.Series, models.Level]
          }
        ]
      }
    ]
  }).then(function(publishDates) {
    if(publishDates) {
      res.send(publishDates);
    } else {
      res.status(404).send({error: 'No publish dates were found.'});
    }
  })
  .catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getPublishDateById = function(req, res) {
  models.PublishDate.findOne({where: {id: req.params.id}}).then(function(publishDate) {
    if(publishDate) {
      res.send(publishDate);
    } else {
      res.status(404).send({error: 'No level was found with that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.updatePublishDate = function(req, res) {
  models.PublishDate.update(req.query, {where: {id: req.params.id}})
  .then(function() {
    res.status(200);
    return res.send();
  })
  .catch(function (err) {
    res.status(400);
    return res.send({reason: err.toString()});
  });
};

exports.deletePublishDate = function (req, res) {
  models.PublishDate.findById(req.params.id).then(function (publishDate) {
    if(publishDate) {
      publishDate.destroy().then(function() {
        res.status(200).end();
      });
    } else {
      res.status(404).send({error: 'No publish date was found with that ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getPublishDatesForLessonWithId = function(req, res) {
  models.PublishDate.findAll({
    where: {
      fkLesson: req.params.id
    },
    include: [
      models.Platform,
      {
        model: models.Lesson,
        include: [{model: models.LanguageSeries, include: [models.Language, models.Series, models.Level]}]
      }]}). then(function (publishDates) {
    if(publishDates) {
      res.send(publishDates);
    } else {
      res.status(404).send({error: 'No publish dates have been set for a lesson with this ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getXmlForLanguageSeriesWithId = function(req, res) {
    models.PublishDate.findAll({
      where: {fkPlatform: 1, isDelivered: 1},
      include: [
        models.Platform,
        {
          model: models.Lesson,
          include: [
            {
              model: models.LanguageSeries,
              where: {id: req.params.id},
              include: [models.Language, models.Series, models.Level]
            }
          ]
        }
      ],
      order: [[models.Lesson, 'number', 'ASC']]
    }).then(function (publishDates) {
    if(publishDates) {
      var seriesXml = [{rss: [{_attr: {'xmlns:media': 'http://search.yahoo.com/mrss/','xmlns:creativeCommons': 'http://backend.userland.com/creativeCommonsRssModule',version: '2.0'}},{channel: [{title: publishDates[0].lesson.languageSery.title,link: '&nbsp',description: '&nbsp'}]},],},];

      var urlBase = 'http://media.libsyn.com/media/' + publishDates[0].lesson.languageSery.language.siteUrl + '/' + publishDates[0].lesson.languageSery.code;

      var vtmsLanguageCode = publishDates[0].lesson.languageSery.language.code;
      var vtmsSeriesCode = publishDates[0].lesson.languageSery.series.code;
      var vtmsLevelCode = publishDates[0].lesson.languageSery.level.code;
      var vtmsLevelNecessary = publishDates[0].lesson.languageSery.series.levelSignificant;
      var vtmsLanguageSeriesCode = vtmsLanguageCode + '_' + vtmsSeriesCode;
      if(vtmsLevelNecessary) { vtmsLanguageSeriesCode += '-' + vtmsLevelCode; }

      for (var i = 0; i < publishDates.length; i++ ) {

        var thisLesson = publishDates[i].lesson

        var urlFull = urlBase + '_L' + thisLesson.number + '_' + thisLesson.languageSery.language.siteCode + '_video-';
        var paddedLessonNumber = thisLesson.number < 10 ? '0' + thisLesson.number : thisLesson.number;
        var vtmsCode = vtmsLanguageSeriesCode + '_' + paddedLessonNumber
        var thumbnailUrlBase = 'http://products.innovativelanguage.com/roku/images/thumbs/' + thisLesson.languageSery.language.name.toLowerCase() + '/';

        var item = {
          item: [
            {
              title: thisLesson.title
            },
            {
              guid: [{_attr: {'isPermaLink': 'false'}}, vtmsCode]
            },
            {
              description: ''
            },
            {
              'media:group' : [
                {
                  'media:content' : [{_attr: {'url': urlFull + 'h.mp4','bitrate' : '1500', 'duration': thisLesson.trt, 'medium': 'video', 'type':'video/quicktime'}}]
                },
                {
                  'media:content' : [{_attr: {'url': urlFull + 'm.mp4','bitrate' : '1000', 'duration': thisLesson.trt, 'medium': 'video', 'type':'video/quicktime'}}]
                },
                {
                  'media:content' : [{_attr: {'url': urlFull + 'l.mp4','bitrate' : '500', 'duration': thisLesson.trt, 'medium': 'video', 'type':'video/quicktime'}}]
                }
              ]
            },
            {
              'media:thumbnail' : [{_attr: {'url': thumbnailUrlBase + vtmsCode + '-thumb.png'}}]
            }
          ]
        };

        seriesXml[0].rss[1].channel.push(item);
      }

      res.send(xml(seriesXml, true));
    } else {
      res.status(404).send({error: 'No publish dates have been set for a lesson with this ID.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};
