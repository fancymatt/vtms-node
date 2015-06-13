angular.module('vtms').factory('vtmsActivity', function($resource) {
  var ActivityResource = $resource('/api/activities/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });
  
  return ActivityResource;
});