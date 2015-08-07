angular.module('vtms').factory('vtmsActivity', function($resource, $q) {
  var ActivityResource = $resource('/api/activities/:id', {id: '@id'}, {
    update: {method:'PUT', isArray:false},
    getListForTeamMember: {method:'GET', url: '/api/teamMembers/:id/activities', isArray: true},
    getActiveListForTeamMember: {method:'GET', url: '/api/teamMembers/:id/activities/active', isArray: true},
    getListForLesson: {method:'GET', url: '/api/lessons/:id/activities', isArray: true},
    getActiveList: {method:'GET', url: '/api/activities/active', isArray: true},
    getRecentList: {method:'GET', url: '/api/activities/recent', isArray: true}
  });
  
  ActivityResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    this.$update(newData).then(function() {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject('You don\'t have permission to edit.');
    });
    return dfd.promise;
  };
  
  ActivityResource.prototype.delete = function() {
    var dfd = $q.defer();
    
    this.$delete().then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject('You don\'t have permission to delete.');
    });
    return dfd.promise;
  };
  
  ActivityResource.prototype.complete = function() {
    var dfd = $q.defer();
    
    var endTime = moment(Date.now());
    var updateObject = {timeEnd: endTime.format('YYYY-MM-DD HH:mm:ss'), isCompleted: true};
    if(this.fkTask > 0) {
      updateObject.activity = 'Completed task';
    }
    
    this.update(updateObject).then(function(newData) {
      dfd.resolve(newData);
    });
    
    return dfd.promise;
  };
  
  ActivityResource.prototype.deactivate = function() {
    var dfd = $q.defer();
    
    var endTime = moment(Date.now());
    var updateObject = {timeEnd: endTime.format('YYYY-MM-DD HH:mm:ss'), isCompleted: true, activity: 'Worked on task'};
    
    this.update(updateObject).then(function(newData) {
      dfd.resolve(newData);
    });
    
    return dfd.promise;
  };
  
  ActivityResource.prototype.duration = function() {
    if(this.timeStart && this.timeEnd) {
      var start = moment(this.timeStart);
      var end = moment(this.timeEnd);
      return moment.duration(end.diff(start)).humanize();
    } else {
      return false;
    }
  };
  
  ActivityResource.prototype.createActivityForTask = function(task) {
    var dfd = $q.defer();
    
    this.timeStart = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.fkTask = task.id;
    this.fkTeamMember = task.fkTeamMember;
    this.isActive = true;
    this.activity = 'Working on task';
    
    this.$save().then(function(activity) {
      dfd.resolve(activity);
    });
    
    return dfd.promise;
  };
  
  return ActivityResource;
});