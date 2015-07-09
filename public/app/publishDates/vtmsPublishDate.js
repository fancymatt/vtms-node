angular.module('vtms').factory('vtmsPublishDate', function($resource) {
  var PublishDateResource = $resource('/api/publishDates/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false},
    getIncomplete: {method: 'GET', isArray:true, url:'/api/publishDates/incomplete'}
  });
  
  return PublishDateResource;
});