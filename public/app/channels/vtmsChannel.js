angular.module('vtms').factory('vtmsChannel', function($resource) {
  var ChannelResource = $resource('/api/channels/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });

  return ChannelResource;
});
