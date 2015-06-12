angular.module('vtms').factory('vtmsLesson', function($resource, $q) {
  var LessonResource = $resource('/api/lessons/:id', {id: "@id"}, {
    update: {method:'PUT', isArray: false}
  });
  
  LessonResource.prototype.update = function(newData) {
    var dfd = $q.defer();
    
    this.$update(newData).then(function() {
      dfd.resolve();
    }, function(response) {
      dfd.reject("You don't have permission to edit.");
    });
    return dfd.promise;
  };
  
  return LessonResource;
});