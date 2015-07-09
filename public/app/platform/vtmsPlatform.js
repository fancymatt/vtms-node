angular.module('vtms').factory('vtmsPlatform', function($resource) {
  var PlatformResource = $resource('/api/platform/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });
  
  return PlatformResource;
});