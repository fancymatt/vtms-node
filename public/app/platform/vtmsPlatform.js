angular.module('vtms').factory('vtmsPlatform', function($resource) {
  var PlatformResource = $resource('/api/platforms/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });
  
  return PlatformResource;
});