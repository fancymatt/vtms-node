angular.module('vtms').factory('vtmsTask', function($resource, $q) {
  var TaskResource = $resource('/api/task/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false},
    getList: {method:'GET', url:'/api/lessons/:id/tasks', isArray:true},
    getListForMember: {method: 'GET', url:'/api/teamMembers/:id/tasks/actionable', isArray:true},
    getAssets: {method:'GET', url:'/api/lessons/:id/assets', isArray:true}
  });
  
  TaskResource.prototype.dueDate = function() {
    var publishDates = this.lesson.publishDates;
    for(var i = 1, lowest = new Date(publishDates[0].date); i < publishDates.length; i++) {
      compare = new Date(publishDates[i].date);
      if(compare < lowest) { lowest = compare; }
    };
    return lowest.setDate(lowest.getDate()-this.taskGlobal.dueDateOffset);
  };
  
  TaskResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    
    this.$update(newData).then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  return TaskResource;
});