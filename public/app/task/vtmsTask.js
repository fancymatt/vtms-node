angular.module('vtms').factory('vtmsTask', function($resource, $q, vtmsNotifier) {
  var TaskResource = $resource('/api/tasks/:id', {id: '@id'}, {
    update: {method:'PUT', isArray: false},
    getList: {method:'GET', url:'/api/lessons/:id/tasks', isArray:true},
    getActionableTasksForMember: {method: 'GET', url:'/api/teamMembers/:id/tasks/actionable', isArray:true},
    getActiveTasksForMember: {method: 'GET', url:'/api/teamMembers/:id/tasks/active', isArray:true},
    getAssets: {method:'GET', url:'/api/lessons/:id/assets', isArray:true},
    getTasksForTeamMemberWithIssues: {method:'GET', url:'/api/team-members/:id/tasks/issues', isArray: true},
    getUndeliveredTasks: {method: 'GET', url: '/api/tasks/undelivered', isArray: true},
    getUndeliveredTasksForTeamMember: {method: 'GET', url: '/api/team-members/:id/tasks/undelivered', isArray: true}
  });
  
  TaskResource.prototype.dueDate = function() {
    var earliestDate = new Date(this.lesson.publishDates[0].date);
    if(this.lesson.publishDates.length > 1) {
      for(var i = 1, dateToCompare; i < this.lesson.publishDates.length; i++) {
        dateToCompare = new Date(this.lesson.publishDates[i].date);
        if(dateToCompare < earliestDate) {
          earliestDate = dateToCompare;
        }
      }
    }
    return earliestDate.setDate(earliestDate.getDate()-this.taskGlobal.dueDateOffset);
  };
  
  TaskResource.prototype.activate = function() {
    var dfd = $q.defer();
    
    var taskString = this.toString();
    var notification = 'Activated ' + this.toString() + '.';
    
    this.update({
      isActive: true,
      timeActivate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
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
    
    var taskString = this.toString();
    var durationString = duration.humanize();
    var notification = 'Deactivated ' + taskString + '.\nYou\'ve worked for ' + durationString + ' so far.';
    
    this.update({
      isActive: false,
      timeDeactivated: endTime.format('YYYY-MM-DD HH:mm:ss'),
      timeRunning: newTimeRunning
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    
    return dfd.promise;
  };
  
  TaskResource.prototype.complete = function() {
    var dfd = $q.defer();
    
    var endTime = moment(Date.now());
    var startTime = !this.timeActivate ? moment(this.timeActivate) : endTime;
    var duration = moment.duration(endTime.diff(startTime));
    var durationInSeconds = Math.floor(duration.asSeconds());
    var newTimeRunning = this.timeRunning + durationInSeconds;
    
    var taskString = this.toString();
    var durationString = duration.humanize();
    var notification = 'Completed ' + taskString + '.\nIt took ' + durationString + '.';
    
    var newData;
    this.update({
      isActive: false,
      isCompleted: true,
      timeCompleted: endTime.format('YYYY-MM-DD HH:mm:ss'),
      timeRunning: newTimeRunning,
      timeActual: newTimeRunning
    }).then(function(newData) {
      vtmsNotifier.success(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    
    return dfd.promise;
  };
  
  TaskResource.prototype.deliver = function() {
    var dfd = $q.defer();
    
    var taskString = this.toString();
    var notification = 'Delivered ' + taskString + '.';
    
    this.update({
      isDelivered: true,
      timeDelivered: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      vtmsNotifier.success(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    
    return dfd.promise;
  };
  
  TaskResource.prototype.undeliver = function() {
    var dfd = $q.defer();
    
    this.update({
      isDelivered: false,
      timeDelivered: null
    }).then(function(newData) {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    
    return dfd.promise;
  };
  
  
  TaskResource.prototype.incomplete = function() {
    var dfd = $q.defer();
    
    var taskString = this.toString();
    var notification = 'You\'ve marked ' + taskString + ' as incomplete';
    
    this.update({
      isCompleted: false,
      timeActual: 0
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
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
      dfd.reject('You don\'t have permission to edit.');
    });
    
    return dfd.promise;
  };
  
  TaskResource.prototype.toString = function() {
    if(this.lesson.languageSery) {
      return this.lesson.languageSery.title + ' #' + this.lesson.number + ' - ' + this.taskGlobal.name;
    } else if(this.taskGlobal) {
      return this.taskGlobal.name;
    } else {
      return 'Lesson #' + this.number + ': ' + this.name;
    }
  };
  
  return TaskResource;
});