angular.module('vtms').factory('vtmsShift', function($resource) {
  var ShiftResource = $resource('/api/shifts/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });
  
  return ShiftResource;
});