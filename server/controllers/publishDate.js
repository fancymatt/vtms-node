var models = require('../models/models');

exports.createPublishDate = function (req, res, next) {
  var userData = req.body;
  models.PublishDate.create(userData).then(function(publishDate) {
    return res.send(publishDate);
  }).catch(function(err) {
    console.log(err);
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
        include: [models.LanguageSeries]
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

exports.getSurroundingPublishDates = function(req, res) {
  var today = new Date();
  var earlier = new Date(today);
  var later = new Date(today);
  earlier.setDate(today.getDate()-14);
  later.setDate(today.getDate()+45);
  models.PublishDate.findAll({
    where: {
      date: {
        $gte: earlier,
        $lte: later
      }
    },
    include: [
      models.Platform,
      {
        model: models.Lesson, 
        include: [models.LanguageSeries]
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
  models.PublishDate.findById(req.body.id).then(function (publishDate) {
    for (var key in req.query) {
      if(req.query[key]) {
        publishDate[key] = req.query[key];
      }
    }
    publishDate.save()
      .then(function (publishDate) {
        res.status(200);
        return res.send();
      })
      .catch(function (err) {
        res.status(400);
        return res.send({reason: err.toString()});
      });
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
        include: [models.LanguageSeries]
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