angular.module('vtms').factory('vtmsTask', function($resource, $q) {
  var TaskResource = $resource('/api/task/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false},
  });
  
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