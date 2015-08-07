var models = require('../models/models');

var getList = function(req, res, query) {
  models.Activity.findAll(query).then(function(activities) {
    if(activities) {
      res.send(activities);
    } else {
      res.status(404).send({error: 'No activities were found.'});
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).send({error: err});
  });
};

var getOne = function(req, res, query) {
  models.Activity.findOne(query).then(function(activity) {
    if(activity) {
      res.send({activity: activity});
    } else {
      res.status(404).send({error: 'No activity was found.'});
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.createActivity = function(req, res) {
  models.Activity.create(req.body).then(function(activity) {
    activity.dataValues.id = activity.null; // what is this?
    return res.send(activity);
  }).catch(function(err) {
    res.status(400);
    return res.status({reason: err});
  });
};

exports.updateActivity = function(req, res) {
  models.Activity.findById(req.params.id).then(function(activity) {
    for (var key in req.query) {
      if(req.query[key]) {
        activity[key] = req.query[key];
      }
    }
    activity.save().then(function(savedActivity) {
      res.status(200);
      return res.send();
    }).catch(function(err) {
      res.status(400);
      return res.send({reason: err.toString()});
    });
  }).catch(function(err) {
    res.status(400);
    return res.status({reason: err});
  });
};

exports.deleteActivity = function(req, res) {
  models.Activity.findById(req.params.id).then(function(activity) {
    activity.destroy().then(function() {
      res.status(200).end();
    });
  }).catch(function(err) {
    return res.render('error', {
      error: err,
      status: 500
    });
  });
};

exports.getActivities = function(req, res) {
  getList(req, res, {});
};

exports.getActivityById = function(req, res) {
  getOne(req, res, {where: {id: req.params.id}});
};

exports.getActiveActivities = function(req, res) {
  getList(req, res, {where: {isActive: true}});
};

exports.getRecentActivities = function(req, res) {
  getList(req, res, {where: {isCompleted: true}, order: [['timeEnd','desc']]});
};

exports.getActivitiesForLesson = function(req, res) {
  getList(req, res, {
    include: [
      {
        model: models.Task,
        include: [
          {
            model: models.Lesson,
            required: true,
            where: {
              id: req.params.id
            }
          },
          {
            model: models.TaskGlobal
          }
        ]
      },
      {
        model: models.Shift,
        include: [
          {
            model: models.TeamMember
          }
        ]
      }
    ]
  });
};

exports.getActivitiesForTeamMember = function(req, res) {
  getList(req, res, {
    where: {fkTeamMember: req.params.id},
    include: [
      {
        model: models.Task,
        include: [
          {
            model: models.Lesson,
          },
          {
            model: models.TaskGlobal
          }
        ]
      }
    ]
  });
};

exports.getActiveActivitiesForTeamMember = function(req, res) {
  getList(req, res, {where: {fkTeamMember: req.params.id, isCompleted: false}});
};