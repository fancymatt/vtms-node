var models = require('../models/models');
var moment = require('moment-timezone');

var getList = function(req, res, query) {
  models.Activity.findAll(query).then(function(activities) {
    if(activities) {
      res.send(activities);
    } else {
      res.status(404).send({error: 'No activities were found.'});
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).send({reason: err.toString()});
  });
};

var getOne = function(req, res, query) {
  models.Activity.findOne(query).then(function(activity) {
    if(activity) {
      res.send(activity);
    } else {
      res.status(200).send({});
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
  models.Activity.update(req.query, {where: {id: req.params.id}})
  .then(function() {
    res.status(200);
    return res.send();
  })
  .catch(function (err) {
    res.status(400);
    return res.send({reason: err.toString()});
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
  getList(req, res, {include: [models.Shift]});
};

exports.getActivityById = function(req, res) {
  getOne(req, res, {where: {id: req.params.id}});
};

exports.getActiveActivities = function(req, res) {
  getList(req, res, {where: {isActive: true}});
};

exports.getRecentActivities = function(req, res) {
  getList(req, res, {
    include: [
      {model: models.TeamMember},
      {
        model: models.Shift,
        include: [models.TeamMember]
      },
      {
        model: models.Task,
        include: [
          {
            model: models.Lesson,
            include: [models.LanguageSeries]
          },
          models.TaskGlobal
        ]
      }
    ],
    limit: 50, order: [['timeStart','desc']]
  });
};

exports.getActivitiesForLesson = function(req, res) {
  getList(req, res, {
    order: [['timeEnd','asc']],
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
        model: models.TeamMember
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
            include: [models.LanguageSeries]
          },
          models.TaskGlobal
        ]
      }
    ]
  });
};

exports.getRecentActivitiesForTeamMember = function(req, res) {
  getList(req, res, {
    where: {
      fkTeamMember: req.params.id,
      timeStart: {
        $gt: moment().utc().subtract(10, 'hours').format('YYYY-MM-DD HH:mm:ss')
      }
    },
    include: [
      {
        model: models.Task,
        include: [
          {
            model: models.Lesson,
            include: [models.LanguageSeries]
          },
          models.TaskGlobal
        ]
      }
    ]
  });
};

exports.getActiveActivityForTeamMember = function(req, res) {
  getOne(req, res, {where: {fkTeamMember: req.params.id, isActive: true}, order: [['timeStart']]});
};
