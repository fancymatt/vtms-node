angular.module('vtms').factory('vtmsShot', function($resource) {
  var ShotResource = $resource('/api/shots/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false},
    getList: {method:'GET', url: '/api/lessons/:id/shots', isArray:true}
  });
  
  return ShotResource;
});