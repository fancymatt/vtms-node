angular.module('vtms').factory('vtmsTask', function($resource, $q) {
  var TaskResource = $resource('/api/tasks/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false},
    getList: {method:'GET', url:'/api/lessons/:id/tasks', isArray:true},
    getActionableTasksForMember: {method: 'GET', url:'/api/teamMembers/:id/tasks/actionable', isArray:true},
    getActiveTasksForMember: {method: 'GET', url:'/api/teamMembers/:id/tasks/active', isArray:true},
    getAssets: {method:'GET', url:'/api/lessons/:id/assets', isArray:true}
  });
  
  TaskResource.prototype.dueDate = function() {
    var earliestDate = new Date(this.lesson.publishDates[0].date);
    if(this.lesson.publishDates.length > 1) {
      for(var i = 1, dateToCompare; i < this.lesson.publishDates.length; i++) {
        dateToCompare = new Date(this.lesson.publishDates[i].date);
        if(dateToCompare < earliestDate) earliestDate = dateToCompare;
      }
    }
    return earliestDate.setDate(earliestDate.getDate()-this.taskGlobal.dueDateOffset);
  }
  
  TaskResource.prototype.activate = function() {
    var dfd = $q.defer();
    
    var startTime = moment(Date.now());
    
    this.update({
      isActive: true,
      timeActivate: startTime.format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  TaskResource.prototype.deactivate = function() {
    var dfd = $q.defer();
    
    var endTime = moment(Date.now());
    var startTime = moment(this.timeActivate);
    var duration = moment.duration(endTime.diff(startTime));
    var durationInSeconds = Math.floor(duration.asSeconds());
    var newTimeRunning = this.timeRunning + durationInSeconds;
    
    this.update({
      isActive: false,
      timeDeactivated: endTime.format('YYYY-MM-DD HH:mm:ss'),
      timeRunning: newTimeRunning
    }).then(function(newData) {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  TaskResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    
    this.$update(newData).then(function() {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  return TaskResource;
});