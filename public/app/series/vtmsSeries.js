angular.module('vtms').factory('vtmsSeries', function($resource) {
  var SeriesResource = $resource('/api/series/:id', {_id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });
  
  return SeriesResource;
});