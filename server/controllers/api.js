'use strict';
module.exports = {

  findAll: function(req, res, model, query) {
    var queryObject;
    if (query) {
      queryObject = {
        offset: req.query.offset,
        limit: query.limit ? query.limit : req.query.limit,
        where: query.where,
        include: query.include,
        order: query.order ? query.order : req.query.order
      };
    } else {
      queryObject = {
        offset: req.query.offset,
        limit: req.query.limit,
      };
    }
    model.findAll(queryObject).then(function(data) {
      if(data) {
        var returnObject = {};
        returnObject.count = data.length;
        returnObject.data = data;
        res.send(returnObject);
      } else {
        res.status(404).send({error: 'No results returned'});
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).send({error: err});
    });
  },

  findOne: function(req, res, model, query) {
    model.findOne({
      where: query.where,
      include: query.include
    }).then(function(data) {
      if(data) {
        var returnObject = {};
        returnObject.data = data;
        res.send(returnObject);
      } else {
        res.status(404).send({error: 'not found'});
      }
    }).catch(function(err) {
      console.log('*****ERROR*****');
      console.log(err);
      res.status(500).send({error: err});
    });
  },

  // Breaking change -- using req.body for updates. needs to be x-www-form-urlencoded?
  update: function(req, res, model) {
    model.update(req.body, {where: {id: req.params.id}})
    .then(function() {
      model.findOne({where: {id: req.params.id}}).then(function(updatedRecord) {
        var returnObject = {};
        returnObject.data = updatedRecord;
        return res.status(200).send(returnObject);
      });
    })
    .catch(function (err) {
      res.status(400);
      return res.send({error: err.toString()});
    });
  },

  create: function(req, res, model) {
    model.create(req.body).then(function(newObject) {
      model.findOne({where: {id: newObject.id}}).then(function(createdRecord) {
        var returnObject = {};
        returnObject.data = createdRecord;
        return res.status(201).send(returnObject);
      });
    }).catch(function(err) {
      res.status(400);
      return res.send({reason: err.errors[0].message});
    });
  },

  delete: function(req, res, model) {
    model.findOne({where: {id: req.params.id}}).then(function(data) {
      data.destroy().then(function() {
        res.status(200).send({message: 'Record deleted.'});
      });
    }).catch(function(err) {
      return res.render('error', {
        error: err,
        status: 500
      });
    });
  }
};
