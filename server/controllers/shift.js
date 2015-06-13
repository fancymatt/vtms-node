var models = require('../models/models');

exports.getShifts = function(req, res) {
  models.Shift.findAll({
    include: [{model: models.Activity}, {model: models.TeamMember}],
    order: [['clockIn', 'DESC']],
    limit: 25
  }).then(function(shifts) {
    if(shifts) {
      res.send(shifts);
    } else {
      res.status(404).send({error: "No shifts were found."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};

exports.getShiftById = function(req, res) {
  models.Shift.findOne({where: {id: req.params.id}}).then(function(shift) {
    if(shift) {
      res.send({activity: shift});
    } else {
      res.status(404).send({error: "No shift was found with that ID."})
    }
  }).catch(function(err) {
    res.status(500).send({error: err});
  });
};