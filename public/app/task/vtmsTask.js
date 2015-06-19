angular.module('vtms').factory('vtmsTask', function($resource, $q) {
  var TaskResource = $resource('/api/task/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false},
    getList: {method:'GET', url:'/api/lessons/:id/tasks', isArray:true},
    getListForMember: {method: 'GET', url:'/api/teamMembers/:id/tasks/actionable', isArray:true},
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