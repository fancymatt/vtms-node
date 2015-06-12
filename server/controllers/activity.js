var models = require('../models/models');

exports.getActivities = function(req, res) {
  models.Activity.findAll().then(function(activities) {
    if(activities) {
      res.send({activities: activities});
    } else {
      res.status(404).send({error: "No activities were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getActivityById = function(req, res) {
  models.Activity.findOne({where: {id: req.params.id}}).then(function(activity) {
    if(activity) {
      res.send({activity: activity});
    } else {
      res.status(404).send({error: "No activity was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};