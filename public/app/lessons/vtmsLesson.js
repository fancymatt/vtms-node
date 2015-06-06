angular.module('vtms').factory('vtmsLesson', function($resource, $q) {
  var LessonResource = $resource('/api/lessons/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false}
  });
  
  LessonResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    
    this.$update(newData).then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject(response.data.reason);
    });
    return dfd.promise;
  };
  
  return LessonResource;
});